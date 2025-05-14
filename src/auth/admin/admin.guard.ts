import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user || user.profile !== 'ADMIN') {
      throw new ForbiddenException('Access denied: Admins only');
    }

    return true;
  }
}
