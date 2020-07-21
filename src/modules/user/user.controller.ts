import {
  Controller,
  Get,
  Param,
  NotFoundException,
  UseFilters,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

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
