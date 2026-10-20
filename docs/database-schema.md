# Database Schema Documentation

## School Management System — Cloud Firestore Data Model

This document describes the complete Firestore collection structure, document schemas, relationships, query patterns, and required indexes.

---

## Architecture Notes

- **Database**: Google Cloud Firestore (NoSQL document database)
- **Multi-school ready**: Every document includes a `schoolId` field
- **Soft deletion**: Records use `status` fields (active/archived) instead of hard deletes
- **Timestamps**: All documents have `createdAt` and `updatedAt` Firestore Timestamps
- **References**: Use document ID strings, not Firestore DocumentReferences
- **Audit trail**: Sensitive mutations are logged to `auditLogs`

---

## Collections

### 1. `users`
**Purpose**: Firebase Auth user profile and role mapping.

```typescript
{
  id: string;                    // Same as Firebase Auth UID
  email: string;
  displayName: string;
  role: 'super_admin' | 'school_admin' | 'admission_officer' | 'teacher' | 'accountant' | 'librarian' | 'student' | 'parent';
  schoolId: string;
  isActive: boolean;
  phoneNumber?: string;
  photoURL?: string;
  permissions?: string[];        // Granular permissions array
  lastLoginAt?: Timestamp;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  createdBy: string;             // UID of creator
}
```

**Access**: Admins read/write all. Users read own document. Cannot self-modify `role`.

---

### 2. `students`
**Purpose**: Student demographic and academic profile.

```typescript
{
  id: string;                    // Auto-generated
  schoolId: string;
  studentId: string;             // Human-readable unique ID (e.g., "STU-2026-0001")
  admissionNumber: string;       // Unique admission number
  userId?: string;               // Linked Firebase Auth UID (if student has login)
  
  // Personal Info
  nameEn: string;                // English name
  nameBn: string;                // Bengali name
  dateOfBirth: string;           // ISO date string "YYYY-MM-DD"
  gender: 'male' | 'female' | 'other';
  bloodGroup?: string;
  religion?: string;
  nationality: string;
  birthCertificateNo?: string;
  photoURL?: string;
  
  // Contact
  phone?: string;
  email?: string;
  presentAddress: string;
  permanentAddress: string;
  
  // Current Academic
  currentClassId: string;
  currentSectionId: string;
  currentAcademicYearId: string;
  rollNumber?: number;
  groupOrStream?: string;        // Science, Commerce, Arts, etc.
  
  // Guardian
  guardianId: string;            // Reference to guardians collection
  guardianUserId?: string;       // Guardian's Firebase Auth UID
  
  // Administrative
  admissionDate: string;         // ISO date
  previousSchool?: string;
  previousClass?: string;
  status: 'active' | 'archived' | 'transferred' | 'graduated' | 'suspended';
  
  // Metadata
  createdAt: Timestamp;
  updatedAt: Timestamp;
  createdBy: string;
}
```

**Query patterns**:
- By schoolId + status + createdAt (list active students)
- By schoolId + currentClassId + currentSectionId (class roster)
- By studentId (lookup)
- By admissionNumber (lookup)

---

### 3. `guardians`
**Purpose**: Parent/Guardian information linked to students.

```typescript
{
  id: string;
  schoolId: string;
  userId?: string;               // Firebase Auth UID if guardian has login
  
  // Father
  fatherNameEn: string;
  fatherNameBn: string;
  fatherOccupation?: string;
  fatherPhone?: string;
  fatherEmail?: string;
  fatherNID?: string;
  
  // Mother
  motherNameEn: string;
  motherNameBn: string;
  motherOccupation?: string;
  motherPhone?: string;
  motherEmail?: string;
  motherNID?: string;
  
  // Local Guardian (optional)
  localGuardianName?: string;
  localGuardianPhone?: string;
  localGuardianRelation?: string;
  localGuardianAddress?: string;
  
  // Linked students
  studentIds: string[];          // Array of student document IDs
  
  address: string;
  emergencyContact?: string;
  
  createdAt: Timestamp;
  updatedAt: Timestamp;
  createdBy: string;
}
```

---

### 4. `teacherProfiles`
**Purpose**: Teacher/staff professional profile.

```typescript
{
  id: string;
  schoolId: string;
  userId: string;                // Firebase Auth UID
  employeeId: string;            // Unique employee ID (e.g., "EMP-001")
  
  nameEn: string;
  nameBn: string;
  designation: string;           // e.g., "Assistant Teacher", "Head Teacher"
  department?: string;
  dateOfBirth?: string;
  gender: 'male' | 'female' | 'other';
  phone: string;
  email: string;
  photoURL?: string;
  
  // Professional
  joiningDate: string;
  qualification: string;
  experience?: string;
  specialization?: string;
  
  // Assignments
  assignedClassIds: string[];
  assignedSectionIds: string[];
  assignedSubjectIds: string[];
  isClassTeacher: boolean;
  classTeacherOfClassId?: string;
  classTeacherOfSectionId?: string;
  
  // Display
  showOnWebsite: boolean;        // Whether to show in public teacher directory
  bio?: string;
  biobn?: string;
  
  address?: string;
  status: 'active' | 'inactive' | 'retired';
  
  createdAt: Timestamp;
  updatedAt: Timestamp;
  createdBy: string;
}
```

---

### 5. `academicYears`
**Purpose**: Define academic year periods.

```typescript
{
  id: string;
  schoolId: string;
  name: string;                  // e.g., "2026"
  nameBn: string;                // e.g., "২০২৬"
  startDate: string;             // ISO date
  endDate: string;
  isCurrent: boolean;            // Only one should be true
  status: 'active' | 'completed' | 'upcoming';
  
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

---

### 6. `classes`
**Purpose**: Class/grade definitions.

```typescript
{
  id: string;
  schoolId: string;
  nameEn: string;                // e.g., "Class 1", "Play Group", "KG"
  nameBn: string;                // e.g., "প্রথম শ্রেণি"
  numericOrder: number;          // For sorting (0=Play Group, 1=Nursery, 2=KG, 3=Class 1, etc.)
  hasGroups: boolean;            // Whether this class has Science/Commerce/Arts streams
  groups?: string[];             // e.g., ["Science", "Commerce", "Arts"]
  status: 'active' | 'inactive';
  
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

---

### 7. `sections`
**Purpose**: Section/division within a class.

```typescript
{
  id: string;
  schoolId: string;
  classId: string;
  nameEn: string;                // e.g., "A", "B", "ক"
  nameBn: string;
  capacity?: number;
  classTeacherId?: string;       // Teacher profile ID
  status: 'active' | 'inactive';
  
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

---

### 8. `subjects`
**Purpose**: Subject definitions.

```typescript
{
  id: string;
  schoolId: string;
  nameEn: string;                // e.g., "Mathematics"
  nameBn: string;                // e.g., "গণিত"
  code: string;                  // e.g., "MATH-101"
  type: 'mandatory' | 'optional' | 'elective';
  classIds: string[];            // Which classes this subject is taught in
  hasPractical: boolean;
  theoryMarks?: number;          // Default theory marks
  practicalMarks?: number;       // Default practical marks
  fullMarks: number;             // Total marks
  passMarks: number;
  creditHours?: number;
  status: 'active' | 'inactive';
  
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

---

### 9. `enrollments`
**Purpose**: Student enrollment for each academic year.

```typescript
{
  id: string;
  schoolId: string;
  studentId: string;
  studentUserId?: string;        // For security rules
  guardianUserId?: string;       // For security rules
  academicYearId: string;
  classId: string;
  sectionId: string;
  rollNumber?: number;
  groupOrStream?: string;
  status: 'active' | 'promoted' | 'transferred' | 'withdrawn' | 'completed';
  promotedFrom?: {
    classId: string;
    sectionId: string;
    academicYearId: string;
  };
  
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

**Constraint**: Unique per (studentId, academicYearId) — enforced by backend.

---

### 10. `attendance`
**Purpose**: Daily attendance records.

```typescript
{
  id: string;
  schoolId: string;
  classId: string;
  sectionId: string;
  academicYearId: string;
  date: string;                  // ISO date "YYYY-MM-DD"
  studentId: string;
  studentUserId?: string;
  status: 'present' | 'absent' | 'late' | 'leave';
  remarks?: string;
  
  recordedBy: string;            // UID of teacher/admin
  lastModifiedBy?: string;
  
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

**Constraint**: Unique per (studentId, date) — enforced by backend.

---

### 11. `exams`
**Purpose**: Examination definitions.

```typescript
{
  id: string;
  schoolId: string;
  academicYearId: string;
  nameEn: string;                // e.g., "Half-Yearly Examination 2026"
  nameBn: string;
  type: string;                  // 'class_test' | 'monthly' | 'half_yearly' | 'annual' | 'model_test' | custom
  classIds: string[];            // Which classes are included
  subjectIds: string[];          // Which subjects
  startDate?: string;
  endDate?: string;
  status: 'draft' | 'marks_entry' | 'review' | 'published';
  
  // Default marks config (can be overridden per subject)
  defaultFullMarks: number;
  defaultPassMarks: number;
  
  gradingScaleId?: string;       // Reference to grading scale
  
  publishedAt?: Timestamp;
  publishedBy?: string;
  
  createdAt: Timestamp;
  updatedAt: Timestamp;
  createdBy: string;
}
```

---

### 12. `marks`
**Purpose**: Individual student marks per exam per subject.

```typescript
{
  id: string;
  schoolId: string;
  examId: string;
  studentId: string;
  studentUserId?: string;
  guardianUserId?: string;
  classId: string;
  sectionId: string;
  subjectId: string;
  academicYearId: string;
  
  theoryMarks?: number;
  practicalMarks?: number;
  totalMarks: number;
  fullMarks: number;
  passMarks: number;
  isAbsent: boolean;
  isPassed: boolean;
  grade?: string;
  gradePoint?: number;
  
  enteredBy: string;             // UID
  lastModifiedBy?: string;
  
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

---

### 13. `results`
**Purpose**: Aggregated student results per exam.

```typescript
{
  id: string;
  schoolId: string;
  examId: string;
  studentId: string;
  studentUserId?: string;
  guardianUserId?: string;
  classId: string;
  sectionId: string;
  academicYearId: string;
  
  totalMarksObtained: number;
  totalFullMarks: number;
  percentage: number;
  gpa?: number;
  overallGrade?: string;
  isPassed: boolean;
  failedSubjectIds: string[];
  meritPosition?: number;
  
  subjectResults: Array<{
    subjectId: string;
    subjectNameEn: string;
    subjectNameBn: string;
    theoryMarks?: number;
    practicalMarks?: number;
    totalMarks: number;
    fullMarks: number;
    passMarks: number;
    isAbsent: boolean;
    isPassed: boolean;
    grade?: string;
    gradePoint?: number;
  }>;
  
  status: 'draft' | 'published';
  publishedAt?: Timestamp;
  
  createdAt: Timestamp;
  updatedAt: Timestamp;
  calculatedBy: string;          // UID
}
```

---

### 14. `schoolSettings`
**Purpose**: School-wide configuration. Single document per school.

Document ID: `{schoolId}_settings` or just `main`

```typescript
{
  id: string;
  schoolId: string;
  
  // School Info
  schoolNameEn: string;
  schoolNameBn: string;
  sloganEn?: string;
  sloganBn?: string;
  logoURL?: string;
  faviconURL?: string;
  
  // Contact
  address: string;
  addressBn?: string;
  phone: string;
  phone2?: string;
  email: string;
  website?: string;
  
  // Social
  facebookURL?: string;
  youtubeURL?: string;
  twitterURL?: string;
  
  // People
  principalNameEn?: string;
  principalNameBn?: string;
  principalPhotoURL?: string;
  principalMessageEn?: string;
  principalMessageBn?: string;
  chairmanNameEn?: string;
  chairmanNameBn?: string;
  chairmanPhotoURL?: string;
  chairmanMessageEn?: string;
  chairmanMessageBn?: string;
  
  // Homepage Content
  welcomeMessageEn?: string;
  welcomeMessageBn?: string;
  heroImageURL?: string;
  heroHeadingEn?: string;
  heroHeadingBn?: string;
  heroSubHeadingEn?: string;
  heroSubHeadingBn?: string;
  
  // Academic
  currentAcademicYearId: string;
  
  // Result Template
  activeResultTemplateId: 'classic' | 'modern' | 'premium';
  
  // Grading Scale
  gradingScales: Array<{
    id: string;
    nameEn: string;
    nameBn: string;
    isDefault: boolean;
    grades: Array<{
      grade: string;
      minMarks: number;
      maxMarks: number;
      gradePoint: number;
      description?: string;
    }>;
  }>;
  
  // Features toggle
  enableOnlineAdmission: boolean;
  enableStudentLogin: boolean;
  enableParentLogin: boolean;
  enableFeeModule: boolean;
  enableLibraryModule: boolean;
  showTeacherDirectory: boolean;
  
  // Colors (for public website)
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
  
  updatedAt: Timestamp;
  updatedBy: string;
}
```

---

### 15. `admissions`
**Purpose**: Online admission applications.

```typescript
{
  id: string;
  schoolId: string;
  applicationNumber: string;     // e.g., "ADM-2026-0001"
  academicYearId: string;
  
  // Applicant
  studentNameEn: string;
  studentNameBn: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  bloodGroup?: string;
  birthCertificateNo?: string;
  photoURL?: string;
  
  // Guardian
  fatherNameEn: string;
  fatherNameBn: string;
  fatherPhone: string;
  fatherOccupation?: string;
  motherNameEn: string;
  motherNameBn: string;
  motherPhone?: string;
  motherOccupation?: string;
  
  // Contact
  applicantEmail?: string;
  applicantPhone: string;
  presentAddress: string;
  permanentAddress: string;
  
  // Academic
  desiredClassId: string;
  previousSchool?: string;
  previousClass?: string;
  
  // Documents
  documents: Array<{
    type: string;                // 'birth_certificate' | 'previous_result' | 'photo' | 'transfer_certificate'
    url: string;
    fileName: string;
  }>;
  
  // Status
  status: 'submitted' | 'under_review' | 'corrections_requested' | 'approved' | 'rejected' | 'enrolled';
  reviewNotes?: string;
  reviewedBy?: string;
  reviewedAt?: Timestamp;
  rejectionReason?: string;
  enrolledStudentId?: string;    // If converted to student
  
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

---

### 16. `feeStructures`
**Purpose**: Fee configuration per class/year.

```typescript
{
  id: string;
  schoolId: string;
  academicYearId: string;
  classId: string;
  
  fees: Array<{
    category: string;            // 'admission' | 'tuition' | 'exam' | 'transport' | 'library' | 'lab' | custom
    nameEn: string;
    nameBn: string;
    amount: number;
    frequency: 'one_time' | 'monthly' | 'quarterly' | 'half_yearly' | 'yearly';
    isOptional: boolean;
  }>;
  
  totalAnnualFee: number;
  
  status: 'active' | 'inactive';
  createdAt: Timestamp;
  updatedAt: Timestamp;
  createdBy: string;
}
```

---

### 17. `invoices`
**Purpose**: Fee invoices for students.

```typescript
{
  id: string;
  schoolId: string;
  invoiceNumber: string;         // e.g., "INV-2026-0001"
  studentId: string;
  studentUserId?: string;
  guardianUserId?: string;
  academicYearId: string;
  
  items: Array<{
    category: string;
    description: string;
    amount: number;
  }>;
  
  totalAmount: number;
  discountAmount: number;
  discountReason?: string;
  discountApprovedBy?: string;
  netAmount: number;
  paidAmount: number;
  dueAmount: number;
  
  dueDate: string;
  status: 'unpaid' | 'partial' | 'paid' | 'overdue' | 'cancelled';
  
  month?: string;                // For monthly invoices
  
  createdAt: Timestamp;
  updatedAt: Timestamp;
  createdBy: string;
}
```

---

### 18. `payments`
**Purpose**: Payment records.

```typescript
{
  id: string;
  schoolId: string;
  invoiceId: string;
  studentId: string;
  studentUserId?: string;
  guardianUserId?: string;
  
  amount: number;
  paymentMethod: 'cash' | 'bank_transfer' | 'mobile_banking' | 'cheque' | 'other';
  paymentDate: string;
  receiptNumber: string;
  transactionReference?: string;
  remarks?: string;
  
  receivedBy: string;            // UID
  
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

---

### 19. `notices`
**Purpose**: School notices and announcements.

```typescript
{
  id: string;
  schoolId: string;
  titleEn: string;
  titleBn: string;
  contentEn: string;
  contentBn: string;
  isPublished: boolean;
  isImportant: boolean;
  publishDate: string;
  expiryDate?: string;
  attachmentURL?: string;
  targetAudience: 'all' | 'students' | 'teachers' | 'parents';
  
  createdAt: Timestamp;
  updatedAt: Timestamp;
  createdBy: string;
}
```

---

### 20. `events`
**Purpose**: School events.

```typescript
{
  id: string;
  schoolId: string;
  titleEn: string;
  titleBn: string;
  descriptionEn: string;
  descriptionBn: string;
  eventDate: string;
  endDate?: string;
  location?: string;
  imageURL?: string;
  isPublished: boolean;
  isFeatured: boolean;
  
  createdAt: Timestamp;
  updatedAt: Timestamp;
  createdBy: string;
}
```

---

### 21. `galleryAlbums`
**Purpose**: Photo gallery albums.

```typescript
{
  id: string;
  schoolId: string;
  titleEn: string;
  titleBn: string;
  description?: string;
  coverImageURL?: string;
  images: Array<{
    url: string;
    caption?: string;
    order: number;
  }>;
  isPublished: boolean;
  isFeatured: boolean;
  
  createdAt: Timestamp;
  updatedAt: Timestamp;
  createdBy: string;
}
```

---

### 22. `books`
**Purpose**: Library book catalog.

```typescript
{
  id: string;
  schoolId: string;
  title: string;
  author: string;
  isbn?: string;
  bookCode: string;              // Internal code
  category: string;
  publisher?: string;
  publishYear?: number;
  language: string;
  totalCopies: number;
  availableCopies: number;
  shelfLocation?: string;
  coverImageURL?: string;
  description?: string;
  status: 'active' | 'inactive';
  
  createdAt: Timestamp;
  updatedAt: Timestamp;
  createdBy: string;
}
```

---

### 23. `bookTransactions`
**Purpose**: Book issue/return records.

```typescript
{
  id: string;
  schoolId: string;
  bookId: string;
  borrowerId: string;            // Student or teacher ID
  borrowerType: 'student' | 'teacher';
  borrowerUserId?: string;
  
  issueDate: string;
  dueDate: string;
  returnDate?: string;
  
  status: 'issued' | 'returned' | 'overdue' | 'lost';
  remarks?: string;
  
  issuedBy: string;              // UID
  returnedTo?: string;           // UID
  
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

---

### 24. `auditLogs`
**Purpose**: Immutable log of sensitive actions.

```typescript
{
  id: string;
  schoolId: string;
  action: string;                // e.g., 'student.create', 'result.publish', 'template.change'
  entityType: string;            // e.g., 'student', 'result', 'payment'
  entityId: string;
  description: string;
  previousValue?: any;           // For updates
  newValue?: any;
  performedBy: string;           // UID
  performedByEmail: string;
  ipAddress?: string;
  
  createdAt: Timestamp;          // Immutable — no updatedAt
}
```

---

### 25. `resultTemplates`
**Purpose**: Store template metadata (the 3 built-in templates).

```typescript
{
  id: 'classic' | 'modern' | 'premium';
  nameEn: string;
  nameBn: string;
  description: string;
  previewImageURL?: string;
  isBuiltIn: true;
  
  createdAt: Timestamp;
}
```

Note: The active template is stored in `schoolSettings.activeResultTemplateId`. Template rendering is done by validated React components — no arbitrary code execution.

---

### 26. `dashboardStats`
**Purpose**: Pre-aggregated statistics for dashboard performance.

```typescript
{
  id: string;                    // e.g., "{schoolId}_current"
  schoolId: string;
  totalActiveStudents: number;
  totalTeachers: number;
  totalClasses: number;
  totalSections: number;
  pendingAdmissions: number;
  todayPresentCount: number;
  todayAbsentCount: number;
  totalOutstandingFees: number;
  recentNoticesCount: number;
  upcomingExamsCount: number;
  
  lastUpdatedAt: Timestamp;
}
```

Updated by backend on relevant data changes, not recalculated on every dashboard load.

---

## Relationships Diagram

```
users (1) ──── (1) students
users (1) ──── (1) guardians
users (1) ──── (1) teacherProfiles

students (N) ──── (1) guardians
students (N) ──── (N) enrollments
students (1) ──── (N) attendance
students (1) ──── (N) marks
students (1) ──── (N) results
students (1) ──── (N) invoices

enrollments ──── academicYears
enrollments ──── classes
enrollments ──── sections

exams ──── academicYears
marks ──── exams + students + subjects
results ──── exams + students

classes (1) ──── (N) sections
classes (N) ──── (N) subjects (via classIds array)
teacherProfiles ──── classes + sections + subjects (via assignment arrays)

feeStructures ──── academicYears + classes
invoices ──── students + payments
payments ──── invoices

books (1) ──── (N) bookTransactions
bookTransactions ──── students/teachers
```

---

## Index Requirements

All required composite indexes are defined in `firebase/firestore.indexes.json`.

Key indexes:
- Students by school + status + creation date
- Students by school + class + section + roll
- Enrollments by school + year + class + section
- Attendance by school + class + section + date
- Attendance by student + date
- Marks by exam + student + subject
- Results by student + year + exam
- Invoices by student + status + due date
- Notices by published status + date
- Audit logs by school + action + date

---

## Data Integrity Rules

1. **Unique Student ID**: Generated server-side as `STU-{YEAR}-{SEQUENCE}`. Collision prevention via Firestore transactions.
2. **Unique Enrollment**: One enrollment per (studentId, academicYearId). Checked before creation.
3. **Attendance Dedup**: One record per (studentId, date). Checked before creation.
4. **Marks Validation**: `totalMarks <= fullMarks`. Backend validates before save.
5. **Payment Consistency**: Invoice `paidAmount` and `dueAmount` updated in a transaction with payment creation.
6. **Book Availability**: `availableCopies` decremented/incremented in transaction with issue/return.
7. **Result Lifecycle**: draft → marks_entry → review → published. Only forward transitions by authorized users.
8. **Template Integrity**: Changing active template never modifies marks, grades, or result data.
