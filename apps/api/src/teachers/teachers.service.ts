import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { FirebaseService } from '../common/firebase/firebase.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { PaginationQueryDto } from '../common/dto/pagination.dto';
import { paginateQuery } from '../common/utils/pagination.utils';
import { AuditService } from '../audit/audit.service';
import * as admin from 'firebase-admin';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TeachersService {
  private readonly logger = new Logger(TeachersService.name);
  private readonly COLLECTION = 'teacherProfiles';

  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly auditService: AuditService,
  ) {}

  async create(dto: CreateTeacherDto, performedBy: string) {
    const db = this.firebaseService.getFirestore();
    const id = uuidv4();
    const now = admin.firestore.FieldValue.serverTimestamp();

    const teacherData = {
      ...dto,
      id,
      status: dto.status || 'active',
      showOnWebsite: dto.showOnWebsite !== undefined ? dto.showOnWebsite : true,
      createdAt: now,
      updatedAt: now,
      createdBy: performedBy,
    };

    await db.collection(this.COLLECTION).doc(id).set(teacherData);

    await this.auditService.log({
      schoolId: dto.schoolId || 'default',
      action: 'teacher.created',
      entityType: 'teacher',
      entityId: id,
      description: `Created teacher profile: ${dto.nameEn} (${dto.employeeId})`,
      performedBy,
      performedByEmail: performedBy,
    });

    return teacherData;
  }

  async findAll(pagination: PaginationQueryDto, schoolId = 'default', publicOnly = false) {
    const db = this.firebaseService.getFirestore();
    let query: admin.firestore.Query = db.collection(this.COLLECTION);

    if (schoolId) {
      query = query.where('schoolId', '==', schoolId);
    }
    if (publicOnly) {
      query = query.where('showOnWebsite', '==', true).where('status', '==', 'active');
    }

    return paginateQuery(query, pagination);
  }

  async findOne(id: string): Promise<any> {
    const db = this.firebaseService.getFirestore();
    const doc = await db.collection(this.COLLECTION).doc(id).get();
    if (!doc.exists) {
      throw new NotFoundException(`Teacher with ID ${id} not found`);
    }
    return { id: doc.id, ...(doc.data() as any) };
  }

  async update(id: string, dto: UpdateTeacherDto, performedBy: string) {
    const db = this.firebaseService.getFirestore();
    const existing = await this.findOne(id);

    const updateData = {
      ...dto,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    await db.collection(this.COLLECTION).doc(id).update(updateData);

    await this.auditService.log({
      schoolId: existing.schoolId || 'default',
      action: 'teacher.updated',
      entityType: 'teacher',
      entityId: id,
      description: `Updated teacher profile: ${existing.nameEn}`,
      performedBy,
      performedByEmail: performedBy,
      previousValue: existing,
      newValue: updateData,
    });

    return { ...existing, ...updateData };
  }

  async remove(id: string, performedBy: string) {
    const db = this.firebaseService.getFirestore();
    const existing = await this.findOne(id);

    // Soft delete: set status to inactive
    await db.collection(this.COLLECTION).doc(id).update({
      status: 'inactive',
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    await this.auditService.log({
      schoolId: existing.schoolId || 'default',
      action: 'teacher.deactivated',
      entityType: 'teacher',
      entityId: id,
      description: `Deactivated teacher profile: ${existing.nameEn}`,
      performedBy,
      performedByEmail: performedBy,
    });

    return { message: 'Teacher profile deactivated successfully' };
  }
}
