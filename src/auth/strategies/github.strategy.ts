import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      clientID: 'cb9f1a317ce43bf01766',
      clientSecret: '41ea6ad25893660325b318843efa3abeb3b8275c',
      callbackURL: 'http://localhost:3000/api/auth/github/callback',
    });
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
  ): Promise<any> {
    if (profile && profile.id) {
      return profile;
    }

    throw new UnauthorizedException();
  }
}
