import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { CategoryModule } from './modules/category/category.module';
import { ArticleModule } from './modules/article/article.module';
import { CommentModule } from './modules/comment/comment.module';
import { RoleModule } from './modules/role/role.module';
import { RolesGuard } from './modules/role/roles.guard';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    AuthModule,
    UserModule,
    CategoryModule,
    ArticleModule,
    CommentModule,
    RoleModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
