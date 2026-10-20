import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Res,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { Response } from 'express';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { QueryStudentsDto } from './dto/query-students.dto';
import { AuthGuard } from '../common/guards/auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { DecodedUser } from '../common/interfaces/user.interface';

@ApiTags('Students')
@ApiBearerAuth('firebase-auth')
@UseGuards(AuthGuard, RolesGuard)
@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  @Roles('super_admin', 'school_admin')
  @ApiOperation({ summary: 'Create a new student' })
  @ApiResponse({ status: 201, description: 'Student created' })
  async create(
    @Body() dto: CreateStudentDto,
    @CurrentUser() user: DecodedUser,
  ) {
    return {
      success: true,
      data: await this.studentsService.create(dto, user.uid),
    };
  }

  @Get()
  @Roles('super_admin', 'school_admin', 'teacher')
  @ApiOperation({ summary: 'List students with filtering and pagination' })
  @ApiResponse({ status: 200, description: 'Students list returned' })
  async findAll(@Query() query: QueryStudentsDto) {
    const result = await this.studentsService.findAll(query);
    return {
      success: true,
      ...result,
    };
  }

  @Get('export')
  @Roles('super_admin', 'school_admin')
  @ApiOperation({ summary: 'Export students as CSV' })
  @ApiResponse({ status: 200, description: 'CSV data returned' })
  async exportCSV(@Query() query: QueryStudentsDto, @Res() res: Response) {
    const data = await this.studentsService.exportCSV(query);

    if (data.length === 0) {
      res.status(200).json({ success: true, data: [], message: 'No students found' });
      return;
    }

    // Convert to CSV
    const headers = Object.keys(data[0]);
    const csvRows = [
      headers.join(','),
      ...data.map((row) =>
        headers
          .map((h) => {
            const val = (row as Record<string, unknown>)[h];
            const str = val !== undefined && val !== null ? String(val) : '';
            // Escape commas and quotes
            return str.includes(',') || str.includes('"')
              ? `"${str.replace(/"/g, '""')}"`
              : str;
          })
          .join(','),
      ),
    ];

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=students.csv');
    res.status(200).send(csvRows.join('\n'));
  }

  @Post('import')
  @Roles('super_admin', 'school_admin')
  @ApiOperation({ summary: 'Import students from array data' })
  @ApiResponse({ status: 201, description: 'Students imported' })
  async importStudents(
    @Body() students: CreateStudentDto[],
    @CurrentUser() user: DecodedUser,
  ) {
    return {
      success: true,
      data: await this.studentsService.importCSV(students, user.uid),
    };
  }

  @Get(':id')
  @Roles('super_admin', 'school_admin', 'teacher')
  @ApiOperation({ summary: 'Get a student by ID' })
  @ApiResponse({ status: 200, description: 'Student found' })
  @ApiResponse({ status: 404, description: 'Student not found' })
  async findOne(@Param('id') id: string) {
    return {
      success: true,
      data: await this.studentsService.findOne(id),
    };
  }

  @Put(':id')
  @Roles('super_admin', 'school_admin')
  @ApiOperation({ summary: 'Update a student' })
  @ApiResponse({ status: 200, description: 'Student updated' })
  @ApiResponse({ status: 404, description: 'Student not found' })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateStudentDto,
    @CurrentUser() user: DecodedUser,
  ) {
    return {
      success: true,
      data: await this.studentsService.update(id, dto, user.uid),
    };
  }

  @Delete(':id')
  @Roles('super_admin', 'school_admin')
  @ApiOperation({ summary: 'Deactivate a student (soft delete)' })
  @ApiResponse({ status: 200, description: 'Student deactivated' })
  @ApiResponse({ status: 404, description: 'Student not found' })
  async remove(
    @Param('id') id: string,
    @CurrentUser() user: DecodedUser,
  ) {
    return {
      success: true,
      data: await this.studentsService.remove(id, user.uid),
    };
  }
}
