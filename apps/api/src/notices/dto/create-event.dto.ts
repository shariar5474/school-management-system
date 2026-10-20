import { IsString, IsNotEmpty, IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateEventDto {
  @ApiProperty({ example: 'Annual Sports Day 2026' })
  @IsString()
  @IsNotEmpty()
  titleEn!: string;

  @ApiProperty({ example: 'বার্ষিক ক্রীড়া প্রতিযোগিতা ২০২৬' })
  @IsString()
  @IsNotEmpty()
  titleBn!: string;

  @ApiProperty({ example: 'Annual sports day will be held at...' })
  @IsString()
  @IsNotEmpty()
  descriptionEn!: string;

  @ApiProperty({ example: 'বিদ্যালয়ের খেলার মাঠে বার্ষিক ক্রীড়া প্রতিযোগিতা অনুষ্ঠিত হবে...' })
  @IsString()
  @IsNotEmpty()
  descriptionBn!: string;

  @ApiProperty({ example: '2026-11-15' })
  @IsString()
  @IsNotEmpty()
  eventDate!: string;

  @ApiPropertyOptional({ example: 'School Playground' })
  @IsString()
  @IsOptional()
  location?: string;

  @ApiPropertyOptional({ example: true })
  @IsBoolean()
  @IsOptional()
  isPublished?: boolean;

  @ApiPropertyOptional({ example: true })
  @IsBoolean()
  @IsOptional()
  isFeatured?: boolean;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  imageURL?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  schoolId?: string;
}
