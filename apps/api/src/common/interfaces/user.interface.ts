/**
 * Decoded user interface representing the authenticated user
 * attached to the request after passing through AuthGuard.
 */
export interface DecodedUser {
  /** Firebase Auth UID */
  uid: string;
  /** User's email address */
  email: string;
  /** User's display name */
  displayName?: string;
  /** User's role in the system */
  role: 'super_admin' | 'school_admin' | 'teacher' | 'student' | 'parent' | 'accountant' | 'librarian';
  /** Whether the user account is active */
  isActive: boolean;
  /** Optional school ID the user belongs to */
  schoolId?: string;
  /** User's phone number */
  phone?: string;
  /** User's profile photo URL */
  photoURL?: string;
}

/**
 * Firestore user document structure
 */
export interface UserDocument {
  uid: string;
  email: string;
  displayName: string;
  role: string;
  isActive: boolean;
  schoolId?: string;
  phone?: string;
  photoURL?: string;
  createdAt: FirebaseFirestore.Timestamp;
  updatedAt: FirebaseFirestore.Timestamp;
  lastLoginAt?: FirebaseFirestore.Timestamp;
}
