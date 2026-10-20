import { Injectable, Logger } from '@nestjs/common';
import { FirebaseService } from '../common/firebase/firebase.service';
import { UpdateSettingsDto } from './dto/update-settings.dto';
import { AuditService } from '../audit/audit.service';
import * as admin from 'firebase-admin';

@Injectable()
export class SettingsService {
  private readonly logger = new Logger(SettingsService.name);
  private readonly COLLECTION = 'schoolSettings';

  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly auditService: AuditService,
  ) {}

  /**
   * Get settings with sensible default fallback
   */
  async getSettings(schoolId = 'default') {
    const db = this.firebaseService.getFirestore();
    const doc = await db.collection(this.COLLECTION).doc(schoolId).get();

    if (!doc.exists) {
      return {
        schoolId,
        schoolNameEn: 'Agrani Model High School & College',
        schoolNameBn: 'অগ্রণী মডেল উচ্চ বিদ্যালয় ও কলেজ',
        sloganEn: 'Excellence in Education since 1995',
        sloganBn: '১৯৯৫ সাল থেকে শিক্ষার উৎকর্ষে',
        address: '123 College Road, Dhanmondi, Dhaka-1205',
        addressBn: '১২৩ কলেজ রোড, ধানমন্ডি, ঢাকা-১২০৫',
        phone: '+880 1712-345678',
        email: 'info@agranischool.edu.bd',
        activeResultTemplateId: 'classic',
        enableOnlineAdmission: true,
        primaryColor: '#1e3a5f',
        secondaryColor: '#2563eb',
        accentColor: '#f59e0b',
        principalNameEn: 'Prof. Mohammad Harunur Rashid',
        principalNameBn: 'প্রফেসর মোহাম্মদ হারুনুর রশীদ',
        principalMessageEn: 'Welcome to Agrani Model High School & College. We nurture young minds for leadership and character.',
        principalMessageBn: 'অগ্রণী মডেল উচ্চ বিদ্যালয় ও কলেজে আপনাকে স্বাগতম। আমরা ভবিষ্যতের নেতৃত্ব ও চরিত্র গঠনে নিবেদিতপ্রাণ।',
      };
    }

    return { schoolId, ...doc.data() };
  }

  async updateSettings(schoolId: string, dto: UpdateSettingsDto, updatedBy: string) {
    const db = this.firebaseService.getFirestore();
    const docRef = db.collection(this.COLLECTION).doc(schoolId);
    const existing = await this.getSettings(schoolId);

    const updateData = {
      ...dto,
      schoolId,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedBy,
    };

    await docRef.set(updateData, { merge: true });

    await this.auditService.log({
      schoolId,
      action: 'settings.updated',
      entityType: 'settings',
      entityId: schoolId,
      description: 'Updated school settings and active template configuration',
      performedBy: updatedBy,
      performedByEmail: updatedBy,
      previousValue: existing,
      newValue: updateData,
    });

    return { ...existing, ...updateData };
  }
}
