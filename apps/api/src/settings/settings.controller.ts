import { Controller, Get, Post, Body, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { SettingsService } from './settings.service';
import { UpdateSettingsDto } from './dto/update-settings.dto';
import { AuthGuard } from '../common/guards/auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@ApiTags('settings')
@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get('public')
  @ApiOperation({ summary: 'Public school branding and settings' })
  getPublicSettings(@Query('schoolId') schoolId?: string) {
    return this.settingsService.getSettings(schoolId || 'default');
  }

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('super_admin', 'school_admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update school settings' })
  updateSettings(
    @Body() dto: UpdateSettingsDto,
    @Query('schoolId') schoolId: string = 'default',
    @CurrentUser() user: any,
  ) {
    return this.settingsService.updateSettings(schoolId, dto, user?.uid || 'system');
  }
}
