import { Controller, Get, Post, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ExaminationsService } from './examinations.service';
import { CreateExamDto } from './dto/create-exam.dto';
import { EnterMarksDto } from './dto/enter-marks.dto';
import { PublishResultsDto } from './dto/publish-results.dto';
import { AuthGuard } from '../common/guards/auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@ApiTags('examinations')
@Controller('examinations')
export class ExaminationsController {
  constructor(private readonly examinationsService: ExaminationsService) {}

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('super_admin', 'school_admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create new exam' })
  createExam(@Body() dto: CreateExamDto, @CurrentUser() user: any) {
    return this.examinationsService.createExam(dto, user?.uid || 'system');
  }

  @Get()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'List examinations' })
  getExams(
    @Query('schoolId') schoolId?: string,
    @Query('academicYearId') academicYearId?: string,
  ) {
    return this.examinationsService.getExams(schoolId, academicYearId);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get exam details' })
  getExamById(@Param('id') id: string) {
    return this.examinationsService.getExamById(id);
  }

  @Post('marks')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('super_admin', 'school_admin', 'teacher')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Enter marks for students' })
  enterMarks(@Body() dto: EnterMarksDto, @CurrentUser() user: any) {
    return this.examinationsService.enterMarks(dto, user?.uid || 'system');
  }

  @Post('publish')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('super_admin', 'school_admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Calculate GPA and publish results' })
  publishResults(@Body() dto: PublishResultsDto, @CurrentUser() user: any) {
    return this.examinationsService.publishResults(dto, user?.uid || 'system');
  }
}
