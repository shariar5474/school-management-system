import { Controller, Get, Post, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { FinanceService } from './finance.service';
import { CreateFeeStructureDto } from './dto/create-fee-structure.dto';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { RecordPaymentDto } from './dto/record-payment.dto';
import { PaginationQueryDto } from '../common/dto/pagination.dto';
import { AuthGuard } from '../common/guards/auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@ApiTags('finance')
@Controller('finance')
export class FinanceController {
  constructor(private readonly financeService: FinanceService) {}

  // Fee Structure
  @Post('fee-structures')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('super_admin', 'school_admin', 'accountant')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create class fee structure' })
  createFeeStructure(@Body() dto: CreateFeeStructureDto, @CurrentUser() user: any) {
    return this.financeService.createFeeStructure(dto, user?.uid || 'system');
  }

  @Get('fee-structures')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get fee structures' })
  getFeeStructures(
    @Query('schoolId') schoolId?: string,
    @Query('classId') classId?: string,
  ) {
    return this.financeService.getFeeStructures(schoolId, classId);
  }

  // Invoices
  @Post('invoices')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('super_admin', 'school_admin', 'accountant')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Generate student invoice' })
  createInvoice(@Body() dto: CreateInvoiceDto, @CurrentUser() user: any) {
    return this.financeService.createInvoice(dto, user?.uid || 'system');
  }

  @Get('invoices')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'List invoices' })
  getInvoices(
    @Query() pagination: PaginationQueryDto,
    @Query('schoolId') schoolId?: string,
    @Query('studentId') studentId?: string,
    @Query('status') status?: string,
  ) {
    return this.financeService.getInvoices(pagination, schoolId, studentId, status);
  }

  @Get('invoices/:id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get invoice details' })
  getInvoiceById(@Param('id') id: string) {
    return this.financeService.getInvoiceById(id);
  }

  // Payments
  @Post('payments')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('super_admin', 'school_admin', 'accountant')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Record payment against an invoice' })
  recordPayment(@Body() dto: RecordPaymentDto, @CurrentUser() user: any) {
    return this.financeService.recordPayment(dto, user?.uid || 'system');
  }

  // Summary Report
  @Get('summary')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('super_admin', 'school_admin', 'accountant')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get financial overview and statistics' })
  getSummary(@Query('schoolId') schoolId?: string) {
    return this.financeService.getFinancialSummary(schoolId);
  }
}
