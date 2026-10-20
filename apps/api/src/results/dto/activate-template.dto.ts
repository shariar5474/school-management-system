import { IsString, IsNotEmpty, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ActivateTemplateDto {
  @ApiProperty({
    enum: ['classic', 'modern', 'premium'],
    example: 'modern',
    description: 'Identifier of the active marksheet result template',
  })
  @IsString()
  @IsNotEmpty()
  @IsIn(['classic', 'modern', 'premium'])
  templateId!: 'classic' | 'modern' | 'premium';

  @ApiProperty({ example: 'default' })
  @IsString()
  @IsNotEmpty()
  schoolId!: string;
}
