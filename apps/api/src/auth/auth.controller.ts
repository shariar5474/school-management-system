import {
  Controller,
  Post,
  Get,
  Body,
  Headers,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SetupAdminDto } from './dto/setup-admin.dto';
import { AuthGuard } from '../common/guards/auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { DecodedUser } from '../common/interfaces/user.interface';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({
    summary: 'Verify Firebase ID token and return user profile',
    description: 'Send a Firebase ID token to verify the user and get their profile data.',
  })
  @ApiResponse({ status: 200, description: 'Login successful' })
  @ApiResponse({ status: 401, description: 'Invalid or expired token' })
  async login(@Headers('authorization') authHeader: string) {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new Error('Authorization header with Bearer token is required');
    }
    const token = authHeader.split(' ')[1];
    return {
      success: true,
      data: await this.authService.login(token),
    };
  }

  @Post('setup-admin')
  @ApiOperation({
    summary: 'Bootstrap the first super admin account',
    description:
      'One-time endpoint to create the initial super admin. Requires ADMIN_SETUP_SECRET.',
  })
  @ApiResponse({ status: 201, description: 'Super admin created' })
  @ApiResponse({ status: 403, description: 'Invalid secret' })
  @ApiResponse({ status: 409, description: 'Super admin already exists' })
  async setupAdmin(@Body() dto: SetupAdminDto) {
    return {
      success: true,
      data: await this.authService.setupAdmin(dto),
    };
  }

  @Get('me')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('firebase-auth')
  @ApiOperation({
    summary: 'Get current user profile',
    description: 'Returns the profile of the currently authenticated user.',
  })
  @ApiResponse({ status: 200, description: 'User profile returned' })
  @ApiResponse({ status: 401, description: 'Not authenticated' })
  async getMe(@CurrentUser() user: DecodedUser) {
    return {
      success: true,
      data: await this.authService.getProfile(user.uid),
    };
  }
}
