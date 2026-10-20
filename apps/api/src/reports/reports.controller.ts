import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ReportsService } from './reports.service';
import { AuthGuard } from '../common/guards/auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@ApiTags('reports')
@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('dashboard-stats')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('super_admin', 'school_admin', 'accountant', 'teacher')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get live aggregated dashboard statistics' })
  getDashboardStats(@Query('schoolId') schoolId?: string) {
    return this.reportsService.getDashboardStats(schoolId || 'default');
  }
}
