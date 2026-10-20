import { Injectable, NotFoundException, BadRequestException, Logger } from '@nestjs/common';
import { FirebaseService } from '../common/firebase/firebase.service';
import { CreateAdmissionDto } from './dto/create-admission.dto';
import { ReviewAdmissionDto } from './dto/review-admission.dto';
import { PaginationQueryDto } from '../common/dto/pagination.dto';
import { paginateQuery } from '../common/utils/pagination.utils';
import { AuditService } from '../audit/audit.service';
import * as admin from 'firebase-admin';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AdmissionsService {
  private readonly logger = new Logger(AdmissionsService.name);
  private readonly COLLECTION = 'admissions';

  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly auditService: AuditService,
  ) {}

  /**
   * Submit online admission application (Public)
   */
  async submit(dto: CreateAdmissionDto) {
    const db = this.firebaseService.getFirestore();
    const id = uuidv4();
    const now = admin.firestore.FieldValue.serverTimestamp();
    const schoolId = dto.schoolId || 'default';

    // Generate unique application number ADM-YYYY-XXXX
    const year = new Date().getFullYear();
    const countSnapshot = await db
      .collection(this.COLLECTION)
      .where('schoolId', '==', schoolId)
      .count()
      .get();
    const count = countSnapshot.data().count + 1;
    const applicationNumber = `ADM-${year}-${count.toString().padStart(4, '0')}`;

    const applicationData = {
      ...dto,
      id,
      schoolId,
      applicationNumber,
      status: 'submitted',
      createdAt: now,
      updatedAt: now,
    };

    await db.collection(this.COLLECTION).doc(id).set(applicationData);

    return {
      id,
      applicationNumber,
      message: 'Admission application submitted successfully',
      status: 'submitted',
    };
  }

  async findAll(pagination: PaginationQueryDto, schoolId = 'default', status?: string) {
    const db = this.firebaseService.getFirestore();
    let query: admin.firestore.Query = db.collection(this.COLLECTION).where('schoolId', '==', schoolId);

    if (status) {
      query = query.where('status', '==', status);
    }

    return paginateQuery(query, pagination);
  }

  async findOne(id: string): Promise<any> {
    const db = this.firebaseService.getFirestore();
    const doc = await db.collection(this.COLLECTION).doc(id).get();
    if (!doc.exists) {
      throw new NotFoundException(`Application with ID ${id} not found`);
    }
    return { id: doc.id, ...(doc.data() as any) };
  }

  async findByApplicationNumber(appNum: string, schoolId = 'default'): Promise<any> {
    const db = this.firebaseService.getFirestore();
    const snapshot = await db
      .collection(this.COLLECTION)
      .where('schoolId', '==', schoolId)
      .where('applicationNumber', '==', appNum)
      .limit(1)
      .get();

    if (snapshot.empty) {
      throw new NotFoundException(`No application found with number ${appNum}`);
    }

    return { id: snapshot.docs[0].id, ...(snapshot.docs[0].data() as any) };
  }

  /**
   * Review application: approve, reject, or enroll
   */
  async review(id: string, dto: ReviewAdmissionDto, reviewedBy: string) {
    const db = this.firebaseService.getFirestore();
    const application = await this.findOne(id);
    const now = admin.firestore.FieldValue.serverTimestamp();
    const schoolId = application.schoolId || 'default';

    const updateData: any = {
      status: dto.status,
      reviewNotes: dto.reviewNotes || '',
      rejectionReason: dto.rejectionReason || '',
      reviewedBy,
      reviewedAt: now,
      updatedAt: now,
    };

    // If approved or enrolling, convert into real Student record!
    if (dto.status === 'enrolled' && !application.enrolledStudentId) {
      const studentId = uuidv4();
      const year = new Date().getFullYear();
      const countSnapshot = await db
        .collection('students')
        .where('schoolId', '==', schoolId)
        .count()
        .get();
      const count = countSnapshot.data().count + 1;
      const studentIdStr = `STU-${year}-${count.toString().padStart(4, '0')}`;

      const newStudentData = {
        id: studentId,
        schoolId,
        studentIdStr,
        admissionNumber: application.applicationNumber,
        nameEn: application.studentNameEn,
        nameBn: application.studentNameBn,
        dateOfBirth: application.dateOfBirth,
        gender: application.gender,
        bloodGroup: application.bloodGroup || '',
        birthCertificateNo: application.birthCertificateNo || '',
        currentClassId: application.desiredClassId,
        currentSectionId: dto.assignedSectionId || '',
        currentAcademicYearId: application.academicYearId,
        phone: application.applicantPhone,
        email: application.applicantEmail || '',
        presentAddress: application.presentAddress,
        permanentAddress: application.permanentAddress,
        status: 'active',
        admissionDate: new Date().toISOString().split('T')[0],
        fatherNameEn: application.fatherNameEn,
        fatherNameBn: application.fatherNameBn,
        fatherPhone: application.fatherPhone,
        motherNameEn: application.motherNameEn,
        motherNameBn: application.motherNameBn,
        createdAt: now,
        updatedAt: now,
        createdBy: reviewedBy,
      };

      await db.collection('students').doc(studentId).set(newStudentData);
      updateData.enrolledStudentId = studentId;

      await this.auditService.log({
        schoolId,
        action: 'student.enrolled_from_admission',
        entityType: 'student',
        entityId: studentId,
        description: `Enrolled student ${application.studentNameEn} (${studentIdStr}) from admission application ${application.applicationNumber}`,
        performedBy: reviewedBy,
        performedByEmail: reviewedBy,
      });
    }

    await db.collection(this.COLLECTION).doc(id).update(updateData);

    await this.auditService.log({
      schoolId,
      action: 'admission.reviewed',
      entityType: 'admission',
      entityId: id,
      description: `Admission application ${application.applicationNumber} updated to "${dto.status}"`,
      performedBy: reviewedBy,
      performedByEmail: reviewedBy,
    });

    return { ...application, ...updateData };
  }
}
