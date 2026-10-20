import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class IssueBookDto {
  @ApiProperty({ example: 'book_123' })
  @IsString()
  @IsNotEmpty()
  bookId!: string;

  @ApiProperty({ example: 'student_123' })
  @IsString()
  @IsNotEmpty()
  borrowerId!: string;

  @ApiProperty({ example: 'student' })
  @IsString()
  @IsNotEmpty()
  borrowerType!: 'student' | 'teacher';

  @ApiProperty({ example: '2026-11-05' })
  @IsString()
  @IsNotEmpty()
  dueDate!: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  remarks?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  schoolId?: string;
}
