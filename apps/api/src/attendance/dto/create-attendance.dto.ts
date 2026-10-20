import { IsString, IsNotEmpty, IsArray, ValidateNested, IsOptional, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum AttendanceStatus {
  PRESENT = 'present',
  ABSENT = 'absent',
  LATE = 'late',
  LEAVE = 'leave',
}

export class StudentAttendanceRecordDto {
  @ApiProperty({ example: 'student_123' })
  @IsString()
  @IsNotEmpty()
  studentId!: string;

  @ApiProperty({ enum: AttendanceStatus, example: AttendanceStatus.PRESENT })
  @IsEnum(AttendanceStatus)
  status!: AttendanceStatus;

  @ApiPropertyOptional({ example: 'Late due to traffic' })
  @IsString()
  @IsOptional()
  remarks?: string;
}

export class MarkAttendanceDto {
  @ApiProperty({ example: 'class_1' })
  @IsString()
  @IsNotEmpty()
  classId!: string;

  @ApiProperty({ example: 'sec_a' })
  @IsString()
  @IsNotEmpty()
  sectionId!: string;

  @ApiProperty({ example: 'year_2026' })
  @IsString()
  @IsNotEmpty()
  academicYearId!: string;

  @ApiProperty({ example: '2026-10-20' })
  @IsString()
  @IsNotEmpty()
  date!: string; // YYYY-MM-DD

  @ApiProperty({ type: [StudentAttendanceRecordDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StudentAttendanceRecordDto)
  records!: StudentAttendanceRecordDto[];

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  schoolId?: string;
}
