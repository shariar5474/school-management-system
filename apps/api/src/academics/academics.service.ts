import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { FirebaseService } from '../common/firebase/firebase.service';
import { CreateAcademicYearDto } from './dto/create-academic-year.dto';
import { CreateClassDto } from './dto/create-class.dto';
import { CreateSectionDto } from './dto/create-section.dto';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { AuditService } from '../audit/audit.service';
import * as admin from 'firebase-admin';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AcademicsService {
  private readonly logger = new Logger(AcademicsService.name);

  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly auditService: AuditService,
  ) {}

  // ==================== Academic Years ====================
  async createYear(dto: CreateAcademicYearDto, performedBy: string) {
    const db = this.firebaseService.getFirestore();
    const id = uuidv4();
    const now = admin.firestore.FieldValue.serverTimestamp();

    if (dto.isCurrent) {
      // Unset previous current years
      const currentYears = await db
        .collection('academicYears')
        .where('schoolId', '==', dto.schoolId || 'default')
        .where('isCurrent', '==', true)
        .get();
      const batch = db.batch();
      currentYears.docs.forEach((doc) => batch.update(doc.ref, { isCurrent: false }));
      await batch.commit();
    }

    const data = { ...dto, id, createdAt: now, updatedAt: now };
    await db.collection('academicYears').doc(id).set(data);

    await this.auditService.log({
      schoolId: dto.schoolId || 'default',
      action: 'academicYear.created',
      entityType: 'academicYear',
      entityId: id,
      description: `Created academic year: ${dto.name}`,
      performedBy,
      performedByEmail: performedBy,
    });

    return data;
  }

  async getYears(schoolId = 'default') {
    const db = this.firebaseService.getFirestore();
    const snapshot = await db
      .collection('academicYears')
      .where('schoolId', '==', schoolId)
      .orderBy('startDate', 'desc')
      .get();
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }

  // ==================== Classes ====================
  async createClass(dto: CreateClassDto, performedBy: string) {
    const db = this.firebaseService.getFirestore();
    const id = uuidv4();
    const now = admin.firestore.FieldValue.serverTimestamp();

    const data = { ...dto, id, createdAt: now, updatedAt: now };
    await db.collection('classes').doc(id).set(data);

    await this.auditService.log({
      schoolId: dto.schoolId || 'default',
      action: 'class.created',
      entityType: 'class',
      entityId: id,
      description: `Created class: ${dto.nameEn}`,
      performedBy,
      performedByEmail: performedBy,
    });

    return data;
  }

  async getClasses(schoolId = 'default') {
    const db = this.firebaseService.getFirestore();
    const snapshot = await db
      .collection('classes')
      .where('schoolId', '==', schoolId)
      .orderBy('numericOrder', 'asc')
      .get();
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }

  // ==================== Sections ====================
  async createSection(dto: CreateSectionDto, performedBy: string) {
    const db = this.firebaseService.getFirestore();
    const id = uuidv4();
    const now = admin.firestore.FieldValue.serverTimestamp();

    const data = { ...dto, id, createdAt: now, updatedAt: now };
    await db.collection('sections').doc(id).set(data);

    return data;
  }

  async getSectionsByClass(classId: string, schoolId = 'default') {
    const db = this.firebaseService.getFirestore();
    const snapshot = await db
      .collection('sections')
      .where('schoolId', '==', schoolId)
      .where('classId', '==', classId)
      .get();
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }

  // ==================== Subjects ====================
  async createSubject(dto: CreateSubjectDto, performedBy: string) {
    const db = this.firebaseService.getFirestore();
    const id = uuidv4();
    const now = admin.firestore.FieldValue.serverTimestamp();

    const data = {
      ...dto,
      id,
      fullMarks: dto.fullMarks || 100,
      passMarks: dto.passMarks || 33,
      createdAt: now,
      updatedAt: now,
    };
    await db.collection('subjects').doc(id).set(data);

    return data;
  }

  async getSubjects(schoolId = 'default', classId?: string) {
    const db = this.firebaseService.getFirestore();
    let query: admin.firestore.Query = db.collection('subjects').where('schoolId', '==', schoolId);

    if (classId) {
      query = query.where('classIds', 'array-contains', classId);
    }

    const snapshot = await query.get();
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }
}
