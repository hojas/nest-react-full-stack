import { Response } from 'express'
import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { getHash } from '@nx-blog/api-server/utils'
import { UserService } from '@nx-blog/api-server/modules/user'

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(username)

    if (user && user.password === getHash(password)) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user

      return result
    }

    return null
  }

  login(user: any) {
    return {
      access_token: this.jwtService.sign(user),
    }
  }

  setToken(res: Response, token: string): void {
    res.cookie('auth-token', token, {
      path: '/',
      httpOnly: true,
    })
  }
}
