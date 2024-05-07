import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { User } from '@prisma/client';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  // login with email
  async validate(
    username: string,
    password: string,
  ): Promise<Omit<User, 'password'> | never> {
    const user = await this.authService.validateUser(username, password);

    if (!user) {
      throw new UnauthorizedException({ message: '未登录' });
    }
    return user;
  }
}
