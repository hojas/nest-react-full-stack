import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './role.entity';
import { Repository, DeleteResult } from 'typeorm';
import { RoleDto } from './role.dto';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {
    this.initAdminRole();
  }

  async initAdminRole(): Promise<void> {
    const role = new RoleDto();
    role.name = '管理员';
    role.code = 'admin';

    const r = await this.findByCode(role.code);
    if (!r) {
      this.create(role);
    }
  }

  findAll(): Promise<Role[]> {
    return this.roleRepository.find();
  }

  findById(id: number): Promise<Role> {
    return this.roleRepository.findOne(id);
  }

  findByCode(code: string): Promise<Role> {
    return this.roleRepository.findOne({ where: { code } });
  }

  create(role: RoleDto): Promise<Role> {
    return this.roleRepository.save(role);
  }

  async update(id: number, role: RoleDto): Promise<Role | null> {
    const r = await this.findById(id);
    if (r) {
      return this.roleRepository.save({ ...role, id: r.id });
    }

    return null;
  }

  async remove(id: number): Promise<DeleteResult | null> {
    const r = await this.findById(id);
    if (r) {
      return this.roleRepository.delete(id);
    }

    return null;
  }
}
