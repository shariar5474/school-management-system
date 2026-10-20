import { Injectable, NotFoundException, BadRequestException, Logger } from '@nestjs/common';
import { FirebaseService } from '../common/firebase/firebase.service';
import { ActivateTemplateDto } from './dto/activate-template.dto';
import { AuditService } from '../audit/audit.service';
import * as admin from 'firebase-admin';

@Injectable()
export class ResultsService {
  private readonly logger = new Logger(ResultsService.name);
  public static readonly VALID_TEMPLATES = ['classic', 'modern', 'premium'] as const;

  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly auditService: AuditService,
  ) {}

  /**
   * Get active result template configuration
   */
  async getActiveTemplate(schoolId = 'default') {
    const db = this.firebaseService.getFirestore();
    const doc = await db.collection('schoolSettings').doc(schoolId).get();
    if (!doc.exists) {
      return { activeResultTemplateId: 'classic' };
    }
    return {
      activeResultTemplateId: doc.data()?.activeResultTemplateId || 'classic',
    };
  }

  /**
   * Activate one of the exactly three templates (Admin only)
   */
  async activateTemplate(dto: ActivateTemplateDto, performedBy: string) {
    if (!ResultsService.VALID_TEMPLATES.includes(dto.templateId)) {
      throw new BadRequestException(
        `Invalid template ID. Allowed: ${ResultsService.VALID_TEMPLATES.join(', ')}`,
      );
    }

    const db = this.firebaseService.getFirestore();
    const settingsRef = db.collection('schoolSettings').doc(dto.schoolId);

    const prevDoc = await settingsRef.get();
    const prevTemplate = prevDoc.exists ? prevDoc.data()?.activeResultTemplateId : 'classic';

    await settingsRef.set(
      {
        activeResultTemplateId: dto.templateId,
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedBy: performedBy,
      },
      { merge: true },
    );

    await this.auditService.log({
      schoolId: dto.schoolId,
      action: 'resultTemplate.activated',
      entityType: 'settings',
      entityId: dto.schoolId,
      description: `Active result template changed from "${prevTemplate}" to "${dto.templateId}"`,
      performedBy,
      performedByEmail: performedBy,
      previousValue: { templateId: prevTemplate },
      newValue: { templateId: dto.templateId },
    });

    return {
      message: 'Active result template updated successfully',
      activeResultTemplateId: dto.templateId,
    };
  }

  /**
   * Get single student result with template metadata
   */
  async getStudentResult(
    studentId: string,
    examId: string,
    academicYearId: string,
    schoolId = 'default',
  ) {
    const db = this.firebaseService.getFirestore();

    // Query result
    const resultDocId = `${schoolId}_${examId}_${studentId}`;
    const resultDoc = await db.collection('results').doc(resultDocId).get();

    if (!resultDoc.exists) {
      throw new NotFoundException('Result not found for the specified student and exam');
    }

    const resultData = resultDoc.data()!;
    if (resultData.status !== 'published') {
      throw new NotFoundException('Result has not been published yet');
    }

    // Get student info
    const studentDoc = await db.collection('students').doc(studentId).get();
    const studentData = studentDoc.exists ? studentDoc.data() : null;

    // Get exam info
    const examDoc = await db.collection('exams').doc(examId).get();
    const examData = examDoc.exists ? examDoc.data() : null;

    // Get school info
    const settingsDoc = await db.collection('schoolSettings').doc(schoolId).get();
    const settingsData = settingsDoc.exists ? settingsDoc.data() : null;

    return {
      result: resultData,
      student: studentData,
      exam: examData,
      school: settingsData,
      activeTemplate: settingsData?.activeResultTemplateId || 'classic',
    };
  }

  /**
   * Public result search by Student ID/Roll & Exam
   */
  async searchPublicResult(
    studentIdStr: string,
    examId: string,
    schoolId = 'default',
  ) {
    const db = this.firebaseService.getFirestore();

    // Find student by studentIdStr (e.g. STU-2024-0001) or roll
    const studentSnapshot = await db
      .collection('students')
      .where('schoolId', '==', schoolId)
      .where('studentIdStr', '==', studentIdStr)
      .limit(1)
      .get();

    if (studentSnapshot.empty) {
      throw new NotFoundException('No student found with the provided Student ID');
    }

    const studentDoc = studentSnapshot.docs[0];
    const studentId = studentDoc.id;

    return this.getStudentResult(studentId, examId, '', schoolId);
  }
}
