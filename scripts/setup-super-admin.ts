/**
 * Super Admin Bootstrap Script
 * 
 * This script creates the initial Super Admin account.
 * Run ONCE during initial setup, then secure or remove.
 * 
 * Usage:
 *   1. Set environment variables (or create .env in scripts/)
 *   2. Run: npx ts-node scripts/setup-super-admin.ts
 * 
 * Required env vars:
 *   FIREBASE_PROJECT_ID
 *   FIREBASE_CLIENT_EMAIL
 *   FIREBASE_PRIVATE_KEY
 *   ADMIN_SETUP_SECRET
 */

import * as admin from 'firebase-admin';
import * as readline from 'readline';
import * as path from 'path';

// Load env from api's .env if exists
require('dotenv').config({ path: path.join(__dirname, '..', 'apps', 'api', '.env') });

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(question: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(question, (answer) => resolve(answer.trim()));
  });
}

async function main() {
  console.log('==============================================');
  console.log(' School Management System — Super Admin Setup');
  console.log('==============================================\n');

  // Verify setup secret
  const secret = await ask('Enter ADMIN_SETUP_SECRET: ');
  if (secret !== process.env.ADMIN_SETUP_SECRET) {
    console.error('❌ Invalid setup secret. Aborting.');
    process.exit(1);
  }

  // Initialize Firebase Admin
  if (!admin.apps.length) {
    const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');
    if (!process.env.FIREBASE_PROJECT_ID || !process.env.FIREBASE_CLIENT_EMAIL || !privateKey) {
      console.error('❌ Missing Firebase credentials in environment variables.');
      process.exit(1);
    }

    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: privateKey,
      }),
    });
  }

  const auth = admin.auth();
  const db = admin.firestore();

  // Collect admin details
  console.log('\nEnter Super Admin details:\n');
  const email = await ask('Email: ');
  const password = await ask('Password (min 8 chars): ');
  const displayName = await ask('Display Name: ');
  const schoolId = await ask('School ID (e.g., "school_001"): ');

  if (password.length < 8) {
    console.error('❌ Password must be at least 8 characters.');
    process.exit(1);
  }

  try {
    // Check if user already exists
    let userRecord: admin.auth.UserRecord;
    try {
      userRecord = await auth.getUserByEmail(email);
      console.log(`\n⚠️  User with email ${email} already exists (UID: ${userRecord.uid}).`);
      const proceed = await ask('Update this user to Super Admin? (yes/no): ');
      if (proceed.toLowerCase() !== 'yes') {
        console.log('Aborted.');
        process.exit(0);
      }
    } catch {
      // User doesn't exist, create new
      userRecord = await auth.createUser({
        email,
        password,
        displayName,
        emailVerified: true,
      });
      console.log(`\n✅ Firebase Auth user created (UID: ${userRecord.uid})`);
    }

    // Set custom claims
    await auth.setCustomUserClaims(userRecord.uid, {
      role: 'super_admin',
      schoolId,
    });

    // Create user document in Firestore
    await db.collection('users').doc(userRecord.uid).set({
      email,
      displayName,
      role: 'super_admin',
      schoolId,
      isActive: true,
      permissions: ['*'], // All permissions
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      createdBy: 'system_setup',
    }, { merge: true });

    console.log('✅ Firestore user document created/updated');

    // Create default school settings if not exists
    const settingsRef = db.collection('schoolSettings').doc(schoolId);
    const settingsDoc = await settingsRef.get();
    
    if (!settingsDoc.exists) {
      await settingsRef.set({
        schoolId,
        schoolNameEn: '[Your School Name]',
        schoolNameBn: '[আপনার বিদ্যালয়ের নাম]',
        sloganEn: 'Education for a Better Tomorrow',
        sloganBn: 'উজ্জ্বল আগামীর জন্য শিক্ষা',
        address: '[School Address]',
        phone: '[Phone Number]',
        email: email,
        currentAcademicYearId: '',
        activeResultTemplateId: 'classic',
        enableOnlineAdmission: true,
        enableStudentLogin: true,
        enableParentLogin: true,
        enableFeeModule: true,
        enableLibraryModule: true,
        showTeacherDirectory: true,
        primaryColor: '#1e3a5f',
        secondaryColor: '#2563eb',
        accentColor: '#f59e0b',
        gradingScales: [
          {
            id: 'default_bd',
            nameEn: 'Bangladesh Standard Grading',
            nameBn: 'বাংলাদেশ মানক গ্রেডিং',
            isDefault: true,
            grades: [
              { grade: 'A+', minMarks: 80, maxMarks: 100, gradePoint: 5.0, description: 'Outstanding' },
              { grade: 'A', minMarks: 70, maxMarks: 79, gradePoint: 4.0, description: 'Excellent' },
              { grade: 'A-', minMarks: 60, maxMarks: 69, gradePoint: 3.5, description: 'Very Good' },
              { grade: 'B', minMarks: 50, maxMarks: 59, gradePoint: 3.0, description: 'Good' },
              { grade: 'C', minMarks: 40, maxMarks: 49, gradePoint: 2.0, description: 'Average' },
              { grade: 'D', minMarks: 33, maxMarks: 39, gradePoint: 1.0, description: 'Below Average' },
              { grade: 'F', minMarks: 0, maxMarks: 32, gradePoint: 0.0, description: 'Fail' },
            ],
          },
        ],
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedBy: 'system_setup',
      });
      console.log('✅ Default school settings created');
    } else {
      console.log('ℹ️  School settings already exist, skipping.');
    }

    // Create the 3 built-in result templates
    const templates = [
      {
        id: 'classic',
        nameEn: 'Classic Academic',
        nameBn: 'ক্লাসিক একাডেমিক',
        description: 'Traditional school marksheet with formal academic layout',
        isBuiltIn: true,
      },
      {
        id: 'modern',
        nameEn: 'Modern Professional',
        nameBn: 'মডার্ন প্রফেশনাল',
        description: 'Modern card-based layout with clean typography',
        isBuiltIn: true,
      },
      {
        id: 'premium',
        nameEn: 'Premium Certificate',
        nameBn: 'প্রিমিয়াম সার্টিফিকেট',
        description: 'Elegant certificate-style design with formal borders',
        isBuiltIn: true,
      },
    ];

    for (const template of templates) {
      await db.collection('resultTemplates').doc(template.id).set({
        ...template,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      }, { merge: true });
    }
    console.log('✅ Result templates created (classic, modern, premium)');

    // Create audit log entry
    await db.collection('auditLogs').add({
      schoolId,
      action: 'system.setup',
      entityType: 'user',
      entityId: userRecord.uid,
      description: `Super Admin account created: ${email}`,
      performedBy: 'system_setup',
      performedByEmail: 'system',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    console.log('\n==============================================');
    console.log(' ✅ Super Admin setup complete!');
    console.log('==============================================');
    console.log(`\n  Email: ${email}`);
    console.log(`  Role: super_admin`);
    console.log(`  School ID: ${schoolId}`);
    console.log(`\n  You can now log in at your application URL.`);
    console.log('\n  ⚠️  IMPORTANT: Change the ADMIN_SETUP_SECRET`);
    console.log('  or disable this script after setup.\n');

  } catch (error: any) {
    console.error(`\n❌ Error: ${error.message}`);
    process.exit(1);
  } finally {
    rl.close();
    process.exit(0);
  }
}

main();
