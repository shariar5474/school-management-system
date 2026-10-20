import { Controller, Get, Post, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ResultsService } from './results.service';
import { ActivateTemplateDto } from './dto/activate-template.dto';
import { AuthGuard } from '../common/guards/auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@ApiTags('results')
@Controller('results')
export class ResultsController {
  constructor(private readonly resultsService: ResultsService) {}

  @Get('template/active')
  @ApiOperation({ summary: 'Get active result template ID' })
  getActiveTemplate(@Query('schoolId') schoolId?: string) {
    return this.resultsService.getActiveTemplate(schoolId);
  }

  @Post('template/activate')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('super_admin', 'school_admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Set active result template (Classic, Modern, Premium)' })
  activateTemplate(@Body() dto: ActivateTemplateDto, @CurrentUser() user: any) {
    return this.resultsService.activateTemplate(dto, user?.uid || 'system');
  }

  @Get('public-search')
  @ApiOperation({ summary: 'Public student result search' })
  searchPublicResult(
    @Query('studentId') studentId: string,
    @Query('examId') examId: string,
    @Query('schoolId') schoolId?: string,
  ) {
    return this.resultsService.searchPublicResult(studentId, examId, schoolId);
  }

  @Get(':studentId')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get published student marksheet' })
  getStudentResult(
    @Param('studentId') studentId: string,
    @Query('examId') examId: string,
    @Query('academicYearId') academicYearId: string,
    @Query('schoolId') schoolId?: string,
  ) {
    return this.resultsService.getStudentResult(studentId, examId, academicYearId, schoolId);
  }
}
