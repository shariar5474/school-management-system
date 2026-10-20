import { IsString, IsNotEmpty, IsIn, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ReviewAdmissionDto {
  @ApiProperty({
    enum: ['under_review', 'corrections_requested', 'approved', 'rejected', 'enrolled'],
    example: 'approved',
  })
  @IsString()
  @IsNotEmpty()
  @IsIn(['under_review', 'corrections_requested', 'approved', 'rejected', 'enrolled'])
  status!: 'under_review' | 'corrections_requested' | 'approved' | 'rejected' | 'enrolled';

  @ApiPropertyOptional({ example: 'All required documents verified' })
  @IsString()
  @IsOptional()
  reviewNotes?: string;

  @ApiPropertyOptional({ example: 'Invalid birth certificate copy' })
  @IsString()
  @IsOptional()
  rejectionReason?: string;

  @ApiPropertyOptional({ example: 'sec_a' })
  @IsString()
  @IsOptional()
  assignedSectionId?: string;
}
