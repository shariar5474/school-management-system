import { Injectable, NotFoundException, BadRequestException, Logger } from '@nestjs/common';
import { FirebaseService } from '../common/firebase/firebase.service';
import { CreateBookDto } from './dto/create-book.dto';
import { IssueBookDto } from './dto/issue-book.dto';
import { PaginationQueryDto } from '../common/dto/pagination.dto';
import { paginateQuery } from '../common/utils/pagination.utils';
import { AuditService } from '../audit/audit.service';
import * as admin from 'firebase-admin';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class LibraryService {
  private readonly logger = new Logger(LibraryService.name);

  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly auditService: AuditService,
  ) {}

  // ==================== Books ====================
  async createBook(dto: CreateBookDto, createdBy: string) {
    const db = this.firebaseService.getFirestore();
    const id = uuidv4();
    const now = admin.firestore.FieldValue.serverTimestamp();

    const bookData = {
      ...dto,
      id,
      availableCopies: dto.totalCopies,
      status: 'active',
      createdAt: now,
      updatedAt: now,
      createdBy,
    };

    await db.collection('books').doc(id).set(bookData);
    return bookData;
  }

  async getBooks(pagination: PaginationQueryDto, schoolId = 'default', category?: string) {
    const db = this.firebaseService.getFirestore();
    let query: admin.firestore.Query = db.collection('books').where('schoolId', '==', schoolId);

    if (category) {
      query = query.where('category', '==', category);
    }

    return paginateQuery(query, pagination);
  }

  // ==================== Transactions ====================
  async issueBook(dto: IssueBookDto, issuedBy: string) {
    const db = this.firebaseService.getFirestore();
    const now = admin.firestore.FieldValue.serverTimestamp();
    const schoolId = dto.schoolId || 'default';

    return db.runTransaction(async (transaction) => {
      const bookRef = db.collection('books').doc(dto.bookId);
      const bookDoc = await transaction.get(bookRef);

      if (!bookDoc.exists) {
        throw new NotFoundException(`Book with ID ${dto.bookId} not found`);
      }

      const book = bookDoc.data()!;
      if (book.availableCopies <= 0) {
        throw new BadRequestException(`No available copies of "${book.title}" left to issue`);
      }

      const transactionId = uuidv4();
      const transactionRef = db.collection('bookTransactions').doc(transactionId);

      const transactionData = {
        id: transactionId,
        schoolId,
        bookId: dto.bookId,
        bookTitle: book.title,
        borrowerId: dto.borrowerId,
        borrowerType: dto.borrowerType,
        issueDate: new Date().toISOString().split('T')[0],
        dueDate: dto.dueDate,
        status: 'issued',
        remarks: dto.remarks || '',
        issuedBy,
        createdAt: now,
      };

      transaction.set(transactionRef, transactionData);
      transaction.update(bookRef, {
        availableCopies: book.availableCopies - 1,
        updatedAt: now,
      });

      return transactionData;
    });
  }

  async returnBook(transactionId: string, returnedTo: string) {
    const db = this.firebaseService.getFirestore();
    const now = admin.firestore.FieldValue.serverTimestamp();

    return db.runTransaction(async (transaction) => {
      const transRef = db.collection('bookTransactions').doc(transactionId);
      const transDoc = await transaction.get(transRef);

      if (!transDoc.exists) {
        throw new NotFoundException(`Book transaction ${transactionId} not found`);
      }

      const transData = transDoc.data()!;
      if (transData.status === 'returned') {
        throw new BadRequestException('This book has already been returned');
      }

      const bookRef = db.collection('books').doc(transData.bookId);
      const bookDoc = await transaction.get(bookRef);

      transaction.update(transRef, {
        status: 'returned',
        returnDate: new Date().toISOString().split('T')[0],
        returnedTo,
        updatedAt: now,
      });

      if (bookDoc.exists) {
        const book = bookDoc.data()!;
        transaction.update(bookRef, {
          availableCopies: book.availableCopies + 1,
          updatedAt: now,
        });
      }

      return { message: 'Book returned successfully', transactionId };
    });
  }

  async getBorrowingHistory(borrowerId: string, schoolId = 'default') {
    const db = this.firebaseService.getFirestore();
    const snapshot = await db
      .collection('bookTransactions')
      .where('schoolId', '==', schoolId)
      .where('borrowerId', '==', borrowerId)
      .orderBy('createdAt', 'desc')
      .get();
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }
}
