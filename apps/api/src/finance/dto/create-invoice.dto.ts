import { IsString, IsNotEmpty, IsNumber, IsArray, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class InvoiceItemDto {
  @ApiProperty({ example: 'tuition' })
  @IsString()
  @IsNotEmpty()
  category!: string;

  @ApiProperty({ example: 'Tuition Fee - October 2026' })
  @IsString()
  @IsNotEmpty()
  description!: string;

  @ApiProperty({ example: 1500 })
  @IsNumber()
  amount!: number;
}

export class CreateInvoiceDto {
  @ApiProperty({ example: 'student_123' })
  @IsString()
  @IsNotEmpty()
  studentId!: string;

  @ApiProperty({ example: 'year_2026' })
  @IsString()
  @IsNotEmpty()
  academicYearId!: string;

  @ApiProperty({ type: [InvoiceItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => InvoiceItemDto)
  items!: InvoiceItemDto[];

  @ApiProperty({ example: '2026-10-25' })
  @IsString()
  @IsNotEmpty()
  dueDate!: string;

  @ApiPropertyOptional({ example: 0 })
  @IsNumber()
  @IsOptional()
  discountAmount?: number;

  @ApiPropertyOptional({ example: 'Need-based waiver' })
  @IsString()
  @IsOptional()
  discountReason?: string;

  @ApiPropertyOptional({ example: '2026-10' })
  @IsString()
  @IsOptional()
  month?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  schoolId?: string;
}
