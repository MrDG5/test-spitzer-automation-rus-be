import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { JwtPaylodaType } from '../types/jwt-payloda.type';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
    private readonly usersSevice: UsersService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const jwtToken: string | undefined = request.headers['authorization'];

    if (jwtToken) {
      // TODO: сделать тип закодированного токена
      const tokenPayload: JwtPaylodaType = await this.jwtService.verifyAsync(
        jwtToken,
        {
          secret: 'JWT-ACCESS-TOKEN-SECRET', //TODO: убрать в .env
        },
      );
      const user = await this.usersSevice.findOneWithoutPassword({
        email: tokenPayload.userEmail,
        withoutException: true,
      });

      request.user = user;
    } else {
      request.user = null;
    }

    return true;
  }
}
