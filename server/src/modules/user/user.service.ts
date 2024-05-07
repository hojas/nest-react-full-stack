import { Injectable, HttpException, HttpStatus } from '@nestjs/common'

import { User } from '@prisma/client'
import { getHash } from '../../utils/get-hash'
import { Pagination } from '../../types/pagination'
import { PrismaService } from '../prisma/prisma.service'
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
          username: 'admin@example.com',
          password: getHash('123456'),
          roles: {
            connect: [{ code: 'user' }, { code: 'admin' }],
          },
        },
      })

      console.log(`Created admin`)
      console.log(`Email: admin@example.com`)
      console.log(`Password: 123456`)
    } catch {
      //
    }
  }

  async findAll(params: {
    page: number
    pageSize: number
  }): Promise<Pagination<User>> {
    const { page, pageSize } = params

    const users = await this.prisma.user.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: { createdAt: 'desc' },
    })

    return {
      page,
      pageSize,
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

  async resetPassword(
    username: string,
    oldPassword: string,
    newPassword: string
  ) {
    const user = await this.findByEmail(username)
    if (oldPassword.trim() === '' || newPassword.trim() === '') {
      throw new HttpException('密码不能为空', HttpStatus.BAD_REQUEST)
    }
    if (user.password !== getHash(oldPassword)) {
      throw new HttpException('密码不正确', HttpStatus.BAD_REQUEST)
    }
    if (newPassword.length < 8) {
      throw new HttpException('密码长度不能小于 8', HttpStatus.BAD_REQUEST)
    }

    return this.prisma.user.update({
      where: { username },
      data: {
        password: getHash(newPassword),
      },
    })
  }
}
