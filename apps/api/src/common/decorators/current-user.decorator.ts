import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { DecodedUser } from '../interfaces/user.interface';

/**
 * Parameter decorator that extracts the current authenticated user from the request.
 * The user is attached by the AuthGuard after token verification.
 * @example
 * @Get('me')
 * getProfile(@CurrentUser() user: DecodedUser) { return user; }
 * 
 * @Get('me')
 * getEmail(@CurrentUser('email') email: string) { return email; }
 */
export const CurrentUser = createParamDecorator(
  (data: keyof DecodedUser | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user as DecodedUser;
    return data ? user?.[data] : user;
  },
);
