import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcript from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPaylodaType } from './types/jwt-payloda.type';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findOne({
      email,
      withoutException: true,
    });

    if (user && (await bcript.compare(password, user.password))) {
      const { password, ...userWithoutPass } = user;
      return userWithoutPass;
    }

    throw new HttpException(
      {
        message: 'Invalid username or password',
        error: 'Invalid authorization data',
      },
      HttpStatus.UNAUTHORIZED,
    );
  }

  async signIn(email: string, password: string) {
    const user = await this.validateUser(email, password);

    const payload: JwtPaylodaType = { sub: user.id, userEmail: user.email };

    return {
      accessToken: await this.jwtService.signAsync(payload),
      user,
    };
  }

  async verifyJwt(jwt: string) {
    try {
      const payload = await this.jwtService.verifyAsync(jwt, {
        secret: 'JWT-ACCESS-TOKEN-SECRET', //TODO: убрать в .env
      });
      return payload;
    } catch (error) {
      throw new HttpException(
        {
          message: error.message,
          error: 'Jwt check error',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
