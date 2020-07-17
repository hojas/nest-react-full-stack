import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Pagination } from '../types/pagination';
import { UserDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll({
    page,
    pageSize,
  }: Pagination<User>): Promise<Pagination<User>> {
    const [results, count] = await this.userRepository.findAndCount({
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    return {
      page,
      pageSize,
      count,
      results,
    };
  }

  findById(id: string): Promise<User> {
    return this.userRepository.findOne(id);
  }

  findByGithubId(githubId: string): Promise<User> {
    return this.userRepository.findOne({ where: { githubId } });
  }

  create(user: UserDto): Promise<User> {
    return this.userRepository.save(user);
  }
}
