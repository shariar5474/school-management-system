import { IsString, IsNotEmpty, IsOptional, IsEmail, IsArray } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateAdmissionDto {
  @ApiProperty({ example: 'Tanvir Ahmed' })
  @IsString()
  @IsNotEmpty()
  studentNameEn!: string;

  @ApiProperty({ example: 'তানভীর আহমেদ' })
  @IsString()
  @IsNotEmpty()
  studentNameBn!: string;

  @ApiProperty({ example: '2015-05-12' })
  @IsString()
  @IsNotEmpty()
  dateOfBirth!: string;

  @ApiProperty({ example: 'male' })
  @IsString()
  @IsNotEmpty()
  gender!: string;

  @ApiPropertyOptional({ example: 'B+' })
  @IsString()
  @IsOptional()
  bloodGroup?: string;

  @ApiPropertyOptional({ example: '12345678901234567' })
  @IsString()
  @IsOptional()
  birthCertificateNo?: string;

  @ApiProperty({ example: 'Class 6' })
  @IsString()
  @IsNotEmpty()
  desiredClassId!: string;

  @ApiProperty({ example: 'year_2026' })
  @IsString()
  @IsNotEmpty()
  academicYearId!: string;

  // Guardian details
  @ApiProperty({ example: 'Abdul Karim' })
  @IsString()
  @IsNotEmpty()
  fatherNameEn!: string;

  @ApiProperty({ example: 'আব্দুল করিম' })
  @IsString()
  @IsNotEmpty()
  fatherNameBn!: string;

  @ApiProperty({ example: '+8801812345678' })
  @IsString()
  @IsNotEmpty()
  fatherPhone!: string;

  @ApiPropertyOptional({ example: 'Businessman' })
  @IsString()
  @IsOptional()
  fatherOccupation?: string;

  @ApiProperty({ example: 'Fatema Begum' })
  @IsString()
  @IsNotEmpty()
  motherNameEn!: string;

  @ApiProperty({ example: 'ফাতেমা বেগম' })
  @IsString()
  @IsNotEmpty()
  motherNameBn!: string;

  @ApiPropertyOptional({ example: '+8801712345678' })
  @IsString()
  @IsOptional()
  motherPhone?: string;

  @ApiPropertyOptional({ example: 'Homemaker' })
  @IsString()
  @IsOptional()
  motherOccupation?: string;

  // Contact
  @ApiProperty({ example: '+8801812345678' })
  @IsString()
  @IsNotEmpty()
  applicantPhone!: string;

  @ApiPropertyOptional({ example: 'applicant@example.com' })
  @IsEmail()
  @IsOptional()
  applicantEmail?: string;

  @ApiProperty({ example: 'House 12, Road 4, Dhanmondi, Dhaka' })
  @IsString()
  @IsNotEmpty()
  presentAddress!: string;

  @ApiProperty({ example: 'Village: Rupganj, Narayanganj' })
  @IsString()
  @IsNotEmpty()
  permanentAddress!: string;

  @ApiPropertyOptional({ example: 'Dhaka Ideal School' })
  @IsString()
  @IsOptional()
  previousSchool?: string;

  @ApiPropertyOptional({ example: 'Class 5' })
  @IsString()
  @IsOptional()
  previousClass?: string;

  @ApiPropertyOptional()
  @IsArray()
  @IsOptional()
  documents?: any[];

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  photoURL?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  schoolId?: string;
}
