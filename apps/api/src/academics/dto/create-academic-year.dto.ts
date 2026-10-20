import { IsString, IsNotEmpty, IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateAcademicYearDto {
  @ApiProperty({ example: '2026' })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ example: '২০২৬' })
  @IsString()
  @IsNotEmpty()
  nameBn!: string;

  @ApiProperty({ example: '2026-01-01' })
  @IsString()
  @IsNotEmpty()
  startDate!: string;

  @ApiProperty({ example: '2026-12-31' })
  @IsString()
  @IsNotEmpty()
  endDate!: string;

  @ApiPropertyOptional({ example: true })
  @IsBoolean()
  @IsOptional()
  isCurrent?: boolean;

  @ApiPropertyOptional({ example: 'active' })
  @IsString()
  @IsOptional()
  status?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  schoolId?: string;
}
