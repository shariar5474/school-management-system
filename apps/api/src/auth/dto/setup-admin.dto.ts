import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SetupAdminDto {
  @ApiProperty({ description: 'Admin setup secret key' })
  @IsNotEmpty()
  @IsString()
  secret!: string;

  @ApiProperty({ description: 'Firebase ID token of the user to make super admin' })
  @IsNotEmpty()
  @IsString()
  idToken!: string;

  @ApiProperty({ description: 'Display name for the admin user' })
  @IsNotEmpty()
  @IsString()
  displayName!: string;

  @ApiProperty({ description: 'Email address of the admin user' })
  @IsNotEmpty()
  @IsEmail()
  email!: string;
}
