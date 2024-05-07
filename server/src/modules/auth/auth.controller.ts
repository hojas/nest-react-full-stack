import { Request, Response } from 'express';
import {
  Controller,
  Get,
  Post,
  Req,
  Res,
  Body,
  UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { Public } from '../../decorators/jwt.decorator';
import { CreateUserDto } from '../user/create-user.dto';
import { UserService } from '../user/user.service';

import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

interface MyRequest extends Request {
  user?: User;
}

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Req() req: MyRequest,
    @Res() res: Response,
  ): Promise<Response<{ ok: boolean }>> {
    const { access_token: token } = this.authService.login(req.user as User);

    if (token) {
      this.authService.setToken(res, token);
      return res.json({ ok: true });
    }
    return res.json({ ok: false });
  }

  @Public()
  @Post('register')
  async register(@Body('user') user: CreateUserDto): Promise<User> {
    return this.userService.create(user);
  }

  @Get('user')
  getProfile(@Req() req: MyRequest) {
    return req.user;
  }

  @Post('reset-password')
  resetPassword(
    @Req() req: MyRequest,
    @Body()
    user: {
      oldPassword: string;
      newPassword: string;
    },
  ) {
    const currentUser = req.user as User;
    return this.userService.resetPassword(
      currentUser.username,
      user.oldPassword,
      user.newPassword,
    );
  }
}
