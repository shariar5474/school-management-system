/**
 * AuthGuard - Verifies Firebase ID tokens from the Authorization header.
 * Extracts Bearer token, verifies with Firebase Admin Auth,
 * loads user profile from Firestore, and attaches to request.
 */
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';
import { DecodedUser } from '../interfaces/user.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new Logger(AuthGuard.name);

  constructor(private readonly firebaseService: FirebaseService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('Authorization header is missing');
    }

    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      throw new UnauthorizedException(
        'Invalid authorization header format. Expected: Bearer <token>',
      );
    }

    const token = parts[1];

    try {
      // Verify the Firebase ID token
      const decodedToken = await this.firebaseService
        .getAuth()
        .verifyIdToken(token);

      // Load user profile from Firestore users collection
      const db = this.firebaseService.getFirestore();
      const userDoc = await db.collection('users').doc(decodedToken.uid).get();

      if (!userDoc.exists) {
        throw new UnauthorizedException(
          'User profile not found. Please contact an administrator.',
        );
      }

      const userData = userDoc.data()!;

      // Check if user is active
      if (userData.isActive === false) {
        throw new UnauthorizedException(
          'Your account has been deactivated. Please contact an administrator.',
        );
      }

      // Attach decoded user to request
      const user: DecodedUser = {
        uid: decodedToken.uid,
        email: decodedToken.email || userData.email,
        displayName: userData.displayName || decodedToken.name,
        role: userData.role || 'student',
        isActive: userData.isActive !== false,
        schoolId: userData.schoolId,
        phone: userData.phone,
        photoURL: userData.photoURL || decodedToken.picture,
      };

      request.user = user;
      return true;
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      this.logger.error('Token verification failed', error);
      throw new UnauthorizedException('Invalid or expired authentication token');
    }
  }
}
