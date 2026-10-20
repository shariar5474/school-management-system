import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { TeachersService } from './teachers.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { PaginationQueryDto } from '../common/dto/pagination.dto';
import { AuthGuard } from '../common/guards/auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@ApiTags('teachers')
@Controller('teachers')
export class TeachersController {
  constructor(private readonly teachersService: TeachersService) {}

  @Get('public')
  @ApiOperation({ summary: 'Public teacher directory' })
  findPublic(@Query() pagination: PaginationQueryDto) {
    return this.teachersService.findAll(pagination, 'default', true);
  }

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('super_admin', 'school_admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create teacher profile' })
  create(@Body() dto: CreateTeacherDto, @CurrentUser() user: any) {
    return this.teachersService.create(dto, user?.uid || 'system');
  }

  @Get()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('super_admin', 'school_admin', 'teacher')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'List all teachers' })
  findAll(@Query() pagination: PaginationQueryDto) {
    return this.teachersService.findAll(pagination);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get teacher profile by ID' })
  findOne(@Param('id') id: string) {
    return this.teachersService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('super_admin', 'school_admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update teacher profile' })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateTeacherDto,
    @CurrentUser() user: any,
  ) {
    return this.teachersService.update(id, dto, user?.uid || 'system');
  }

  @Delete(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('super_admin', 'school_admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Deactivate teacher profile' })
  remove(@Param('id') id: string, @CurrentUser() user: any) {
    return this.teachersService.remove(id, user?.uid || 'system');
  }
}
