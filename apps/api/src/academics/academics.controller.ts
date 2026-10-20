import { Controller, Get, Post, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AcademicsService } from './academics.service';
import { CreateAcademicYearDto } from './dto/create-academic-year.dto';
import { CreateClassDto } from './dto/create-class.dto';
import { CreateSectionDto } from './dto/create-section.dto';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { AuthGuard } from '../common/guards/auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@ApiTags('academics')
@Controller('academics')
export class AcademicsController {
  constructor(private readonly academicsService: AcademicsService) {}

  // Academic Years
  @Post('years')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('super_admin', 'school_admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create academic year' })
  createYear(@Body() dto: CreateAcademicYearDto, @CurrentUser() user: any) {
    return this.academicsService.createYear(dto, user?.uid || 'system');
  }

  @Get('years')
  @ApiOperation({ summary: 'List academic years' })
  getYears(@Query('schoolId') schoolId?: string) {
    return this.academicsService.getYears(schoolId);
  }

  // Classes
  @Post('classes')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('super_admin', 'school_admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create class' })
  createClass(@Body() dto: CreateClassDto, @CurrentUser() user: any) {
    return this.academicsService.createClass(dto, user?.uid || 'system');
  }

  @Get('classes')
  @ApiOperation({ summary: 'List all classes' })
  getClasses(@Query('schoolId') schoolId?: string) {
    return this.academicsService.getClasses(schoolId);
  }

  // Sections
  @Post('sections')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('super_admin', 'school_admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create section' })
  createSection(@Body() dto: CreateSectionDto, @CurrentUser() user: any) {
    return this.academicsService.createSection(dto, user?.uid || 'system');
  }

  @Get('classes/:classId/sections')
  @ApiOperation({ summary: 'List sections for a class' })
  getSections(@Param('classId') classId: string, @Query('schoolId') schoolId?: string) {
    return this.academicsService.getSectionsByClass(classId, schoolId);
  }

  // Subjects
  @Post('subjects')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('super_admin', 'school_admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create subject' })
  createSubject(@Body() dto: CreateSubjectDto, @CurrentUser() user: any) {
    return this.academicsService.createSubject(dto, user?.uid || 'system');
  }

  @Get('subjects')
  @ApiOperation({ summary: 'List subjects' })
  getSubjects(@Query('schoolId') schoolId?: string, @Query('classId') classId?: string) {
    return this.academicsService.getSubjects(schoolId, classId);
  }
}
