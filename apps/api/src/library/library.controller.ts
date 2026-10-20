import { Controller, Get, Post, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { LibraryService } from './library.service';
import { CreateBookDto } from './dto/create-book.dto';
import { IssueBookDto } from './dto/issue-book.dto';
import { PaginationQueryDto } from '../common/dto/pagination.dto';
import { AuthGuard } from '../common/guards/auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@ApiTags('library')
@Controller('library')
export class LibraryController {
  constructor(private readonly libraryService: LibraryService) {}

  @Post('books')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('super_admin', 'school_admin', 'librarian')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add book to library catalog' })
  createBook(@Body() dto: CreateBookDto, @CurrentUser() user: any) {
    return this.libraryService.createBook(dto, user?.uid || 'system');
  }

  @Get('books')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Search and list books' })
  getBooks(
    @Query() pagination: PaginationQueryDto,
    @Query('schoolId') schoolId?: string,
    @Query('category') category?: string,
  ) {
    return this.libraryService.getBooks(pagination, schoolId, category);
  }

  @Post('issue')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('super_admin', 'school_admin', 'librarian')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Issue book to student or teacher' })
  issueBook(@Body() dto: IssueBookDto, @CurrentUser() user: any) {
    return this.libraryService.issueBook(dto, user?.uid || 'system');
  }

  @Post('return/:transactionId')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('super_admin', 'school_admin', 'librarian')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Return issued book' })
  returnBook(@Param('transactionId') transactionId: string, @CurrentUser() user: any) {
    return this.libraryService.returnBook(transactionId, user?.uid || 'system');
  }

  @Get('history/:borrowerId')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get borrowing history for a borrower' })
  getHistory(
    @Param('borrowerId') borrowerId: string,
    @Query('schoolId') schoolId?: string,
  ) {
    return this.libraryService.getBorrowingHistory(borrowerId, schoolId);
  }
}
