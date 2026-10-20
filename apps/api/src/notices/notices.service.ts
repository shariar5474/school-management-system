import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { FirebaseService } from '../common/firebase/firebase.service';
import { CreateNoticeDto } from './dto/create-notice.dto';
import { CreateEventDto } from './dto/create-event.dto';
import { PaginationQueryDto } from '../common/dto/pagination.dto';
import { paginateQuery } from '../common/utils/pagination.utils';
import { AuditService } from '../audit/audit.service';
import * as admin from 'firebase-admin';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class NoticesService {
  private readonly logger = new Logger(NoticesService.name);

  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly auditService: AuditService,
  ) {}

  // ==================== Notices ====================
  async createNotice(dto: CreateNoticeDto, createdBy: string) {
    const db = this.firebaseService.getFirestore();
    const id = uuidv4();
    const now = admin.firestore.FieldValue.serverTimestamp();

    const noticeData = {
      ...dto,
      id,
      isPublished: dto.isPublished !== undefined ? dto.isPublished : true,
      isImportant: dto.isImportant || false,
      publishDate: dto.publishDate || new Date().toISOString().split('T')[0],
      createdAt: now,
      updatedAt: now,
      createdBy,
    };

    await db.collection('notices').doc(id).set(noticeData);
    return noticeData;
  }

  async getNotices(pagination: PaginationQueryDto, schoolId = 'default', publicOnly = false) {
    const db = this.firebaseService.getFirestore();
    let query: admin.firestore.Query = db.collection('notices').where('schoolId', '==', schoolId);

    if (publicOnly) {
      query = query.where('isPublished', '==', true);
    }

    return paginateQuery(query, pagination);
  }

  // ==================== Events ====================
  async createEvent(dto: CreateEventDto, createdBy: string) {
    const db = this.firebaseService.getFirestore();
    const id = uuidv4();
    const now = admin.firestore.FieldValue.serverTimestamp();

    const eventData = {
      ...dto,
      id,
      isPublished: dto.isPublished !== undefined ? dto.isPublished : true,
      isFeatured: dto.isFeatured || false,
      createdAt: now,
      updatedAt: now,
      createdBy,
    };

    await db.collection('events').doc(id).set(eventData);
    return eventData;
  }

  async getEvents(pagination: PaginationQueryDto, schoolId = 'default', publicOnly = false) {
    const db = this.firebaseService.getFirestore();
    let query: admin.firestore.Query = db.collection('events').where('schoolId', '==', schoolId);

    if (publicOnly) {
      query = query.where('isPublished', '==', true);
    }

    return paginateQuery(query, pagination);
  }

  // ==================== Gallery ====================
  async getGallery(schoolId = 'default') {
    const db = this.firebaseService.getFirestore();
    const snapshot = await db
      .collection('galleryAlbums')
      .where('schoolId', '==', schoolId)
      .where('isPublished', '==', true)
      .get();
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }
}
