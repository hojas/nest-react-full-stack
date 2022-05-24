import { Request, Response } from 'express'
import {
  Controller,
  Body,
  UseGuards,
  Get,
  Post,
  Req,
  Res,
} from '@nestjs/common'

import { Public } from '@nx-blog/api-server/decorators'
import { UserService, CreateUserDto } from '@nx-blog/api-server/modules/user'
import { LocalAuthGuard } from './local-auth.guard'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: Request, @Res() res: Response): Promise<any> {
    const { access_token: token } = this.authService.login(req.user)

    if (token) {
      this.authService.setToken(res, token)
      return res.json({ ok: true })
    }
    return res.json({ ok: false })
  }

  @Public()
  @Post('register')
  async register(@Body() user: CreateUserDto): Promise<any> {
    return this.userService.create(user)
  }

  @Get('user')
  getProfile(@Req() req) {
    return req.user
  }
}
