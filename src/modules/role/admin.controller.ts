import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  NotFoundException,
  Delete,
} from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from './role.entity';
import { RoleDto } from './role.dto';
import { RoleService } from './role.service';

@Controller('admin/role')
@Roles('admin')
export class AdminController {
  constructor(private roleService: RoleService) {}

  @Get()
  findAll(): Promise<Role[]> {
    return this.roleService.findAll();
  }

  @Post()
  create(@Body('role') role: RoleDto): Promise<Role> {
    return this.roleService.create(role);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body('role') role: RoleDto,
  ): Promise<Role> {
    const res = await this.roleService.update(id, role);
    if (res) {
      return res;
    }

    throw new NotFoundException();
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<DeleteResult> {
    const res = await this.roleService.remove(id);
    if (res) {
      return res;
    }

    throw new NotFoundException();
  }
}
