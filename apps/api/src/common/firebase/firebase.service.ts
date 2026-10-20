/**
 * Firebase Admin SDK Service
 * Provides centralized access to Firestore, Auth, and Storage instances.
 * Initialized using environment variables for service account credentials.
 */
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseService implements OnModuleInit {
  private readonly logger = new Logger(FirebaseService.name);
  private app!: admin.app.App;

  constructor(private readonly configService: ConfigService) {}

  onModuleInit() {
    const projectId = this.configService.get<string>('FIREBASE_PROJECT_ID');
    const clientEmail = this.configService.get<string>('FIREBASE_CLIENT_EMAIL');
    const privateKey = this.configService
      .get<string>('FIREBASE_PRIVATE_KEY')
      ?.replace(/\\n/g, '\n');
    const storageBucket = this.configService.get<string>('FIREBASE_STORAGE_BUCKET');

    if (!projectId) {
      this.logger.warn(
        'FIREBASE_PROJECT_ID not set. Firebase services will not be available.',
      );
    }

    try {
      // Avoid reinitializing if already initialized (e.g., in tests)
      if (admin.apps.length === 0) {
        if (projectId && clientEmail && privateKey) {
          this.app = admin.initializeApp({
            credential: admin.credential.cert({
              projectId,
              clientEmail,
              privateKey,
            }),
            storageBucket,
          });
          this.logger.log('Firebase Admin SDK initialized successfully with service account credentials');
        } else {
          this.app = admin.initializeApp({
            projectId: projectId || 'school-demo-project',
          });
          this.logger.warn(
            'Firebase Admin SDK initialized in development/fallback mode. Configure FIREBASE_CLIENT_EMAIL and FIREBASE_PRIVATE_KEY for live Firestore operations.',
          );
        }
      } else {
        this.app = admin.apps[0]!;
        this.logger.log('Using existing Firebase Admin SDK instance');
      }
    } catch (error) {
      this.logger.error('Failed to initialize Firebase Admin SDK', error);
      throw error;
    }
  }

  /** Returns the Firestore database instance */
  getFirestore(): admin.firestore.Firestore {
    return this.app.firestore();
  }

  /** Returns the Firebase Auth instance */
  getAuth(): admin.auth.Auth {
    return this.app.auth();
  }

  /** Returns the Firebase Storage bucket */
  getStorage(): admin.storage.Storage {
    return this.app.storage();
  }

  /** Returns the underlying Firebase app */
  getApp(): admin.app.App {
    return this.app;
  }
}
