import { Response } from 'express';
import {
  Controller,
  Get,
  UseGuards,
  Req,
  Res,
  UseFilters,
  NotFoundException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthReq } from 'src/types/auth-req';
import { GithubAuthGuard } from './guards/github-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Get('github')
  @UseGuards(GithubAuthGuard)
  auth(): string {
    return '正在登录...';
  }

  @Get('github/callback')
  @UseGuards(GithubAuthGuard)
  async callback(@Req() req: AuthReq, @Res() res: Response): Promise<any> {
    try {
      const token = await this.authService.validate(req);
      this.authService.setToken(res, token.token);
      return res.json({ ok: true });
    } catch {
      return res.json({ ok: false });
    }
  }

  @Get('user')
  @UseGuards(JwtAuthGuard)
  @UseFilters(HttpExceptionFilter)
  async findAuthUser(@Req() req: AuthReq): Promise<User> {
    if (req.user && req.user.id) {
      return this.userService.findById(req.user.id);
    }

    throw new NotFoundException();
  }
}
