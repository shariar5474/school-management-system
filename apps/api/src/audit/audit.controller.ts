import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuditService } from './audit.service';
import { AuthGuard } from '../common/guards/auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { PaginationQueryDto } from '../common/dto/pagination.dto';

@ApiTags('Audit')
@ApiBearerAuth('firebase-auth')
@UseGuards(AuthGuard, RolesGuard)
@Controller('audit')
export class AuditController {
  constructor(private readonly auditService: AuditService) {}

  @Get('logs')
  @Roles('super_admin')
  @ApiOperation({ summary: 'Get audit logs (super admin only)' })
  @ApiResponse({ status: 200, description: 'Audit logs returned' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async getAuditLogs(@Query() query: PaginationQueryDto) {
    const result = await this.auditService.getAuditLogs(query);
    return {
      success: true,
      ...result,
    };
  }
}
