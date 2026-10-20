import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { FirebaseService } from '../common/firebase/firebase.service';
import { MarkAttendanceDto } from './dto/create-attendance.dto';
import { QueryAttendanceDto } from './dto/query-attendance.dto';
import { AuditService } from '../audit/audit.service';
import * as admin from 'firebase-admin';

@Injectable()
export class AttendanceService {
  private readonly logger = new Logger(AttendanceService.name);
  private readonly COLLECTION = 'attendance';

  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly auditService: AuditService,
  ) {}

  /**
   * Save or update attendance records with duplicate prevention and audit logging
   */
  async markAttendance(dto: MarkAttendanceDto, recordedBy: string) {
    const db = this.firebaseService.getFirestore();
    const batch = db.batch();
    const now = admin.firestore.FieldValue.serverTimestamp();
    const schoolId = dto.schoolId || 'default';

    for (const record of dto.records) {
      // Deterministic document ID to prevent duplicates for same student + date:
      const docId = `${schoolId}_${record.studentId}_${dto.date}`;
      const docRef = db.collection(this.COLLECTION).doc(docId);

      const attendanceData = {
        id: docId,
        schoolId,
        classId: dto.classId,
        sectionId: dto.sectionId,
        academicYearId: dto.academicYearId,
        date: dto.date,
        studentId: record.studentId,
        status: record.status,
        remarks: record.remarks || '',
        recordedBy,
        lastModifiedBy: recordedBy,
        updatedAt: now,
      };

      // Set with merge: true so existing records are updated safely
      batch.set(docRef, attendanceData, { merge: true });
    }

    await batch.commit();

    await this.auditService.log({
      schoolId,
      action: 'attendance.marked',
      entityType: 'attendance',
      entityId: `${dto.classId}_${dto.sectionId}_${dto.date}`,
      description: `Marked attendance for Class ${dto.classId}, Section ${dto.sectionId} on ${dto.date} (${dto.records.length} students)`,
      performedBy: recordedBy,
      performedByEmail: recordedBy,
    });

    return {
      message: 'Attendance recorded successfully',
      date: dto.date,
      count: dto.records.length,
    };
  }

  async getDailyAttendance(query: QueryAttendanceDto) {
    const db = this.firebaseService.getFirestore();
    const schoolId = query.schoolId || 'default';

    let firestoreQuery: admin.firestore.Query = db
      .collection(this.COLLECTION)
      .where('schoolId', '==', schoolId)
      .where('classId', '==', query.classId)
      .where('sectionId', '==', query.sectionId);

    if (query.date) {
      firestoreQuery = firestoreQuery.where('date', '==', query.date);
    }

    const snapshot = await firestoreQuery.get();
    const records = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    const summary = {
      total: records.length,
      present: records.filter((r: any) => r.status === 'present').length,
      absent: records.filter((r: any) => r.status === 'absent').length,
      late: records.filter((r: any) => r.status === 'late').length,
      leave: records.filter((r: any) => r.status === 'leave').length,
    };

    return { records, summary };
  }

  async getStudentAttendance(studentId: string, schoolId = 'default') {
    const db = this.firebaseService.getFirestore();
    const snapshot = await db
      .collection(this.COLLECTION)
      .where('schoolId', '==', schoolId)
      .where('studentId', '==', studentId)
      .orderBy('date', 'desc')
      .limit(60)
      .get();

    const records = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    const total = records.length;
    const present = records.filter((r: any) => r.status === 'present').length;
    const percentage = total > 0 ? Math.round((present / total) * 100) : 0;

    return { records, total, present, percentage };
  }
}
