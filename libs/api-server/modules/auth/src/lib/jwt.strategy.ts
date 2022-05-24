import { Request } from 'express'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-jwt'
import { User } from '@prisma/client'

const cookieExtractor =
  () =>
  (req: Request): string => {
    let token: string

    if (req && req.cookies) {
      token = req.cookies['auth-token']
    }

    return token
  }

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      jwtFromRequest: cookieExtractor(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    })
  }

  handleRequest(err: Error, user: User): User | never {
    if (err || !user) {
      throw err || new UnauthorizedException({ message: '未登录' })
    }

    return user
  }

  async validate(payload: any) {
    return payload
  }
}
