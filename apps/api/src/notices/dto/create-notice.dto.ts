import { IsString, IsNotEmpty, IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateNoticeDto {
  @ApiProperty({ example: 'Summer Vacation Announcement 2026' })
  @IsString()
  @IsNotEmpty()
  titleEn!: string;

  @ApiProperty({ example: 'গ্রীষ্মকালীন ছুটি ঘোষণা ২০২৬' })
  @IsString()
  @IsNotEmpty()
  titleBn!: string;

  @ApiProperty({ example: 'The school will remain closed from...' })
  @IsString()
  @IsNotEmpty()
  contentEn!: string;

  @ApiProperty({ example: 'বিদ্যালয় আগামী... তারিখ হইতে বন্ধ থাকবে...' })
  @IsString()
  @IsNotEmpty()
  contentBn!: string;

  @ApiPropertyOptional({ example: true })
  @IsBoolean()
  @IsOptional()
  isPublished?: boolean;

  @ApiPropertyOptional({ example: false })
  @IsBoolean()
  @IsOptional()
  isImportant?: boolean;

  @ApiPropertyOptional({ example: 'all' })
  @IsString()
  @IsOptional()
  targetAudience?: string; // 'all' | 'students' | 'teachers' | 'parents'

  @ApiPropertyOptional({ example: '2026-10-20' })
  @IsString()
  @IsOptional()
  publishDate?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  expiryDate?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  attachmentURL?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  schoolId?: string;
}
