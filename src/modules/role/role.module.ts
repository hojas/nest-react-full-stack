import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './role.entity';
import { AdminController } from './admin.controller';
import { RoleService } from './role.service';

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  controllers: [AdminController],
  providers: [RoleService],
})
export class RoleModule {}
