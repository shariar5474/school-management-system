import {
  Injectable,
  UnauthorizedException,
  ForbiddenException,
  Logger,
  ConflictException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FirebaseService } from '../common/firebase/firebase.service';
import { SetupAdminDto } from './dto/setup-admin.dto';
import { AuditService } from '../audit/audit.service';
import * as admin from 'firebase-admin';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly configService: ConfigService,
    private readonly auditService: AuditService,
  ) {}

  /**
   * Verify a Firebase ID token and return user profile data.
   * Also updates the lastLoginAt timestamp.
   */
  async login(idToken: string) {
    try {
      const decodedToken = await this.firebaseService
        .getAuth()
        .verifyIdToken(idToken);

      const db = this.firebaseService.getFirestore();
      const userRef = db.collection('users').doc(decodedToken.uid);
      const userDoc = await userRef.get();

      if (!userDoc.exists) {
        throw new UnauthorizedException(
          'User profile not found. Please contact an administrator to create your account.',
        );
      }

      const userData = userDoc.data()!;

      if (userData.isActive === false) {
        throw new ForbiddenException('Your account has been deactivated.');
      }

      // Update last login timestamp
      await userRef.update({
        lastLoginAt: admin.firestore.FieldValue.serverTimestamp(),
      });

      return {
        uid: decodedToken.uid,
        email: decodedToken.email || userData.email,
        displayName: userData.displayName,
        role: userData.role,
        isActive: userData.isActive,
        schoolId: userData.schoolId,
        phone: userData.phone,
        photoURL: userData.photoURL,
      };
    } catch (error) {
      if (
        error instanceof UnauthorizedException ||
        error instanceof ForbiddenException
      ) {
        throw error;
      }
      this.logger.error('Login verification failed', error);
      throw new UnauthorizedException('Invalid authentication token');
    }
  }

  /**
   * Bootstrap the first super admin user.
   * Requires the ADMIN_SETUP_SECRET to prevent unauthorized use.
   * Can only be used once - fails if a super_admin already exists.
   */
  async setupAdmin(dto: SetupAdminDto) {
    // Verify setup secret
    const setupSecret = this.configService.get<string>('ADMIN_SETUP_SECRET');
    if (!setupSecret || dto.secret !== setupSecret) {
      throw new ForbiddenException('Invalid setup secret');
    }

    const db = this.firebaseService.getFirestore();

    // Check if a super_admin already exists
    const existingAdmins = await db
      .collection('users')
      .where('role', '==', 'super_admin')
      .limit(1)
      .get();

    if (!existingAdmins.empty) {
      throw new ConflictException(
        'A super admin already exists. This endpoint can only be used for initial setup.',
      );
    }

    // Verify the provided ID token
    let decodedToken;
    try {
      decodedToken = await this.firebaseService
        .getAuth()
        .verifyIdToken(dto.idToken);
    } catch {
      throw new UnauthorizedException('Invalid ID token provided');
    }

    // Create the super admin user document in Firestore
    const now = admin.firestore.FieldValue.serverTimestamp();
    const userData = {
      uid: decodedToken.uid,
      email: dto.email || decodedToken.email,
      displayName: dto.displayName,
      role: 'super_admin',
      isActive: true,
      createdAt: now,
      updatedAt: now,
      lastLoginAt: now,
    };

    await db.collection('users').doc(decodedToken.uid).set(userData);

    // Set custom claims on Firebase Auth user
    await this.firebaseService.getAuth().setCustomUserClaims(decodedToken.uid, {
      role: 'super_admin',
    });

    // Log the action
    await this.auditService.log({
      action: 'SETUP_ADMIN',
      performedBy: decodedToken.uid,
      targetCollection: 'users',
      targetId: decodedToken.uid,
      details: { email: dto.email, displayName: dto.displayName },
    });

    this.logger.log(`Super admin created: ${dto.email}`);

    return {
      message: 'Super admin account created successfully',
      uid: decodedToken.uid,
      email: dto.email,
      role: 'super_admin',
    };
  }

  /**
   * Get the current user's profile.
   */
  async getProfile(uid: string) {
    const db = this.firebaseService.getFirestore();
    const userDoc = await db.collection('users').doc(uid).get();

    if (!userDoc.exists) {
      throw new UnauthorizedException('User profile not found');
    }

    const data = userDoc.data()!;
    return {
      uid: userDoc.id,
      email: data.email,
      displayName: data.displayName,
      role: data.role,
      isActive: data.isActive,
      schoolId: data.schoolId,
      phone: data.phone,
      photoURL: data.photoURL,
      createdAt: data.createdAt,
      lastLoginAt: data.lastLoginAt,
    };
  }
}
