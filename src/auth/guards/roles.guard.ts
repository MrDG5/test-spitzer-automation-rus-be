import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { UserRolesType } from 'src/db/entities/users.entity';
import { UserInRequestHeader } from '../types/user-in-request-header.type';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.get<UserRolesType[]>(
      'required_roles',
      context.getHandler(),
    );

    if (!requiredRoles || !requiredRoles.length) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const curUser: UserInRequestHeader = request.user;

    const userRolesSet = new Set(curUser.roles);

    return requiredRoles.some((reqRole) => userRolesSet.has(reqRole));
  }
}
