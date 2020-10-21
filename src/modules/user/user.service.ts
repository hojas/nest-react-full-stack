import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Pagination } from '../../types/pagination';
import { UserDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    this.initAdmin();
  }

  async initAdmin(): Promise<void> {
    const user = await this.findById(1);

    if (JSON.parse(user.raw).username === 'hojas') {
      this.addRole(user.id, 'admin');
    }
  }

  async findAll({
    page,
    page_size,
  }: Pagination<User>): Promise<Pagination<User>> {
    const [results, count] = await this.userRepository.findAndCount({
      skip: (page - 1) * page_size,
      take: page_size,
    });

    return {
      page,
      page_size,
      count,
      results,
    };
  }

  findById(id: number): Promise<User> {
    return this.userRepository.findOne(id);
  }

  findByGithubId(github_id: number): Promise<User> {
    return this.userRepository.findOne({ where: { github_id } });
  }

  create(user: UserDto): Promise<User> {
    return this.userRepository.save(user);
  }

  async addRole(id: number, roleCode: string): Promise<User> {
    const user = await this.findById(id);
    if (user) {
      const roles: string[] = user.roles.split(',');
      roles.push(roleCode);

      this.userRepository.save({
        ...user,
        roles: roles.join(','),
      });
    }

    return null;
  }

  async removeRole(id: number, roleCode: string): Promise<User> {
    const user = await this.findById(id);
    if (user) {
      let roles: string[] = user.roles.split(',');
      roles = roles.filter(role => role !== roleCode);

      this.userRepository.save({
        ...user,
        roles: roles.join(','),
      });
    }

    return null;
  }
}
