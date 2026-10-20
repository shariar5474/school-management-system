import { IsString, IsOptional, IsBoolean, IsArray } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateSettingsDto {
  @ApiPropertyOptional({ example: 'Agrani Model High School & College' })
  @IsString()
  @IsOptional()
  schoolNameEn?: string;

  @ApiPropertyOptional({ example: 'অগ্রণী মডেল উচ্চ বিদ্যালয় ও কলেজ' })
  @IsString()
  @IsOptional()
  schoolNameBn?: string;

  @ApiPropertyOptional({ example: 'Knowledge, Character, Excellence' })
  @IsString()
  @IsOptional()
  sloganEn?: string;

  @ApiPropertyOptional({ example: 'জ্ঞান, চরিত্র ও উৎকর্ষ' })
  @IsString()
  @IsOptional()
  sloganBn?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  logoURL?: string;

  @ApiPropertyOptional({ example: '123 College Road, Dhaka-1205' })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiPropertyOptional({ example: '১২৩ কলেজ রোড, ঢাকা-১২০৫' })
  @IsString()
  @IsOptional()
  addressBn?: string;

  @ApiPropertyOptional({ example: '+8801712345678' })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiPropertyOptional({ example: 'info@agranischool.edu.bd' })
  @IsString()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  website?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  principalNameEn?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  principalNameBn?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  principalPhotoURL?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  principalMessageEn?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  principalMessageBn?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  chairmanNameEn?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  chairmanNameBn?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  chairmanMessageEn?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  chairmanMessageBn?: string;

  @ApiPropertyOptional({ example: 'classic' })
  @IsString()
  @IsOptional()
  activeResultTemplateId?: 'classic' | 'modern' | 'premium';

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  currentAcademicYearId?: string;

  @ApiPropertyOptional({ example: true })
  @IsBoolean()
  @IsOptional()
  enableOnlineAdmission?: boolean;

  @ApiPropertyOptional({ example: '#1e3a5f' })
  @IsString()
  @IsOptional()
  primaryColor?: string;

  @ApiPropertyOptional({ example: '#2563eb' })
  @IsString()
  @IsOptional()
  secondaryColor?: string;

  @ApiPropertyOptional({ example: '#f59e0b' })
  @IsString()
  @IsOptional()
  accentColor?: string;
}
