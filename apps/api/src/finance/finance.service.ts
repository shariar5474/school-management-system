import { Injectable, NotFoundException, BadRequestException, Logger } from '@nestjs/common';
import { FirebaseService } from '../common/firebase/firebase.service';
import { CreateFeeStructureDto } from './dto/create-fee-structure.dto';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { RecordPaymentDto } from './dto/record-payment.dto';
import { PaginationQueryDto } from '../common/dto/pagination.dto';
import { paginateQuery } from '../common/utils/pagination.utils';
import { AuditService } from '../audit/audit.service';
import * as admin from 'firebase-admin';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FinanceService {
  private readonly logger = new Logger(FinanceService.name);

  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly auditService: AuditService,
  ) {}

  // ==================== Fee Structures ====================
  async createFeeStructure(dto: CreateFeeStructureDto, createdBy: string) {
    const db = this.firebaseService.getFirestore();
    const id = uuidv4();
    const now = admin.firestore.FieldValue.serverTimestamp();
    const totalAnnualFee = dto.fees.reduce((sum, f) => sum + f.amount, 0);

    const data = {
      ...dto,
      id,
      totalAnnualFee,
      status: 'active',
      createdAt: now,
      updatedAt: now,
      createdBy,
    };

    await db.collection('feeStructures').doc(id).set(data);
    return data;
  }

  async getFeeStructures(schoolId = 'default', classId?: string) {
    const db = this.firebaseService.getFirestore();
    let query: admin.firestore.Query = db.collection('feeStructures').where('schoolId', '==', schoolId);

    if (classId) {
      query = query.where('classId', '==', classId);
    }

    const snapshot = await query.get();
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }

  // ==================== Invoices ====================
  async createInvoice(dto: CreateInvoiceDto, createdBy: string) {
    const db = this.firebaseService.getFirestore();
    const id = uuidv4();
    const now = admin.firestore.FieldValue.serverTimestamp();
    const schoolId = dto.schoolId || 'default';

    const year = new Date().getFullYear();
    const countSnapshot = await db
      .collection('invoices')
      .where('schoolId', '==', schoolId)
      .count()
      .get();
    const count = countSnapshot.data().count + 1;
    const invoiceNumber = `INV-${year}-${count.toString().padStart(4, '0')}`;

    const totalAmount = dto.items.reduce((sum, i) => sum + i.amount, 0);
    const discountAmount = dto.discountAmount || 0;
    const netAmount = Math.max(0, totalAmount - discountAmount);
    const paidAmount = 0;
    const dueAmount = netAmount;

    const invoiceData = {
      ...dto,
      id,
      schoolId,
      invoiceNumber,
      totalAmount,
      discountAmount,
      netAmount,
      paidAmount,
      dueAmount,
      status: dueAmount === 0 ? 'paid' : 'unpaid',
      createdAt: now,
      updatedAt: now,
      createdBy,
    };

    await db.collection('invoices').doc(id).set(invoiceData);

    await this.auditService.log({
      schoolId,
      action: 'invoice.created',
      entityType: 'invoice',
      entityId: id,
      description: `Created invoice ${invoiceNumber} for Student ${dto.studentId} - Amount: ${netAmount} BDT`,
      performedBy: createdBy,
      performedByEmail: createdBy,
    });

    return invoiceData;
  }

  async getInvoices(pagination: PaginationQueryDto, schoolId = 'default', studentId?: string, status?: string) {
    const db = this.firebaseService.getFirestore();
    let query: admin.firestore.Query = db.collection('invoices').where('schoolId', '==', schoolId);

    if (studentId) {
      query = query.where('studentId', '==', studentId);
    }
    if (status) {
      query = query.where('status', '==', status);
    }

    return paginateQuery(query, pagination);
  }

  async getInvoiceById(id: string): Promise<any> {
    const db = this.firebaseService.getFirestore();
    const doc = await db.collection('invoices').doc(id).get();
    if (!doc.exists) {
      throw new NotFoundException(`Invoice ${id} not found`);
    }
    return { id: doc.id, ...(doc.data() as any) };
  }

  // ==================== Payments ====================
  async recordPayment(dto: RecordPaymentDto, receivedBy: string) {
    const db = this.firebaseService.getFirestore();
    const schoolId = dto.schoolId || 'default';
    const now = admin.firestore.FieldValue.serverTimestamp();

    return db.runTransaction(async (transaction) => {
      const invoiceRef = db.collection('invoices').doc(dto.invoiceId);
      const invoiceDoc = await transaction.get(invoiceRef);

      if (!invoiceDoc.exists) {
        throw new NotFoundException(`Invoice ${dto.invoiceId} not found`);
      }

      const invoice = invoiceDoc.data()!;
      const currentDue = invoice.dueAmount;

      if (dto.amount <= 0) {
        throw new BadRequestException('Payment amount must be greater than 0');
      }

      if (dto.amount > currentDue) {
        throw new BadRequestException(
          `Payment amount (${dto.amount}) exceeds outstanding due (${currentDue})`,
        );
      }

      const newPaidAmount = invoice.paidAmount + dto.amount;
      const newDueAmount = invoice.dueAmount - dto.amount;
      const newStatus = newDueAmount === 0 ? 'paid' : 'partial';

      // Generate receipt number REC-YYYY-XXXX
      const year = new Date().getFullYear();
      const countSnapshot = await db
        .collection('payments')
        .where('schoolId', '==', schoolId)
        .count()
        .get();
      const count = countSnapshot.data().count + 1;
      const receiptNumber = `REC-${year}-${count.toString().padStart(4, '0')}`;

      const paymentId = uuidv4();
      const paymentRef = db.collection('payments').doc(paymentId);

      const paymentData = {
        id: paymentId,
        schoolId,
        invoiceId: dto.invoiceId,
        studentId: invoice.studentId,
        amount: dto.amount,
        paymentMethod: dto.paymentMethod,
        receiptNumber,
        transactionReference: dto.transactionReference || '',
        remarks: dto.remarks || '',
        paymentDate: new Date().toISOString().split('T')[0],
        receivedBy,
        createdAt: now,
      };

      transaction.set(paymentRef, paymentData);
      transaction.update(invoiceRef, {
        paidAmount: newPaidAmount,
        dueAmount: newDueAmount,
        status: newStatus,
        updatedAt: now,
      });

      return {
        payment: paymentData,
        invoice: {
          id: dto.invoiceId,
          paidAmount: newPaidAmount,
          dueAmount: newDueAmount,
          status: newStatus,
        },
      };
    });
  }

  // ==================== Financial Reports ====================
  async getFinancialSummary(schoolId = 'default') {
    const db = this.firebaseService.getFirestore();
    const invoicesSnapshot = await db.collection('invoices').where('schoolId', '==', schoolId).get();

    let totalBilled = 0;
    let totalCollected = 0;
    let totalDue = 0;
    let paidCount = 0;
    let partialCount = 0;
    let unpaidCount = 0;

    invoicesSnapshot.docs.forEach((doc) => {
      const data = doc.data();
      totalBilled += data.netAmount || 0;
      totalCollected += data.paidAmount || 0;
      totalDue += data.dueAmount || 0;

      if (data.status === 'paid') paidCount++;
      else if (data.status === 'partial') partialCount++;
      else unpaidCount++;
    });

    return {
      totalBilled,
      totalCollected,
      totalDue,
      invoiceCount: invoicesSnapshot.size,
      paidCount,
      partialCount,
      unpaidCount,
    };
  }
}
