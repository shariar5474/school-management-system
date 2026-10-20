/**
 * Firebase client configuration
 * Initializes Firebase app and exports auth/firestore instances
 */
import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { getStorage, type FirebaseStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'AIzaSyDw584MZ5OrRCep_cKbUQuss4iOmuOesEU',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'school-management-8th-batch.firebaseapp.com',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'school-management-8th-batch',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'school-management-8th-batch.firebasestorage.app',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '984721260375',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '1:984721260375:web:c548a3f20bb0b01beb0812',
};

// Initialize Firebase safely
const app: FirebaseApp = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

let authInstance: Auth;
try {
  authInstance = getAuth(app);
} catch {
  authInstance = {} as Auth;
}

let dbInstance: Firestore;
try {
  dbInstance = getFirestore(app);
} catch {
  dbInstance = {} as Firestore;
}

let storageInstance: FirebaseStorage;
try {
  storageInstance = getStorage(app);
} catch {
  storageInstance = {} as FirebaseStorage;
}

export const auth: Auth = authInstance;
export const db: Firestore = dbInstance;
export const storage: FirebaseStorage = storageInstance;
export default app;
