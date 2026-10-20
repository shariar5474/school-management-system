import { IsString, IsNotEmpty, IsArray, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateExamDto {
  @ApiProperty({ example: 'Half-Yearly Examination 2026' })
  @IsString()
  @IsNotEmpty()
  nameEn!: string;

  @ApiProperty({ example: 'অর্ধ-বার্ষিক পরীক্ষা ২০২৬' })
  @IsString()
  @IsNotEmpty()
  nameBn!: string;

  @ApiProperty({ example: 'half_yearly' })
  @IsString()
  @IsNotEmpty()
  type!: string;

  @ApiProperty({ example: 'year_2026' })
  @IsString()
  @IsNotEmpty()
  academicYearId!: string;

  @ApiProperty({ example: ['class_6', 'class_7'] })
  @IsArray()
  classIds!: string[];

  @ApiProperty({ example: ['sub_math', 'sub_eng'] })
  @IsArray()
  subjectIds!: string[];

  @ApiPropertyOptional({ example: '2026-06-01' })
  @IsString()
  @IsOptional()
  startDate?: string;

  @ApiPropertyOptional({ example: '2026-06-15' })
  @IsString()
  @IsOptional()
  endDate?: string;

  @ApiPropertyOptional({ example: 100 })
  @IsNumber()
  @IsOptional()
  defaultFullMarks?: number;

  @ApiPropertyOptional({ example: 33 })
  @IsNumber()
  @IsOptional()
  defaultPassMarks?: number;

  @ApiPropertyOptional({ example: 'default_bd' })
  @IsString()
  @IsOptional()
  gradingScaleId?: string;

  @ApiPropertyOptional({ example: 'draft' })
  @IsString()
  @IsOptional()
  status?: string; // 'draft' | 'marks_entry' | 'review' | 'published'

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  schoolId?: string;
}
