import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class QueryAttendanceDto {
  @ApiProperty({ example: 'class_1' })
  @IsString()
  @IsNotEmpty()
  classId!: string;

  @ApiProperty({ example: 'sec_a' })
  @IsString()
  @IsNotEmpty()
  sectionId!: string;

  @ApiPropertyOptional({ example: '2026-10-20' })
  @IsString()
  @IsOptional()
  date?: string;

  @ApiPropertyOptional({ example: '2026-10' })
  @IsString()
  @IsOptional()
  month?: string; // YYYY-MM for monthly report

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  studentId?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  schoolId?: string;
}
