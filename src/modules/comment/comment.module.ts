import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './comment.entity';
import { CommentController } from './comment.controller';
import { AdminController } from './admin.controller';
import { CommentService } from './comment.service';

@Module({
  imports: [TypeOrmModule.forFeature([Comment])],
  controllers: [CommentController, AdminController],
  providers: [CommentService],
})
export class CommentModule {}
