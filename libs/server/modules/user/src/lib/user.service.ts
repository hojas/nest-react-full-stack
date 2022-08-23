import { Injectable } from '@nestjs/common'

import { User } from '@prisma/client'
import { getHash } from '@nx-blog/server/utils'
import { Pagination } from '@nx-blog/server/types'
import { PrismaService } from '@nx-blog/server/modules/prisma'
import { CreateUserDto } from './create-user.dto'

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  onApplicationBootstrap() {
    // waiting roles created
    setTimeout(async () => {
      await this.createAdmin()
    }, 1000)
  }

  private async createAdmin() {
    try {
      await this.prisma.user.create({
        data: {
          username: 'admin@zwd.xyz',
          password: getHash('123456'),
          roles: {
            connect: [{ code: 'user' }, { code: 'admin' }],
          },
        },
      })

      console.log(`Created admin`)
      console.log(`Email: admin@zwd.xyz`)
      console.log(`Password: 123456`)
    } catch {
      //
    }
  }

  async findAll(params: {
    page: number
    page_size: number
  }): Promise<Pagination<User>> {
    const { page, page_size } = params

    const users = await this.prisma.user.findMany({
      skip: (page - 1) * page_size,
      take: page_size,
      orderBy: { created_at: 'desc' },
    })

    return {
      page,
      page_size,
      count: users.length,
      results: users.map(user => {
        user.password = undefined
        return user
      }),
    }
  }

  findById(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        roles: true,
      },
    })
  }

  // email as username
  findByEmail(username: string) {
    return this.prisma.user.findUnique({
      where: { username },
      include: {
        roles: true,
      },
    })
  }

  create(user: CreateUserDto) {
    return this.prisma.user.create({
      data: user,
    })
  }

  async resetPassword(username: string, oldPassword: string, newPassword: string) {
    const user = await this.findByEmail(username)
    if (user.password !== getHash(oldPassword)) {
      throw new Error('密码不正确')
    }

    return this.prisma.user.update({
      where: { username },
      data: {
        password: getHash(newPassword),
      },
    })
  }
}
