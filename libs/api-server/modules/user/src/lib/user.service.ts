import { Injectable } from '@nestjs/common'

import { User } from '@prisma/client'
import { getHash } from '@nx-blog/api-server/utils'
import { Pagination } from '@nx-blog/api-server/types'
import { PrismaService } from '@nx-blog/api-server/modules/prisma'
import { CreateUserDto } from './create-user.dto'

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  onApplicationBootstrap() {
    // waiting roles created
    setTimeout(() => {
      this.createAdmin()
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
    } catch {}
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

  async findById(id: number): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        roles: true,
      },
    })

    return user
  }

  // email as username
  async findByEmail(username: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { username },
      include: {
        roles: true,
      },
    })

    return user
  }

  create(user: CreateUserDto): Promise<User> {
    return this.prisma.user.create({
      data: user,
    })
  }
}
