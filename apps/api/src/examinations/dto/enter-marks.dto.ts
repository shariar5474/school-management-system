import { IsString, IsNotEmpty, IsNumber, IsBoolean, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class StudentMarkDto {
  @ApiProperty({ example: 'student_123' })
  @IsString()
  @IsNotEmpty()
  studentId!: string;

  @ApiPropertyOptional({ example: 70 })
  @IsNumber()
  @IsOptional()
  theoryMarks?: number;

  @ApiPropertyOptional({ example: 25 })
  @IsNumber()
  @IsOptional()
  practicalMarks?: number;

  @ApiProperty({ example: 95 })
  @IsNumber()
  @IsNotEmpty()
  totalMarks!: number;

  @ApiPropertyOptional({ example: false })
  @IsBoolean()
  @IsOptional()
  isAbsent?: boolean;
}

export class EnterMarksDto {
  @ApiProperty({ example: 'exam_123' })
  @IsString()
  @IsNotEmpty()
  examId!: string;

  @ApiProperty({ example: 'class_6' })
  @IsString()
  @IsNotEmpty()
  classId!: string;

  @ApiProperty({ example: 'sec_a' })
  @IsString()
  @IsNotEmpty()
  sectionId!: string;

  @ApiProperty({ example: 'sub_math' })
  @IsString()
  @IsNotEmpty()
  subjectId!: string;

  @ApiProperty({ example: 100 })
  @IsNumber()
  @IsNotEmpty()
  fullMarks!: number;

  @ApiProperty({ example: 33 })
  @IsNumber()
  @IsNotEmpty()
  passMarks!: number;

  @ApiProperty({ type: [StudentMarkDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StudentMarkDto)
  marks!: StudentMarkDto[];

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  schoolId?: string;
}
