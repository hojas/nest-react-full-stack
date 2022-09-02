import { Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  handleRequest(err, user) {
    if (err || !user) {
      throw err || new UnauthorizedException({ message: '登录失败' })
    }

    return user
  }
}
