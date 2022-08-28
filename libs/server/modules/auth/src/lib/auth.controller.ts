import { Request, Response } from 'express'

import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common'
import { User } from '@prisma/client'
import { Public } from '@nx-blog/server/decorators'
import { CreateUserDto, UserService } from '@nx-blog/server/modules/user'

import { AuthService } from './auth.service'
import { LocalAuthGuard } from './local-auth.guard'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Req() req: Request,
    @Res() res: Response
  ): Promise<Response<{ ok: boolean }>> {
    const { access_token: token } = this.authService.login(req.user)

    if (token) {
      this.authService.setToken(res, token)
      return res.json({ ok: true })
    }
    return res.json({ ok: false })
  }

  @Public()
  @Post('register')
  async register(@Body('user') user: CreateUserDto): Promise<User> {
    return this.userService.create(user)
  }

  @Get('user')
  getProfile(@Req() req: Request) {
    return req.user
  }

  @Post('reset-password')
  resetPassword(
    @Req() req: Request,
    @Body('user')
    user: {
      oldPassword: string
      newPassword: string
      compare_Password: string
    }
  ) {
    const currentUser = req.user as User
    if (user.newPassword !== user.compare_Password) {
      throw new Error('两次输入的密码不同')
    }

    return this.authService.resetPassword(
      currentUser.username,
      user.oldPassword,
      user.newPassword
    )
  }
}
