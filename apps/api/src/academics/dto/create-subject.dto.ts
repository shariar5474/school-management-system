import { IsString, IsNotEmpty, IsNumber, IsBoolean, IsOptional, IsArray } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateSubjectDto {
  @ApiProperty({ example: 'Mathematics' })
  @IsString()
  @IsNotEmpty()
  nameEn!: string;

  @ApiProperty({ example: 'গণিত' })
  @IsString()
  @IsNotEmpty()
  nameBn!: string;

  @ApiProperty({ example: 'MATH-101' })
  @IsString()
  @IsNotEmpty()
  code!: string;

  @ApiProperty({ example: 'mandatory' })
  @IsString()
  @IsNotEmpty()
  type!: string; // 'mandatory' | 'optional' | 'elective'

  @ApiProperty({ example: ['class_6', 'class_7'] })
  @IsArray()
  classIds!: string[];

  @ApiPropertyOptional({ example: false })
  @IsBoolean()
  @IsOptional()
  hasPractical?: boolean;

  @ApiPropertyOptional({ example: 100 })
  @IsNumber()
  @IsOptional()
  fullMarks?: number;

  @ApiPropertyOptional({ example: 33 })
  @IsNumber()
  @IsOptional()
  passMarks?: number;

  @ApiPropertyOptional({ example: 70 })
  @IsNumber()
  @IsOptional()
  theoryMarks?: number;

  @ApiPropertyOptional({ example: 30 })
  @IsNumber()
  @IsOptional()
  practicalMarks?: number;

  @ApiPropertyOptional({ example: 'active' })
  @IsString()
  @IsOptional()
  status?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  schoolId?: string;
}
