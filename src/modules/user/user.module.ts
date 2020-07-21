import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AdminController } from './admin.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController, AdminController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
