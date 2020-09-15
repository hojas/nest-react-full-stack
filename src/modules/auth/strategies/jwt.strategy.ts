import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { Request } from 'express';

type Payload = {
  sub: number;
};

type User = {
  id: number;
};

const cookieExtractor = (req: Request): string => {
  let token: string;

  if (req && req.cookies) {
    token = req.cookies['auth-token'];
  }

  return token;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: cookieExtractor,
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: Payload): Promise<User> {
    return { id: payload.sub };
  }
}
