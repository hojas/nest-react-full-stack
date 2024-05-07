import { Request } from 'express';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { User } from '@prisma/client';

const cookieExtractor = (req: Request): string =>
  req && req.cookies ? req.cookies['auth_token'] : null;

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: cookieExtractor,
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  handleRequest(err: Error, user: User): User | never {
    if (err || !user) {
      throw err || new UnauthorizedException({ message: '未登录' });
    }

    return user;
  }

  async validate(payload: any) {
    return payload;
  }
}
