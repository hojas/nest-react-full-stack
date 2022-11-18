import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common'

import { Roles } from '../../decorators/roles.decorator'
import { Role } from '@prisma/client'
import { CreateRoleDto } from './create-role.dto'
import { RoleService } from './role.service'

@Roles('admin')
@Controller('admin/role')
export class AdminController {
  constructor(private roleService: RoleService) {}

  @Get()
  findAll(): Promise<Role[]> {
    return this.roleService.findAll()
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number): Promise<Role> {
    return this.roleService.findById(id)
  }

  @Post()
  create(@Body('role') role: CreateRoleDto): Promise<Role> {
    return this.roleService.create(role)
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body('role') role: Role
  ): Promise<Role> {
    const res = await this.roleService.update(id, role)
    if (res) {
      return res
    }

    throw new NotFoundException()
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<null> {
    const res = await this.roleService.remove(id)
    if (res) {
      return null
    }

    throw new NotFoundException()
  }
}
