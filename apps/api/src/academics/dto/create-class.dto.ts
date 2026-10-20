import { IsString, IsNotEmpty, IsNumber, IsBoolean, IsOptional, IsArray } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateClassDto {
  @ApiProperty({ example: 'Class 6' })
  @IsString()
  @IsNotEmpty()
  nameEn!: string;

  @ApiProperty({ example: 'ষষ্ঠ শ্রেণি' })
  @IsString()
  @IsNotEmpty()
  nameBn!: string;

  @ApiProperty({ example: 6 })
  @IsNumber()
  numericOrder!: number;

  @ApiPropertyOptional({ example: false })
  @IsBoolean()
  @IsOptional()
  hasGroups?: boolean;

  @ApiPropertyOptional({ example: ['Science', 'Commerce', 'Arts'] })
  @IsArray()
  @IsOptional()
  groups?: string[];

  @ApiPropertyOptional({ example: 'active' })
  @IsString()
  @IsOptional()
  status?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  schoolId?: string;
}
