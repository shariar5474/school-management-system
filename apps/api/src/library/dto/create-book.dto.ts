import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateBookDto {
  @ApiProperty({ example: 'Ananda Path' })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiProperty({ example: 'Rabindranath Tagore' })
  @IsString()
  @IsNotEmpty()
  author!: string;

  @ApiProperty({ example: 'BK-001' })
  @IsString()
  @IsNotEmpty()
  bookCode!: string;

  @ApiProperty({ example: 'Literature' })
  @IsString()
  @IsNotEmpty()
  category!: string;

  @ApiProperty({ example: 10 })
  @IsNumber()
  totalCopies!: number;

  @ApiPropertyOptional({ example: '978-984-1234-56-7' })
  @IsString()
  @IsOptional()
  isbn?: string;

  @ApiPropertyOptional({ example: 'Bangla Academy' })
  @IsString()
  @IsOptional()
  publisher?: string;

  @ApiPropertyOptional({ example: 'Shelf A-3' })
  @IsString()
  @IsOptional()
  shelfLocation?: string;

  @ApiPropertyOptional({ example: 'Bengali' })
  @IsString()
  @IsOptional()
  language?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  schoolId?: string;
}
