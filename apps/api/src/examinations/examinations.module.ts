import { Module } from '@nestjs/common';
import { ExaminationsService } from './examinations.service';
import { ExaminationsController } from './examinations.controller';
import { AuditModule } from '../audit/audit.module';

@Module({
  imports: [AuditModule],
  controllers: [ExaminationsController],
  providers: [ExaminationsService],
  exports: [ExaminationsService],
})
export class ExaminationsModule {}
