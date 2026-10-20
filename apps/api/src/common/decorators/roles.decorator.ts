import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';

/**
 * Decorator that sets the required roles for accessing a route.
 * Used in combination with RolesGuard.
 * @param roles - One or more roles that are allowed to access the route
 * @example @Roles('super_admin', 'school_admin')
 */
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
