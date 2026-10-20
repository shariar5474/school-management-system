import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { FirebaseModule } from './common/firebase/firebase.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { StudentsModule } from './students/students.module';
import { TeachersModule } from './teachers/teachers.module';
import { AcademicsModule } from './academics/academics.module';
import { AttendanceModule } from './attendance/attendance.module';
import { ExaminationsModule } from './examinations/examinations.module';
import { ResultsModule } from './results/results.module';
import { AdmissionsModule } from './admissions/admissions.module';
import { FinanceModule } from './finance/finance.module';
import { LibraryModule } from './library/library.module';
import { NoticesModule } from './notices/notices.module';
import { SettingsModule } from './settings/settings.module';
import { ReportsModule } from './reports/reports.module';
import { AuditModule } from './audit/audit.module';

@Module({
  imports: [
    // Configuration - load .env file
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    // Rate limiting - 60 requests per minute per IP
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 60,
      },
    ]),

    // Core modules
    FirebaseModule,

    // Feature modules
    AuthModule,
    UsersModule,
    StudentsModule,
    TeachersModule,
    AcademicsModule,
    AttendanceModule,
    ExaminationsModule,
    ResultsModule,
    AdmissionsModule,
    FinanceModule,
    LibraryModule,
    NoticesModule,
    SettingsModule,
    ReportsModule,
    AuditModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
