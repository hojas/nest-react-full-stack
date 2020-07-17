import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GithubAuthGuard extends AuthGuard('github') {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  handleRequest(err, user) {
    if (err && err.code === 'bad_verification_code') {
      throw new UnauthorizedException({
        status: 401,
        message: '无效的 Github CODE',
      });
    }

    if (err || !user) {
      throw err || new UnauthorizedException();
    }

    return user;
  }
}
