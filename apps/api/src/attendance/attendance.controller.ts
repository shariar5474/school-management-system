import { Controller, Get, Post, Body, Query, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AttendanceService } from './attendance.service';
import { MarkAttendanceDto } from './dto/create-attendance.dto';
import { QueryAttendanceDto } from './dto/query-attendance.dto';
import { AuthGuard } from '../common/guards/auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@ApiTags('attendance')
@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('super_admin', 'school_admin', 'teacher')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Record daily attendance' })
  markAttendance(@Body() dto: MarkAttendanceDto, @CurrentUser() user: any) {
    return this.attendanceService.markAttendance(dto, user?.uid || 'system');
  }

  @Get()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('super_admin', 'school_admin', 'teacher')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get daily attendance sheet' })
  getDailyAttendance(@Query() query: QueryAttendanceDto) {
    return this.attendanceService.getDailyAttendance(query);
  }

  @Get('student/:studentId')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get attendance history for a student' })
  getStudentAttendance(
    @Param('studentId') studentId: string,
    @Query('schoolId') schoolId?: string,
  ) {
    return this.attendanceService.getStudentAttendance(studentId, schoolId);
  }
}
