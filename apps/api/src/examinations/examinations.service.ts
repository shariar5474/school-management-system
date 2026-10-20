import { Injectable, NotFoundException, BadRequestException, Logger } from '@nestjs/common';
import { FirebaseService } from '../common/firebase/firebase.service';
import { CreateExamDto } from './dto/create-exam.dto';
import { EnterMarksDto } from './dto/enter-marks.dto';
import { PublishResultsDto } from './dto/publish-results.dto';
import { AuditService } from '../audit/audit.service';
import * as admin from 'firebase-admin';
import { v4 as uuidv4 } from 'uuid';

export interface GradeInfo {
  grade: string;
  gradePoint: number;
}

@Injectable()
export class ExaminationsService {
  private readonly logger = new Logger(ExaminationsService.name);

  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly auditService: AuditService,
  ) {}

  /**
   * Helper: Calculate Grade & GPA based on percentage
   */
  calculateGrade(percentage: number): GradeInfo {
    if (percentage >= 80) return { grade: 'A+', gradePoint: 5.0 };
    if (percentage >= 70) return { grade: 'A', gradePoint: 4.0 };
    if (percentage >= 60) return { grade: 'A-', gradePoint: 3.5 };
    if (percentage >= 50) return { grade: 'B', gradePoint: 3.0 };
    if (percentage >= 40) return { grade: 'C', gradePoint: 2.0 };
    if (percentage >= 33) return { grade: 'D', gradePoint: 1.0 };
    return { grade: 'F', gradePoint: 0.0 };
  }

  // ==================== Exam CRUD ====================
  async createExam(dto: CreateExamDto, performedBy: string) {
    const db = this.firebaseService.getFirestore();
    const id = uuidv4();
    const now = admin.firestore.FieldValue.serverTimestamp();

    const data = {
      ...dto,
      id,
      status: dto.status || 'draft',
      createdAt: now,
      updatedAt: now,
      createdBy: performedBy,
    };

    await db.collection('exams').doc(id).set(data);

    await this.auditService.log({
      schoolId: dto.schoolId || 'default',
      action: 'exam.created',
      entityType: 'exam',
      entityId: id,
      description: `Created examination: ${dto.nameEn}`,
      performedBy,
      performedByEmail: performedBy,
    });

    return data;
  }

  async getExams(schoolId = 'default', academicYearId?: string) {
    const db = this.firebaseService.getFirestore();
    let query: admin.firestore.Query = db.collection('exams').where('schoolId', '==', schoolId);

    if (academicYearId) {
      query = query.where('academicYearId', '==', academicYearId);
    }

    const snapshot = await query.orderBy('createdAt', 'desc').get();
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }

  async getExamById(id: string) {
    const db = this.firebaseService.getFirestore();
    const doc = await db.collection('exams').doc(id).get();
    if (!doc.exists) {
      throw new NotFoundException(`Exam with ID ${id} not found`);
    }
    return { id: doc.id, ...doc.data() };
  }

  // ==================== Enter Marks ====================
  async enterMarks(dto: EnterMarksDto, enteredBy: string) {
    const db = this.firebaseService.getFirestore();
    const batch = db.batch();
    const now = admin.firestore.FieldValue.serverTimestamp();
    const schoolId = dto.schoolId || 'default';

    // Verify marks don't exceed full marks
    for (const record of dto.marks) {
      if (record.totalMarks > dto.fullMarks) {
        throw new BadRequestException(
          `Total marks (${record.totalMarks}) cannot exceed full marks (${dto.fullMarks}) for student ${record.studentId}`,
        );
      }

      const markDocId = `${schoolId}_${dto.examId}_${record.studentId}_${dto.subjectId}`;
      const docRef = db.collection('marks').doc(markDocId);

      const percentage = (record.totalMarks / dto.fullMarks) * 100;
      const gradeInfo = record.isAbsent ? { grade: 'F', gradePoint: 0.0 } : this.calculateGrade(percentage);
      const isPassed = !record.isAbsent && record.totalMarks >= dto.passMarks;

      const markData = {
        id: markDocId,
        schoolId,
        examId: dto.examId,
        studentId: record.studentId,
        classId: dto.classId,
        sectionId: dto.sectionId,
        subjectId: dto.subjectId,
        theoryMarks: record.theoryMarks || 0,
        practicalMarks: record.practicalMarks || 0,
        totalMarks: record.totalMarks,
        fullMarks: dto.fullMarks,
        passMarks: dto.passMarks,
        isAbsent: record.isAbsent || false,
        isPassed,
        grade: gradeInfo.grade,
        gradePoint: gradeInfo.gradePoint,
        enteredBy,
        updatedAt: now,
      };

      batch.set(docRef, markData, { merge: true });
    }

    // Update exam status to marks_entry
    batch.update(db.collection('exams').doc(dto.examId), {
      status: 'marks_entry',
      updatedAt: now,
    });

    await batch.commit();

    await this.auditService.log({
      schoolId,
      action: 'marks.entered',
      entityType: 'marks',
      entityId: `${dto.examId}_${dto.subjectId}`,
      description: `Entered marks for Exam ${dto.examId}, Subject ${dto.subjectId} (${dto.marks.length} students)`,
      performedBy: enteredBy,
      performedByEmail: enteredBy,
    });

    return {
      message: 'Marks entered and saved successfully',
      count: dto.marks.length,
    };
  }

  // ==================== Publish Results ====================
  async publishResults(dto: PublishResultsDto, publishedBy: string) {
    const db = this.firebaseService.getFirestore();
    const schoolId = dto.schoolId || 'default';
    const now = admin.firestore.FieldValue.serverTimestamp();

    // 1. Fetch exam
    const examDoc = await db.collection('exams').doc(dto.examId).get();
    if (!examDoc.exists) {
      throw new NotFoundException(`Exam ${dto.examId} not found`);
    }
    const examData = examDoc.data()!;

    // 2. Fetch all marks for this exam
    let marksQuery: admin.firestore.Query = db
      .collection('marks')
      .where('schoolId', '==', schoolId)
      .where('examId', '==', dto.examId);

    if (dto.classId) {
      marksQuery = marksQuery.where('classId', '==', dto.classId);
    }

    const marksSnapshot = await marksQuery.get();
    const allMarks = marksSnapshot.docs.map((doc) => doc.data());

    // Group marks by student
    const studentMarksMap = new Map<string, any[]>();
    for (const mark of allMarks) {
      if (!studentMarksMap.has(mark.studentId)) {
        studentMarksMap.set(mark.studentId, []);
      }
      studentMarksMap.get(mark.studentId)!.push(mark);
    }

    // Calculate aggregated result per student
    const calculatedResults: any[] = [];
    for (const [studentId, subjectMarks] of studentMarksMap.entries()) {
      let totalMarksObtained = 0;
      let totalFullMarks = 0;
      let totalGradePoints = 0;
      let hasFailedSubject = false;
      const failedSubjectIds: string[] = [];

      for (const sm of subjectMarks) {
        totalMarksObtained += sm.totalMarks;
        totalFullMarks += sm.fullMarks;
        totalGradePoints += sm.gradePoint;
        if (!sm.isPassed) {
          hasFailedSubject = true;
          failedSubjectIds.push(sm.subjectId);
        }
      }

      const percentage = totalFullMarks > 0 ? (totalMarksObtained / totalFullMarks) * 100 : 0;
      const gpa =
        hasFailedSubject || subjectMarks.length === 0
          ? 0.0
          : parseFloat((totalGradePoints / subjectMarks.length).toFixed(2));
      const overallGrade = hasFailedSubject ? 'F' : this.calculateGrade(percentage).grade;

      calculatedResults.push({
        studentId,
        classId: subjectMarks[0]?.classId,
        sectionId: subjectMarks[0]?.sectionId,
        totalMarksObtained,
        totalFullMarks,
        percentage: parseFloat(percentage.toFixed(2)),
        gpa,
        overallGrade,
        isPassed: !hasFailedSubject,
        failedSubjectIds,
        subjectResults: subjectMarks,
      });
    }

    // Sort by GPA desc, then totalMarks desc to assign merit positions
    calculatedResults.sort((a, b) => {
      if (b.gpa !== a.gpa) return b.gpa - a.gpa;
      return b.totalMarksObtained - a.totalMarksObtained;
    });

    // Write aggregated results to results collection
    const batch = db.batch();
    for (let i = 0; i < calculatedResults.length; i++) {
      const res = calculatedResults[i];
      const meritPosition = i + 1;
      const resultDocId = `${schoolId}_${dto.examId}_${res.studentId}`;
      const resultRef = db.collection('results').doc(resultDocId);

      batch.set(resultRef, {
        id: resultDocId,
        schoolId,
        examId: dto.examId,
        academicYearId: examData.academicYearId,
        meritPosition,
        ...res,
        status: 'published',
        publishedAt: now,
        updatedAt: now,
        calculatedBy: publishedBy,
      }, { merge: true });
    }

    // Update exam status to published
    batch.update(db.collection('exams').doc(dto.examId), {
      status: 'published',
      publishedAt: now,
      publishedBy,
      updatedAt: now,
    });

    await batch.commit();

    await this.auditService.log({
      schoolId,
      action: 'results.published',
      entityType: 'exam',
      entityId: dto.examId,
      description: `Published results for Exam ${dto.examId} (${calculatedResults.length} students)`,
      performedBy: publishedBy,
      performedByEmail: publishedBy,
    });

    return {
      message: 'Results calculated and published successfully',
      publishedCount: calculatedResults.length,
    };
  }
}
