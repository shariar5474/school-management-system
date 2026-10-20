import { IsOptional, IsString, IsIn } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationQueryDto } from '../../common/dto/pagination.dto';

export class QueryStudentsDto extends PaginationQueryDto {
  @ApiPropertyOptional({ description: 'Filter by class ID' })
  @IsOptional()
  @IsString()
  classId?: string;

  @ApiPropertyOptional({ description: 'Filter by section ID' })
  @IsOptional()
  @IsString()
  sectionId?: string;

  @ApiPropertyOptional({ description: 'Filter by academic year ID' })
  @IsOptional()
  @IsString()
  academicYearId?: string;

  @ApiPropertyOptional({
    description: 'Filter by status',
    enum: ['active', 'inactive', 'graduated', 'transferred', 'expelled'],
  })
  @IsOptional()
  @IsIn(['active', 'inactive', 'graduated', 'transferred', 'expelled'])
  status?: string;

  @ApiPropertyOptional({ description: 'Filter by gender', enum: ['male', 'female', 'other'] })
  @IsOptional()
  @IsIn(['male', 'female', 'other'])
  gender?: string;
}
