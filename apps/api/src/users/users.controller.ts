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
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '../common/guards/auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { PaginationQueryDto } from '../common/dto/pagination.dto';
import { DecodedUser } from '../common/interfaces/user.interface';

@ApiTags('Users')
@ApiBearerAuth('firebase-auth')
@UseGuards(AuthGuard, RolesGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Roles('super_admin', 'school_admin')
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'User created' })
  @ApiResponse({ status: 409, description: 'User already exists' })
  async create(
    @Body() dto: CreateUserDto,
    @CurrentUser() user: DecodedUser,
  ) {
    return {
      success: true,
      data: await this.usersService.create(dto, user.uid),
    };
  }

  @Get()
  @Roles('super_admin', 'school_admin')
  @ApiOperation({ summary: 'List all users with pagination' })
  @ApiQuery({ name: 'role', required: false, description: 'Filter by role' })
  @ApiResponse({ status: 200, description: 'Users list returned' })
  async findAll(
    @Query() query: PaginationQueryDto,
    @Query('role') role?: string,
  ) {
    const result = await this.usersService.findAll({ ...query, role });
    return {
      success: true,
      ...result,
    };
  }

  @Get(':id')
  @Roles('super_admin', 'school_admin')
  @ApiOperation({ summary: 'Get a user by ID' })
  @ApiResponse({ status: 200, description: 'User found' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async findOne(@Param('id') id: string) {
    return {
      success: true,
      data: await this.usersService.findOne(id),
    };
  }

  @Put(':id')
  @Roles('super_admin', 'school_admin')
  @ApiOperation({ summary: 'Update a user' })
  @ApiResponse({ status: 200, description: 'User updated' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateUserDto,
    @CurrentUser() user: DecodedUser,
  ) {
    return {
      success: true,
      data: await this.usersService.update(id, dto, user.uid),
    };
  }

  @Delete(':id')
  @Roles('super_admin')
  @ApiOperation({ summary: 'Deactivate a user (soft delete)' })
  @ApiResponse({ status: 200, description: 'User deactivated' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async remove(
    @Param('id') id: string,
    @CurrentUser() user: DecodedUser,
  ) {
    return {
      success: true,
      data: await this.usersService.remove(id, user.uid),
    };
  }
}
