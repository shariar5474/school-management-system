import { Controller, Get, Post, Body, Patch, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AdmissionsService } from './admissions.service';
import { CreateAdmissionDto } from './dto/create-admission.dto';
import { ReviewAdmissionDto } from './dto/review-admission.dto';
import { PaginationQueryDto } from '../common/dto/pagination.dto';
import { AuthGuard } from '../common/guards/auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@ApiTags('admissions')
@Controller('admissions')
export class AdmissionsController {
  constructor(private readonly admissionsService: AdmissionsService) {}

  @Post('apply')
  @ApiOperation({ summary: 'Public online admission application' })
  submit(@Body() dto: CreateAdmissionDto) {
    return this.admissionsService.submit(dto);
  }

  @Get('track/:appNum')
  @ApiOperation({ summary: 'Track application status by application number' })
  track(@Param('appNum') appNum: string, @Query('schoolId') schoolId?: string) {
    return this.admissionsService.findByApplicationNumber(appNum, schoolId);
  }

  @Get()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('super_admin', 'school_admin', 'admission_officer')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'List admission applications' })
  findAll(
    @Query() pagination: PaginationQueryDto,
    @Query('schoolId') schoolId?: string,
    @Query('status') status?: string,
  ) {
    return this.admissionsService.findAll(pagination, schoolId, status);
  }

  @Get(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('super_admin', 'school_admin', 'admission_officer')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get application details' })
  findOne(@Param('id') id: string) {
    return this.admissionsService.findOne(id);
  }

  @Patch(':id/review')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('super_admin', 'school_admin', 'admission_officer')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Review/approve/enroll admission application' })
  review(
    @Param('id') id: string,
    @Body() dto: ReviewAdmissionDto,
    @CurrentUser() user: any,
  ) {
    return this.admissionsService.review(id, dto, user?.uid || 'system');
  }
}
