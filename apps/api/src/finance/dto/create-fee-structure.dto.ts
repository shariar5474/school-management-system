import { IsString, IsNotEmpty, IsNumber, IsArray, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class FeeItemDto {
  @ApiProperty({ example: 'tuition' })
  @IsString()
  @IsNotEmpty()
  category!: string;

  @ApiProperty({ example: 'Monthly Tuition Fee' })
  @IsString()
  @IsNotEmpty()
  nameEn!: string;

  @ApiProperty({ example: 'মাসিক বেতন' })
  @IsString()
  @IsNotEmpty()
  nameBn!: string;

  @ApiProperty({ example: 1500 })
  @IsNumber()
  amount!: number;

  @ApiPropertyOptional({ example: 'monthly' })
  @IsString()
  @IsOptional()
  frequency?: string;
}

export class CreateFeeStructureDto {
  @ApiProperty({ example: 'class_6' })
  @IsString()
  @IsNotEmpty()
  classId!: string;

  @ApiProperty({ example: 'year_2026' })
  @IsString()
  @IsNotEmpty()
  academicYearId!: string;

  @ApiProperty({ type: [FeeItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FeeItemDto)
  fees!: FeeItemDto[];

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  schoolId?: string;
}
