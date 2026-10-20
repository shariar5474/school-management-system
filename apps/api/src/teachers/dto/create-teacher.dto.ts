import { IsString, IsNotEmpty, IsOptional, IsEmail, IsArray, IsBoolean } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTeacherDto {
  @ApiProperty({ example: 'EMP-001' })
  @IsString()
  @IsNotEmpty()
  employeeId!: string;

  @ApiProperty({ example: 'Mohammad Rahim' })
  @IsString()
  @IsNotEmpty()
  nameEn!: string;

  @ApiProperty({ example: 'মোহাম্মদ রহিম' })
  @IsString()
  @IsNotEmpty()
  nameBn!: string;

  @ApiProperty({ example: 'Senior Mathematics Teacher' })
  @IsString()
  @IsNotEmpty()
  designation!: string;

  @ApiPropertyOptional({ example: 'Mathematics' })
  @IsString()
  @IsOptional()
  department?: string;

  @ApiProperty({ example: 'rahim@school.edu.bd' })
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @ApiProperty({ example: '+8801712345678' })
  @IsString()
  @IsNotEmpty()
  phone!: string;

  @ApiPropertyOptional({ example: 'male' })
  @IsString()
  @IsOptional()
  gender?: string;

  @ApiPropertyOptional({ example: '2020-01-15' })
  @IsString()
  @IsOptional()
  joiningDate?: string;

  @ApiPropertyOptional({ example: 'M.Sc in Mathematics, Dhaka University' })
  @IsString()
  @IsOptional()
  qualification?: string;

  @ApiPropertyOptional({ example: '10 years teaching experience' })
  @IsString()
  @IsOptional()
  experience?: string;

  @ApiPropertyOptional({ example: ['class_1', 'class_2'] })
  @IsArray()
  @IsOptional()
  assignedClassIds?: string[];

  @ApiPropertyOptional({ example: ['sec_a', 'sec_b'] })
  @IsArray()
  @IsOptional()
  assignedSectionIds?: string[];

  @ApiPropertyOptional({ example: ['sub_math'] })
  @IsArray()
  @IsOptional()
  assignedSubjectIds?: string[];

  @ApiPropertyOptional({ example: false })
  @IsBoolean()
  @IsOptional()
  isClassTeacher?: boolean;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  classTeacherOfClassId?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  classTeacherOfSectionId?: string;

  @ApiPropertyOptional({ example: true })
  @IsBoolean()
  @IsOptional()
  showOnWebsite?: boolean;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  photoURL?: string;

  @ApiPropertyOptional({ example: 'active' })
  @IsString()
  @IsOptional()
  status?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  schoolId?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  userId?: string;
}
