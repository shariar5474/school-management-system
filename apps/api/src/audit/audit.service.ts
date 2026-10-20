import { Injectable, Logger } from '@nestjs/common';
import { FirebaseService } from '../common/firebase/firebase.service';
import * as admin from 'firebase-admin';
import { PaginationQueryDto } from '../common/dto/pagination.dto';
import { paginateQuery, PaginatedResult } from '../common/utils/pagination.utils';

export interface AuditLogEntry {
  action: string;
  performedBy: string;
  performedByEmail?: string;
  targetCollection?: string;
  targetId?: string;
  entityType?: string;
  entityId?: string;
  schoolId?: string;
  description?: string;
  previousValue?: any;
  newValue?: any;
  details?: Record<string, unknown>;
  ipAddress?: string;
}

@Injectable()
export class AuditService {
  private readonly logger = new Logger(AuditService.name);

  constructor(private readonly firebaseService: FirebaseService) {}

  /**
   * Log a sensitive action to the auditLogs Firestore collection.
   */
  async log(entry: AuditLogEntry): Promise<void> {
    try {
      const db = this.firebaseService.getFirestore();
      await db.collection('auditLogs').add({
        ...entry,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });
    } catch (error) {
      // Never let audit logging failures break the main flow
      this.logger.error('Failed to write audit log', error);
    }
  }

  /**
   * Retrieve audit logs with pagination. Super admin only.
   */
  async getAuditLogs(
    query: PaginationQueryDto,
  ): Promise<PaginatedResult<unknown>> {
    const db = this.firebaseService.getFirestore();
    const collectionRef = db.collection('auditLogs');
    let firestoreQuery: admin.firestore.Query = collectionRef;

    // Filter by action or performer if search is provided
    if (query.search) {
      firestoreQuery = firestoreQuery.where('action', '==', query.search.toUpperCase());
    }

    firestoreQuery = firestoreQuery.orderBy(
      query.sortBy || 'timestamp',
      query.sortOrder || 'desc',
    );

    return paginateQuery(
      firestoreQuery,
      query.page,
      query.limit,
      collectionRef,
    );
  }

  /**
   * Get audit logs filtered by target entity.
   */
  async getLogsForEntity(
    collection: string,
    entityId: string,
  ): Promise<unknown[]> {
    const db = this.firebaseService.getFirestore();
    const snapshot = await db
      .collection('auditLogs')
      .where('targetCollection', '==', collection)
      .where('targetId', '==', entityId)
      .orderBy('timestamp', 'desc')
      .limit(50)
      .get();

    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }
}
