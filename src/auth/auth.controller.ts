import { Response } from 'express';
import { Controller, Get, UseGuards, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthReq } from 'src/types/auth-req';
import { GithubAuthGuard } from './guards/github-auth.guard';

@Controller('auth/github')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  @UseGuards(GithubAuthGuard)
  auth(): string {
    return '正在登录...';
  }

  @Get('callback')
  @UseGuards(GithubAuthGuard)
  async callback(@Req() req: AuthReq, @Res() res: Response): Promise<any> {
    const token = await this.authService.validate(req);
    this.authService.setToken(res, token.token);

    return res.json({ ok: true });
  }
}
