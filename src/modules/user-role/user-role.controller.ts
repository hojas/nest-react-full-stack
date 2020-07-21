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
import { UserRole } from './user-role.entity';
import { UserRoleDto } from './user-role.dto';
import { UserRoleService } from './user-role.service';

@Controller('admin/user-role')
export class UserRoleController {
  constructor(private userRoleService: UserRoleService) {}

  @Get()
  findAll(): Promise<UserRole[]> {
    return this.userRoleService.findAll();
  }

  @Post()
  create(@Body('user_role') userRole: UserRoleDto): Promise<UserRole> {
    return this.userRoleService.create(userRole);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body('user_role') userRole: UserRoleDto,
  ): Promise<UserRole> {
    const res = await this.userRoleService.update(id, userRole);
    if (res) {
      return res;
    }

    throw new NotFoundException();
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<DeleteResult> {
    const res = await this.userRoleService.remove(id);
    if (res) {
      return res;
    }

    throw new NotFoundException();
  }
}
