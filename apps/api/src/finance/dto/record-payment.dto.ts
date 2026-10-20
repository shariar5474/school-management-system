import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RecordPaymentDto {
  @ApiProperty({ example: 'invoice_123' })
  @IsString()
  @IsNotEmpty()
  invoiceId!: string;

  @ApiProperty({ example: 1500 })
  @IsNumber()
  amount!: number;

  @ApiProperty({ example: 'cash' })
  @IsString()
  @IsNotEmpty()
  paymentMethod!: string; // 'cash' | 'bank_transfer' | 'mobile_banking' | 'cheque'

  @ApiPropertyOptional({ example: 'TXN-987654' })
  @IsString()
  @IsOptional()
  transactionReference?: string;

  @ApiPropertyOptional({ example: 'Payment received in full' })
  @IsString()
  @IsOptional()
  remarks?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  schoolId?: string;
}
