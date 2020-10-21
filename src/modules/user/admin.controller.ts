import {
  Controller,
  Get,
  Param,
  NotFoundException,
  UseFilters,
  Query,
  ParseIntPipe,
  DefaultValuePipe,
} from '@nestjs/common';
import { Roles } from 'src/decorators/role.decorator';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';
import { Pagination } from 'src/types/pagination';
import { PAGE_SIZE } from 'src/constants/pagination';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('admin/users')
@Roles('admin')
export class AdminController {
  constructor(private userService: UserService) {}

  @Get()
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe)
    page: number,
    @Query('page_size', new DefaultValuePipe(PAGE_SIZE), ParseIntPipe)
    page_size: number,
  ): Promise<Pagination<User>> {
    return this.userService.findAll({ page, page_size });
  }

  @Get(':id')
  @UseFilters(HttpExceptionFilter)
  async findById(@Param('id') id: number): Promise<User> {
    const user = await this.userService.findById(id);
    if (user) {
      return user;
    }

    throw new NotFoundException();
  }
}
