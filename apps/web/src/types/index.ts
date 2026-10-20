/**
 * Core TypeScript interfaces for the School Management System
 */

/** User roles in the system */
export type UserRole = 'super_admin' | 'admin' | 'teacher' | 'student' | 'parent' | 'accountant';

/** Base user interface */
export interface User {
  id: string;
  email: string;
  displayName: string;
  displayNameBn?: string;
  role: UserRole;
  phone?: string;
  photoURL?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

/** Student interface */
export interface Student {
  id: string;
  userId?: string;
  studentId: string;
  nameEn: string;
  nameBn: string;
  fatherNameEn: string;
  fatherNameBn: string;
  motherNameEn: string;
  motherNameBn: string;
  guardianPhone: string;
  guardianEmail?: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  bloodGroup?: string;
  religion?: string;
  nationality: string;
  currentAddress: string;
  permanentAddress: string;
  classId: string;
  sectionId: string;
  rollNumber: number;
  admissionDate: string;
  photoURL?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

/** Teacher interface */
export interface Teacher {
  id: string;
  userId?: string;
  teacherId: string;
  nameEn: string;
  nameBn: string;
  email: string;
  phone: string;
  designation: string;
  department: string;
  qualifications: string[];
  joiningDate: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  bloodGroup?: string;
  address: string;
  photoURL?: string;
  salary: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

/** Class/Grade interface */
export interface Class {
  id: string;
  nameEn: string;
  nameBn: string;
  numericValue: number;
  sections: Section[];
  subjects: Subject[];
  monthlyFee: number;
  isActive: boolean;
}

/** Section within a class */
export interface Section {
  id: string;
  name: string;
  classId: string;
  classTeacherId?: string;
  capacity: number;
  currentStudents: number;
}

/** Subject interface */
export interface Subject {
  id: string;
  nameEn: string;
  nameBn: string;
  code: string;
  classId: string;
  teacherId?: string;
  fullMarks: number;
  passMarks: number;
  type: 'compulsory' | 'optional' | 'elective';
}

/** Exam interface */
export interface Exam {
  id: string;
  nameEn: string;
  nameBn: string;
  type: 'class_test' | 'midterm' | 'final' | 'board_mock';
  academicYear: string;
  classId: string;
  startDate: string;
  endDate: string;
  isPublished: boolean;
  createdAt: string;
}

/** Exam result */
export interface ExamResult {
  id: string;
  examId: string;
  studentId: string;
  subjectId: string;
  obtainedMarks: number;
  grade: string;
  gpa: number;
  remarks?: string;
}

/** Attendance record */
export interface Attendance {
  id: string;
  studentId: string;
  classId: string;
  sectionId: string;
  date: string;
  status: 'present' | 'absent' | 'late' | 'leave';
  remarks?: string;
  recordedBy: string;
}

/** Fee record */
export interface FeeRecord {
  id: string;
  studentId: string;
  classId: string;
  month: string;
  year: number;
  amount: number;
  discount: number;
  fine: number;
  totalAmount: number;
  paidAmount: number;
  dueAmount: number;
  status: 'paid' | 'partial' | 'unpaid' | 'overdue';
  paymentDate?: string;
  paymentMethod?: 'cash' | 'bank' | 'mobile_banking';
  transactionId?: string;
  receiptNumber?: string;
  collectedBy?: string;
  createdAt: string;
}

/** Notice/Announcement */
export interface Notice {
  id: string;
  titleEn: string;
  titleBn: string;
  contentEn: string;
  contentBn: string;
  category: 'general' | 'academic' | 'exam' | 'holiday' | 'event' | 'admission';
  priority: 'normal' | 'important' | 'urgent';
  attachmentURL?: string;
  isPublished: boolean;
  publishDate: string;
  expiryDate?: string;
  authorId: string;
  createdAt: string;
}

/** Event interface */
export interface SchoolEvent {
  id: string;
  titleEn: string;
  titleBn: string;
  descriptionEn: string;
  descriptionBn: string;
  date: string;
  startTime: string;
  endTime: string;
  venue: string;
  imageURL?: string;
  isPublished: boolean;
  createdAt: string;
}

/** Academic year / session */
export interface AcademicYear {
  id: string;
  year: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
}

/** Gallery image */
export interface GalleryImage {
  id: string;
  title: string;
  imageURL: string;
  category: string;
  uploadedAt: string;
}

/** Dashboard statistics */
export interface DashboardStats {
  totalStudents: number;
  totalTeachers: number;
  totalClasses: number;
  totalIncome: number;
  totalExpense: number;
  attendanceRate: number;
  passRate: number;
  pendingFees: number;
}

/** Pagination params */
export interface PaginationParams {
  page: number;
  limit: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

/** API response wrapper */
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  pagination?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

/** Select option for dropdowns */
export interface SelectOption {
  value: string;
  label: string;
}

/** Navigation item */
export interface NavItem {
  label: string;
  labelBn: string;
  href: string;
  icon?: string;
  roles?: UserRole[];
  children?: NavItem[];
}
