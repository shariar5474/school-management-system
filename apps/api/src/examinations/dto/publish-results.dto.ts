import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PublishResultsDto {
  @ApiProperty({ example: 'exam_123' })
  @IsString()
  @IsNotEmpty()
  examId!: string;

  @ApiPropertyOptional({ example: 'class_6' })
  @IsString()
  @IsOptional()
  classId?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  schoolId?: string;
}
