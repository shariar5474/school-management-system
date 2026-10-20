import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsOptional,
  IsIn,
  IsBoolean,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'User email address' })
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @ApiProperty({ description: 'Display name' })
  @IsNotEmpty()
  @IsString()
  displayName!: string;

  @ApiProperty({
    description: 'User role',
    enum: ['school_admin', 'teacher', 'student', 'parent', 'accountant', 'librarian'],
  })
  @IsNotEmpty()
  @IsIn(['school_admin', 'teacher', 'student', 'parent', 'accountant', 'librarian'])
  role!: string;

  @ApiPropertyOptional({ description: 'Phone number' })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional({ description: 'School ID' })
  @IsOptional()
  @IsString()
  schoolId?: string;

  @ApiPropertyOptional({ description: 'Temporary password for Firebase Auth account creation' })
  @IsOptional()
  @IsString()
  password?: string;
}
