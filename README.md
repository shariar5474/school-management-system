# School Management System

A complete, professional, production-oriented School & College Management Website with a public website and fully functional school management system.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14 (App Router) + TypeScript + Tailwind CSS |
| Backend | NestJS + TypeScript + Firebase Admin SDK |
| Database | Google Cloud Firestore |
| Authentication | Firebase Authentication |
| File Storage | Firebase Storage |
| Languages | Bengali (default) & English |

## Features

### Public Website
- Responsive school homepage with hero banner
- About, Principal's Message, Chairman's Message pages
- Academic Programs, Classes, Facilities
- Online Admission Application
- Notice Board, News & Events
- Photo Gallery
- Student Result Search
- Contact page
- Bengali/English language switcher

### Management System (Role-Based)
- **Super Admin**: Full system access, user management, settings, audit logs
- **School Admin**: Students, teachers, academics, attendance, exams, results, notices
- **Admission Officer**: Application review, approval, enrollment
- **Teacher**: Attendance entry, marks entry for assigned classes
- **Accountant**: Fee structures, invoices, payments, financial reports
- **Librarian**: Book management, issue/return, library reports
- **Student**: Own profile, attendance, results, marksheets, notices
- **Parent/Guardian**: View linked children's records

### Core Modules
- Student Management (CRUD, search, ID card, CSV import/export)
- Academic Management (Years, Classes, Sections, Subjects, Enrollment, Promotion)
- Attendance System (Daily, Reports, Monthly summaries)
- Examination & Results (Configurable exams, marks entry, grade calculation, GPA)
- 3 Result Templates (Classic, Modern, Premium — admin selectable)
- Admission Management (Online application, review, approval workflow)
- Fee & Finance (Fee structures, invoices, payments, receipts, reports)
- Library Management (Books, issue/return, overdue tracking)
- Notice Board & Events
- Photo Gallery
- Reports & CSV Exports

## Prerequisites

- Node.js 18+ (v20+ recommended)
- npm 9+
- Firebase project with Blaze plan (for Cloud Functions, if used)
- Firebase CLI (`npm install -g firebase-tools`)

## Quick Start

### 1. Clone and Install

```bash
cd school-management-system
npm install
cd apps/web && npm install && cd ../..
cd apps/api && npm install && cd ../..
```

### 2. Firebase Setup

1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable **Authentication** → Email/Password provider
3. Create **Cloud Firestore** database (production mode)
4. Enable **Firebase Storage**
5. Generate a **Service Account Key**:
   - Go to Project Settings → Service Accounts
   - Click "Generate new private key"
   - Save as `firebase-service-account.json` (DO NOT commit this!)

### 3. Environment Variables

**Backend** (`apps/api/.env`):
```env
PORT=3001
NODE_ENV=development
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=your-service-account@project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----"
FIREBASE_STORAGE_BUCKET=your-project.appspot.com
CORS_ORIGIN=http://localhost:3000
ADMIN_SETUP_SECRET=your-random-secret-here
```

**Frontend** (`apps/web/.env.local`):
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1
```

### 4. Deploy Firestore Rules & Indexes

```bash
firebase login
firebase use your-project-id
firebase deploy --only firestore:rules
firebase deploy --only firestore:indexes
firebase deploy --only storage
```

### 5. Create Super Admin

```bash
cd scripts
npx ts-node setup-super-admin.ts
```

Follow the prompts to create your first Super Admin account.

### 6. Run Development Servers

```bash
# From root - runs both frontend and backend
npm run dev

# Or separately:
npm run dev:web    # Frontend on http://localhost:3000
npm run dev:api    # Backend on http://localhost:3001
```

### 7. Access the Application

- Public Website: http://localhost:3000
- Login: http://localhost:3000/login
- API Docs: http://localhost:3001/api/docs

## Project Structure

```
school-management-system/
├── apps/
│   ├── web/                     # Next.js Frontend
│   │   └── src/
│   │       ├── app/             # App Router pages
│   │       ├── components/      # React components
│   │       ├── hooks/           # Custom hooks
│   │       ├── lib/             # Utilities, Firebase config
│   │       ├── i18n/            # Bengali/English translations
│   │       ├── types/           # TypeScript interfaces
│   │       └── styles/          # Global styles
│   └── api/                     # NestJS Backend
│       └── src/
│           ├── auth/            # Authentication module
│           ├── users/           # User management
│           ├── students/        # Student module
│           ├── teachers/        # Teacher module
│           ├── academics/       # Classes, sections, subjects
│           ├── attendance/      # Attendance module
│           ├── examinations/    # Exam management
│           ├── results/         # Result & template management
│           ├── admissions/      # Admission workflow
│           ├── finance/         # Fee & payment module
│           ├── library/         # Library module
│           ├── notices/         # Notices & events
│           ├── settings/        # School settings
│           ├── reports/         # Report generation
│           ├── audit/           # Audit logging
│           └── common/          # Shared guards, filters, etc.
├── firebase/
│   ├── firestore.rules          # Firestore Security Rules
│   ├── firestore.indexes.json   # Required composite indexes
│   └── storage.rules            # Storage Security Rules
├── scripts/
│   └── setup-super-admin.ts     # Initial admin setup
├── docs/
│   └── database-schema.md       # Complete data model documentation
└── tests/                       # Integration tests
```

## Security Notes

- Firebase service account keys are **never** exposed in frontend code
- All sensitive operations go through the NestJS backend
- Backend verifies Firebase ID tokens on every request
- Role-based access control enforced server-side
- Firestore Security Rules provide defense-in-depth
- File uploads validated for type and size
- Audit logs track all sensitive operations
- No hardcoded credentials in source code

## Deployment

### Frontend (Vercel)
```bash
cd apps/web
vercel --prod
```
Set environment variables in Vercel dashboard.

### Backend (Railway/Render/Google Cloud Run)
```bash
cd apps/api
npm run build
npm run start:prod
```
Set environment variables in your hosting dashboard.

### Firebase
```bash
firebase deploy --only firestore:rules,firestore:indexes,storage
```

## Cost Considerations

| Service | Free Tier |
|---------|-----------|
| Firestore | 1 GiB storage, 50K reads/day, 20K writes/day |
| Firebase Auth | 10K verifications/month |
| Firebase Storage | 5 GB storage, 1 GB/day download |
| Vercel (Frontend) | Hobby plan - free for personal projects |
| Railway (Backend) | $5/month trial credits |

> **Note**: Firebase Blaze (pay-as-you-go) plan is recommended for production. The Spark free plan has limitations on Cloud Functions and outbound networking.

## Backup & Restore

### Firestore Backup
```bash
# Export (requires gcloud CLI)
gcloud firestore export gs://your-bucket/backups/$(date +%Y%m%d)

# Import
gcloud firestore import gs://your-bucket/backups/20261020
```

### Automated Backups
Set up a Cloud Scheduler job to run daily exports. See [Firestore scheduled backups documentation](https://cloud.google.com/firestore/docs/schedule-export).

## License

Private — All rights reserved.
