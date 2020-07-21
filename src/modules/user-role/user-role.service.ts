import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRole } from './user-role.entity';
import { Repository, DeleteResult } from 'typeorm';
import { UserRoleDto } from './user-role.dto';

@Injectable()
export class UserRoleService {
  constructor(
    @InjectRepository(UserRole)
    private userRoleRepository: Repository<UserRole>,
  ) {}

  findAll(): Promise<UserRole[]> {
    return this.userRoleRepository.find();
  }

  findById(id: number): Promise<UserRole> {
    return this.userRoleRepository.findOne(id);
  }

  create(userRole: UserRoleDto): Promise<UserRole> {
    return this.userRoleRepository.save(userRole);
  }

  async update(id: number, userRole: UserRoleDto): Promise<UserRole | null> {
    const ur = await this.findById(id);
    if (ur) {
      return this.userRoleRepository.save({ ...userRole, id: ur.id });
    }

    return null;
  }

  async remove(id: number): Promise<DeleteResult | null> {
    const ur = this.findById(id);
    if (ur) {
      return this.userRoleRepository.delete(id);
    }

    return null;
  }
}
