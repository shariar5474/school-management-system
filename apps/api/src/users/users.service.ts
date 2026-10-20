import {
  Injectable,
  NotFoundException,
  ConflictException,
  Logger,
} from '@nestjs/common';
import { FirebaseService } from '../common/firebase/firebase.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationQueryDto } from '../common/dto/pagination.dto';
import { paginateQuery, PaginatedResult } from '../common/utils/pagination.utils';
import { AuditService } from '../audit/audit.service';
import * as admin from 'firebase-admin';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly auditService: AuditService,
  ) {}

  /**
   * Create a new user account in Firebase Auth and Firestore.
   */
  async create(dto: CreateUserDto, performedBy: string) {
    const db = this.firebaseService.getFirestore();
    const auth = this.firebaseService.getAuth();

    // Check if user already exists in Firestore by email
    const existingUser = await db
      .collection('users')
      .where('email', '==', dto.email)
      .limit(1)
      .get();

    if (!existingUser.empty) {
      throw new ConflictException(`User with email ${dto.email} already exists`);
    }

    // Create Firebase Auth user
    let firebaseUser;
    try {
      firebaseUser = await auth.createUser({
        email: dto.email,
        displayName: dto.displayName,
        password: dto.password || Math.random().toString(36).slice(-12),
      });
    } catch (error: unknown) {
      const fbError = error as { code?: string };
      if (fbError.code === 'auth/email-already-exists') {
        // User exists in Auth but not Firestore - get their UID
        const existingAuthUser = await auth.getUserByEmail(dto.email);
        firebaseUser = existingAuthUser;
      } else {
        throw error;
      }
    }

    // Set custom claims
    await auth.setCustomUserClaims(firebaseUser.uid, { role: dto.role });

    // Create Firestore user document
    const now = admin.firestore.FieldValue.serverTimestamp();
    const userData = {
      uid: firebaseUser.uid,
      email: dto.email,
      displayName: dto.displayName,
      role: dto.role,
      isActive: true,
      phone: dto.phone || null,
      schoolId: dto.schoolId || null,
      photoURL: null,
      createdAt: now,
      updatedAt: now,
    };

    await db.collection('users').doc(firebaseUser.uid).set(userData);

    await this.auditService.log({
      action: 'CREATE_USER',
      performedBy,
      targetCollection: 'users',
      targetId: firebaseUser.uid,
      details: { email: dto.email, role: dto.role },
    });

    this.logger.log(`User created: ${dto.email} (${dto.role})`);

    return { id: firebaseUser.uid, ...userData };
  }

  /**
   * List users with pagination and optional role filtering.
   */
  async findAll(
    query: PaginationQueryDto & { role?: string },
  ): Promise<PaginatedResult<unknown>> {
    const db = this.firebaseService.getFirestore();
    const collectionRef = db.collection('users');
    let firestoreQuery: admin.firestore.Query = collectionRef;

    // Filter by role
    if (query.role) {
      firestoreQuery = firestoreQuery.where('role', '==', query.role);
    }

    // Filter by search (name or email)
    if (query.search) {
      // Firestore doesn't support full-text search, so we filter by displayName prefix
      firestoreQuery = firestoreQuery
        .where('displayName', '>=', query.search)
        .where('displayName', '<=', query.search + '\uf8ff');
    }

    const sortBy = query.sortBy || 'createdAt';
    const sortOrder = query.sortOrder || 'desc';

    // Only apply orderBy if not conflicting with inequality filter
    if (!query.search) {
      firestoreQuery = firestoreQuery.orderBy(sortBy, sortOrder);
    }

    return paginateQuery(firestoreQuery, query.page, query.limit, collectionRef);
  }

  /**
   * Get a single user by UID.
   */
  async findOne(uid: string) {
    const db = this.firebaseService.getFirestore();
    const userDoc = await db.collection('users').doc(uid).get();

    if (!userDoc.exists) {
      throw new NotFoundException(`User with ID ${uid} not found`);
    }

    return { id: userDoc.id, ...userDoc.data() };
  }

  /**
   * Update a user's profile.
   */
  async update(uid: string, dto: UpdateUserDto, performedBy: string) {
    const db = this.firebaseService.getFirestore();
    const userRef = db.collection('users').doc(uid);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      throw new NotFoundException(`User with ID ${uid} not found`);
    }

    const updateData: Record<string, unknown> = {
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    if (dto.displayName !== undefined) updateData.displayName = dto.displayName;
    if (dto.role !== undefined) updateData.role = dto.role;
    if (dto.phone !== undefined) updateData.phone = dto.phone;
    if (dto.schoolId !== undefined) updateData.schoolId = dto.schoolId;
    if (dto.isActive !== undefined) updateData.isActive = dto.isActive;
    if (dto.photoURL !== undefined) updateData.photoURL = dto.photoURL;

    await userRef.update(updateData);

    // Update custom claims if role changed
    if (dto.role) {
      await this.firebaseService
        .getAuth()
        .setCustomUserClaims(uid, { role: dto.role });
    }

    // Update Auth display name if changed
    if (dto.displayName) {
      await this.firebaseService.getAuth().updateUser(uid, {
        displayName: dto.displayName,
      });
    }

    await this.auditService.log({
      action: 'UPDATE_USER',
      performedBy,
      targetCollection: 'users',
      targetId: uid,
      details: updateData,
    });

    return this.findOne(uid);
  }

  /**
   * Soft-delete a user by deactivating their account.
   */
  async remove(uid: string, performedBy: string) {
    const db = this.firebaseService.getFirestore();
    const userRef = db.collection('users').doc(uid);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      throw new NotFoundException(`User with ID ${uid} not found`);
    }

    // Soft delete - deactivate account
    await userRef.update({
      isActive: false,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    // Disable in Firebase Auth
    await this.firebaseService.getAuth().updateUser(uid, { disabled: true });

    await this.auditService.log({
      action: 'DELETE_USER',
      performedBy,
      targetCollection: 'users',
      targetId: uid,
      details: { email: userDoc.data()?.email },
    });

    return { message: 'User deactivated successfully' };
  }
}
