import { Controller, Get, Post, Body, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { NoticesService } from './notices.service';
import { CreateNoticeDto } from './dto/create-notice.dto';
import { CreateEventDto } from './dto/create-event.dto';
import { PaginationQueryDto } from '../common/dto/pagination.dto';
import { AuthGuard } from '../common/guards/auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@ApiTags('notices')
@Controller('notices')
export class NoticesController {
  constructor(private readonly noticesService: NoticesService) {}

  // Notices
  @Get('public')
  @ApiOperation({ summary: 'Public notices board' })
  getPublicNotices(@Query() pagination: PaginationQueryDto, @Query('schoolId') schoolId?: string) {
    return this.noticesService.getNotices(pagination, schoolId, true);
  }

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('super_admin', 'school_admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create notice' })
  createNotice(@Body() dto: CreateNoticeDto, @CurrentUser() user: any) {
    return this.noticesService.createNotice(dto, user?.uid || 'system');
  }

  @Get()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'List all notices' })
  getAllNotices(@Query() pagination: PaginationQueryDto, @Query('schoolId') schoolId?: string) {
    return this.noticesService.getNotices(pagination, schoolId, false);
  }

  // Events
  @Get('events/public')
  @ApiOperation({ summary: 'Public school events' })
  getPublicEvents(@Query() pagination: PaginationQueryDto, @Query('schoolId') schoolId?: string) {
    return this.noticesService.getEvents(pagination, schoolId, true);
  }

  @Post('events')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('super_admin', 'school_admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create event' })
  createEvent(@Body() dto: CreateEventDto, @CurrentUser() user: any) {
    return this.noticesService.createEvent(dto, user?.uid || 'system');
  }

  // Gallery
  @Get('gallery/public')
  @ApiOperation({ summary: 'Public photo gallery' })
  getGallery(@Query('schoolId') schoolId?: string) {
    return this.noticesService.getGallery(schoolId);
  }
}
