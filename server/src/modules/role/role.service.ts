import { Injectable } from '@nestjs/common'

import { Role } from '@prisma/client'
import { PrismaService } from '../prisma/prisma.service'
import { CreateRoleDto } from './create-role.dto'

@Injectable()
export class RoleService {
  constructor(private prisma: PrismaService) {}

  async onApplicationBootstrap() {
    await this.initRoles()
  }

  async initRoles(): Promise<void> {
    await this.addRole('管理员', 'admin')
    await this.addRole('用户', 'user')
  }

  private async addRole(name: string, code: string): Promise<void> {
    const role = new CreateRoleDto()
    role.name = name
    role.code = code

    try {
      const r = await this.findByCode(role.code)

      if (!r) {
        const newRole = await this.create(role)
        console.log(`Created role ${newRole.name}`)
      }
    } catch {
      const newRole = await this.create(role)
      console.log(`Created role ${newRole.name}`)
    }
  }

  findAll(): Promise<Role[]> {
    return this.prisma.role.findMany({ orderBy: { createdAt: 'desc' } })
  }

  findById(id: number): Promise<Role> {
    return this.prisma.role.findUnique({ where: { id } })
  }

  findByCode(code: string): Promise<Role> {
    return this.prisma.role.findUnique({ where: { code } })
  }

  create(role: CreateRoleDto): Promise<Role> {
    return this.prisma.role.create({ data: role })
  }

  update(id: number, role: CreateRoleDto): Promise<Role> {
    return this.prisma.role.update({ where: { id }, data: role })
  }

  remove(id: number): Promise<Role> {
    return this.prisma.role.delete({ where: { id } })
  }
}
