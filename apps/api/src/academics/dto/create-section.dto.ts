import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateSectionDto {
  @ApiProperty({ example: 'A' })
  @IsString()
  @IsNotEmpty()
  nameEn!: string;

  @ApiProperty({ example: 'ক' })
  @IsString()
  @IsNotEmpty()
  nameBn!: string;

  @ApiProperty({ example: 'class_id_123' })
  @IsString()
  @IsNotEmpty()
  classId!: string;

  @ApiPropertyOptional({ example: 40 })
  @IsNumber()
  @IsOptional()
  capacity?: number;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  classTeacherId?: string;

  @ApiPropertyOptional({ example: 'active' })
  @IsString()
  @IsOptional()
  status?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  schoolId?: string;
}
