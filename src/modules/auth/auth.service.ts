import { Response } from 'express';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from '../user/user.service';
import { AuthReq } from 'src/types/auth-req';
import { UserDto } from 'src/modules/user/user.dto';
import { User } from 'src/modules/user/user.entity';

type Token = {
  token: string;
};

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validate(req: AuthReq): Promise<Token | null> {
    if (req.user) {
      const user = await this.userService.findByGithubId(req.user.id);

      if (user) {
        return this.login(user);
      } else {
        const newUser: UserDto = new UserDto();
        newUser.github_id = +req.user.id;
        newUser.raw = req.user._raw;

        const u: User = await this.userService.create(newUser);
        return this.login(u);
      }
    }

    return null;
  }

  login(user: User): Token {
    const token = this.jwtService.sign({
      sub: user.id,
      roles: user.roles,
    });

    return { token };
  }

  setToken(res: Response, token: string): void {
    res.cookie('auth-token', token, {
      path: '/',
      httpOnly: true,
    });
  }
}
