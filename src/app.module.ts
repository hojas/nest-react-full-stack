import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { ArticleModule } from './article/article.module';

@Module({
  imports: [TypeOrmModule.forRoot(), UserModule, AuthModule, CategoryModule, ArticleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
