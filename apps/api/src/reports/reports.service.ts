import { Injectable, Logger } from '@nestjs/common';
import { FirebaseService } from '../common/firebase/firebase.service';

@Injectable()
export class ReportsService {
  private readonly logger = new Logger(ReportsService.name);

  constructor(private readonly firebaseService: FirebaseService) {}

  /**
   * Derive real dashboard statistics from Firestore collections
   */
  async getDashboardStats(schoolId = 'default') {
    const db = this.firebaseService.getFirestore();

    // Students count
    const studentsCount = (
      await db.collection('students').where('schoolId', '==', schoolId).where('status', '==', 'active').count().get()
    ).data().count;

    // Teachers count
    const teachersCount = (
      await db.collection('teacherProfiles').where('schoolId', '==', schoolId).where('status', '==', 'active').count().get()
    ).data().count;

    // Classes count
    const classesCount = (
      await db.collection('classes').where('schoolId', '==', schoolId).count().get()
    ).data().count;

    // Sections count
    const sectionsCount = (
      await db.collection('sections').where('schoolId', '==', schoolId).count().get()
    ).data().count;

    // Pending admissions count
    const pendingAdmissions = (
      await db.collection('admissions').where('schoolId', '==', schoolId).where('status', '==', 'submitted').count().get()
    ).data().count;

    // Today's attendance
    const today = new Date().toISOString().split('T')[0];
    const attendanceSnapshot = await db
      .collection('attendance')
      .where('schoolId', '==', schoolId)
      .where('date', '==', today)
      .get();

    const todayAttendanceTotal = attendanceSnapshot.size;
    const todayPresent = attendanceSnapshot.docs.filter((d) => d.data().status === 'present').length;
    const todayAbsent = attendanceSnapshot.docs.filter((d) => d.data().status === 'absent').length;

    // Outstanding fees
    const invoicesSnapshot = await db
      .collection('invoices')
      .where('schoolId', '==', schoolId)
      .get();

    let totalDue = 0;
    let totalCollected = 0;
    invoicesSnapshot.docs.forEach((doc) => {
      const data = doc.data();
      totalDue += data.dueAmount || 0;
      totalCollected += data.paidAmount || 0;
    });

    // Recent notices count
    const recentNoticesCount = (
      await db.collection('notices').where('schoolId', '==', schoolId).where('isPublished', '==', true).count().get()
    ).data().count;

    // Upcoming / published exams count
    const examsCount = (
      await db.collection('exams').where('schoolId', '==', schoolId).count().get()
    ).data().count;

    return {
      totalActiveStudents: studentsCount,
      totalTeachers: teachersCount,
      totalClasses: classesCount,
      totalSections: sectionsCount,
      pendingAdmissions,
      todayAttendance: {
        total: todayAttendanceTotal,
        present: todayPresent,
        absent: todayAbsent,
        rate: todayAttendanceTotal > 0 ? Math.round((todayPresent / todayAttendanceTotal) * 100) : 0,
      },
      financials: {
        totalDue,
        totalCollected,
      },
      recentNoticesCount,
      examsCount,
    };
  }
}
