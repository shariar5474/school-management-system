import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsEmail,
  IsDateString,
  IsIn,
  IsArray,
  ValidateNested,
  IsNumber,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

class GuardianDto {
  @ApiProperty({ description: 'Guardian name' })
  @IsNotEmpty()
  @IsString()
  name!: string;

  @ApiProperty({ description: 'Relation to student' })
  @IsNotEmpty()
  @IsString()
  relation!: string;

  @ApiProperty({ description: 'Guardian phone number' })
  @IsNotEmpty()
  @IsString()
  phone!: string;

  @ApiPropertyOptional({ description: 'Guardian email' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ description: 'Guardian occupation' })
  @IsOptional()
  @IsString()
  occupation?: string;
}

export class CreateStudentDto {
  @ApiProperty({ description: 'Student full name (Bengali)' })
  @IsNotEmpty()
  @IsString()
  nameInBengali!: string;

  @ApiProperty({ description: 'Student full name (English)' })
  @IsNotEmpty()
  @IsString()
  nameInEnglish!: string;

  @ApiProperty({ description: 'Date of birth (YYYY-MM-DD)' })
  @IsNotEmpty()
  @IsDateString()
  dateOfBirth!: string;

  @ApiProperty({ description: 'Gender', enum: ['male', 'female', 'other'] })
  @IsNotEmpty()
  @IsIn(['male', 'female', 'other'])
  gender!: string;

  @ApiProperty({ description: 'Blood group', enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] })
  @IsOptional()
  @IsIn(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
  bloodGroup?: string;

  @ApiProperty({ description: 'Religion' })
  @IsOptional()
  @IsString()
  religion?: string;

  @ApiProperty({ description: 'Nationality', default: 'Bangladeshi' })
  @IsOptional()
  @IsString()
  nationality?: string;

  @ApiProperty({ description: 'National ID / Birth Certificate number' })
  @IsOptional()
  @IsString()
  nationalId?: string;

  @ApiProperty({ description: 'Class ID the student is enrolled in' })
  @IsNotEmpty()
  @IsString()
  classId!: string;

  @ApiProperty({ description: 'Section ID' })
  @IsNotEmpty()
  @IsString()
  sectionId!: string;

  @ApiProperty({ description: 'Academic year ID' })
  @IsNotEmpty()
  @IsString()
  academicYearId!: string;

  @ApiPropertyOptional({ description: 'Student roll number' })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  rollNumber?: number;

  @ApiProperty({ description: 'Student phone number' })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional({ description: 'Student email' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ description: 'Present address' })
  @IsNotEmpty()
  @IsString()
  presentAddress!: string;

  @ApiPropertyOptional({ description: 'Permanent address' })
  @IsOptional()
  @IsString()
  permanentAddress?: string;

  @ApiProperty({ description: 'Father information' })
  @ValidateNested()
  @Type(() => GuardianDto)
  father!: GuardianDto;

  @ApiProperty({ description: 'Mother information' })
  @ValidateNested()
  @Type(() => GuardianDto)
  mother!: GuardianDto;

  @ApiPropertyOptional({ description: 'Local guardian information' })
  @IsOptional()
  @ValidateNested()
  @Type(() => GuardianDto)
  localGuardian?: GuardianDto;

  @ApiPropertyOptional({ description: 'Previous school name' })
  @IsOptional()
  @IsString()
  previousSchool?: string;

  @ApiPropertyOptional({ description: 'Photo URL' })
  @IsOptional()
  @IsString()
  photoURL?: string;

  @ApiPropertyOptional({ description: 'Admission date (YYYY-MM-DD)' })
  @IsOptional()
  @IsDateString()
  admissionDate?: string;

  @ApiPropertyOptional({
    description: 'Student status',
    enum: ['active', 'inactive', 'graduated', 'transferred', 'expelled'],
    default: 'active',
  })
  @IsOptional()
  @IsIn(['active', 'inactive', 'graduated', 'transferred', 'expelled'])
  status?: string;
}
