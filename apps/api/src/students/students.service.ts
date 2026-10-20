import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { FirebaseService } from '../common/firebase/firebase.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { QueryStudentsDto } from './dto/query-students.dto';
import { paginateQuery, PaginatedResult } from '../common/utils/pagination.utils';
import { AuditService } from '../audit/audit.service';
import * as admin from 'firebase-admin';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class StudentsService {
  private readonly logger = new Logger(StudentsService.name);
  private readonly COLLECTION = 'students';

  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly auditService: AuditService,
  ) {}

  /**
   * Create a new student record with a server-generated unique ID.
   */
  async create(dto: CreateStudentDto, performedBy: string) {
    const db = this.firebaseService.getFirestore();
    const studentId = uuidv4();
    const now = admin.firestore.FieldValue.serverTimestamp();

    // Generate a student ID string (e.g., STU-2024-0001)
    const year = new Date().getFullYear();
    const countSnapshot = await db
      .collection(this.COLLECTION)
      .where('academicYearId', '==', dto.academicYearId)
      .count()
      .get();
    const count = countSnapshot.data().count + 1;
    const studentIdStr = `STU-${year}-${count.toString().padStart(4, '0')}`;

    const studentData = {
      ...dto,
      studentIdStr,
      status: dto.status || 'active',
      nationality: dto.nationality || 'Bangladeshi',
      admissionDate: dto.admissionDate || new Date().toISOString().split('T')[0],
      createdAt: now,
      updatedAt: now,
      createdBy: performedBy,
    };

    await db.collection(this.COLLECTION).doc(studentId).set(studentData);

    await this.auditService.log({
      action: 'CREATE_STUDENT',
      performedBy,
      targetCollection: this.COLLECTION,
      targetId: studentId,
      details: { nameInEnglish: dto.nameInEnglish, classId: dto.classId },
    });

    this.logger.log(`Student created: ${dto.nameInEnglish} (${studentIdStr})`);

    return { id: studentId, ...studentData };
  }

  /**
   * Find all students with filtering and pagination.
   */
  async findAll(query: QueryStudentsDto): Promise<PaginatedResult<unknown>> {
    const db = this.firebaseService.getFirestore();
    const collectionRef = db.collection(this.COLLECTION);
    let firestoreQuery: admin.firestore.Query = collectionRef;
    let countQuery: admin.firestore.Query = collectionRef;

    // Apply filters
    if (query.classId) {
      firestoreQuery = firestoreQuery.where('classId', '==', query.classId);
      countQuery = countQuery.where('classId', '==', query.classId);
    }
    if (query.sectionId) {
      firestoreQuery = firestoreQuery.where('sectionId', '==', query.sectionId);
      countQuery = countQuery.where('sectionId', '==', query.sectionId);
    }
    if (query.academicYearId) {
      firestoreQuery = firestoreQuery.where('academicYearId', '==', query.academicYearId);
      countQuery = countQuery.where('academicYearId', '==', query.academicYearId);
    }
    if (query.status) {
      firestoreQuery = firestoreQuery.where('status', '==', query.status);
      countQuery = countQuery.where('status', '==', query.status);
    }
    if (query.gender) {
      firestoreQuery = firestoreQuery.where('gender', '==', query.gender);
      countQuery = countQuery.where('gender', '==', query.gender);
    }

    // Search by name (prefix match)
    if (query.search) {
      firestoreQuery = firestoreQuery
        .where('nameInEnglish', '>=', query.search)
        .where('nameInEnglish', '<=', query.search + '\uf8ff');
    } else {
      firestoreQuery = firestoreQuery.orderBy(
        query.sortBy || 'createdAt',
        query.sortOrder || 'desc',
      );
    }

    return paginateQuery(firestoreQuery, query.page, query.limit, undefined, countQuery);
  }

  /**
   * Get a single student by ID.
   */
  async findOne(id: string) {
    const db = this.firebaseService.getFirestore();
    const doc = await db.collection(this.COLLECTION).doc(id).get();

    if (!doc.exists) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }

    return { id: doc.id, ...doc.data() };
  }

  /**
   * Update a student record.
   */
  async update(id: string, dto: UpdateStudentDto, performedBy: string) {
    const db = this.firebaseService.getFirestore();
    const docRef = db.collection(this.COLLECTION).doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }

    const updateData = {
      ...dto,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    await docRef.update(updateData);

    await this.auditService.log({
      action: 'UPDATE_STUDENT',
      performedBy,
      targetCollection: this.COLLECTION,
      targetId: id,
      details: { fields: Object.keys(dto) },
    });

    return this.findOne(id);
  }

  /**
   * Delete a student record (soft delete by setting status to inactive).
   */
  async remove(id: string, performedBy: string) {
    const db = this.firebaseService.getFirestore();
    const docRef = db.collection(this.COLLECTION).doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }

    await docRef.update({
      status: 'inactive',
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    await this.auditService.log({
      action: 'DELETE_STUDENT',
      performedBy,
      targetCollection: this.COLLECTION,
      targetId: id,
    });

    return { message: 'Student deactivated successfully' };
  }

  /**
   * Get students by class and section for use in attendance, etc.
   */
  async getStudentsByClassSection(
    classId: string,
    sectionId: string,
    academicYearId: string,
  ) {
    const db = this.firebaseService.getFirestore();
    const snapshot = await db
      .collection(this.COLLECTION)
      .where('classId', '==', classId)
      .where('sectionId', '==', sectionId)
      .where('academicYearId', '==', academicYearId)
      .where('status', '==', 'active')
      .orderBy('rollNumber', 'asc')
      .get();

    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }

  /**
   * Export students as CSV data (returns array of objects suitable for CSV conversion).
   */
  async exportCSV(query: QueryStudentsDto) {
    const db = this.firebaseService.getFirestore();
    let firestoreQuery: admin.firestore.Query = db.collection(this.COLLECTION);

    if (query.classId) {
      firestoreQuery = firestoreQuery.where('classId', '==', query.classId);
    }
    if (query.sectionId) {
      firestoreQuery = firestoreQuery.where('sectionId', '==', query.sectionId);
    }
    if (query.academicYearId) {
      firestoreQuery = firestoreQuery.where('academicYearId', '==', query.academicYearId);
    }
    if (query.status) {
      firestoreQuery = firestoreQuery.where('status', '==', query.status);
    }

    firestoreQuery = firestoreQuery.orderBy('rollNumber', 'asc');

    const snapshot = await firestoreQuery.get();

    return snapshot.docs.map((doc) => {
      const d = doc.data();
      return {
        studentId: d.studentIdStr,
        nameInEnglish: d.nameInEnglish,
        nameInBengali: d.nameInBengali,
        dateOfBirth: d.dateOfBirth,
        gender: d.gender,
        rollNumber: d.rollNumber,
        phone: d.phone,
        email: d.email,
        fatherName: d.father?.name,
        fatherPhone: d.father?.phone,
        motherName: d.mother?.name,
        motherPhone: d.mother?.phone,
        presentAddress: d.presentAddress,
        status: d.status,
      };
    });
  }

  /**
   * Import students from CSV-like array data.
   */
  async importCSV(students: CreateStudentDto[], performedBy: string) {
    const db = this.firebaseService.getFirestore();
    const batch = db.batch();
    const results: { success: number; failed: number; errors: string[] } = {
      success: 0,
      failed: 0,
      errors: [],
    };

    for (let i = 0; i < students.length; i++) {
      try {
        const studentId = uuidv4();
        const now = admin.firestore.FieldValue.serverTimestamp();
        const year = new Date().getFullYear();
        const studentIdStr = `STU-${year}-IMP-${(i + 1).toString().padStart(4, '0')}`;

        const studentData = {
          ...students[i],
          studentIdStr,
          status: students[i].status || 'active',
          nationality: students[i].nationality || 'Bangladeshi',
          admissionDate: students[i].admissionDate || new Date().toISOString().split('T')[0],
          createdAt: now,
          updatedAt: now,
          createdBy: performedBy,
        };

        const docRef = db.collection(this.COLLECTION).doc(studentId);
        batch.set(docRef, studentData);
        results.success++;
      } catch (error) {
        results.failed++;
        results.errors.push(`Row ${i + 1}: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }

    // Firestore batches are limited to 500 operations
    if (results.success > 0) {
      await batch.commit();
    }

    await this.auditService.log({
      action: 'IMPORT_STUDENTS',
      performedBy,
      targetCollection: this.COLLECTION,
      targetId: 'batch',
      details: results,
    });

    return results;
  }
}
