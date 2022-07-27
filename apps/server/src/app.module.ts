import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
// import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler'

import { RoleModule, RolesGuard } from '@nx-blog/server/modules/role'
import { AuthModule, JwtAuthGuard } from '@nx-blog/server/modules/auth'
import { UserModule } from '@nx-blog/server/modules/user'
import { CategoryModule } from '@nx-blog/server/modules/category'
import { ArticleModule } from '@nx-blog/server/modules/article'
import { CommentModule } from '@nx-blog/server/modules/comment'
import { TagModule } from '@nx-blog/server/modules/tag'

@Module({
  imports: [
    // ThrottlerModule.forRoot({
    //   ttl: 60,
    //   limit: 120,
    // }),
    RoleModule,
    AuthModule,
    UserModule,
    CategoryModule,
    ArticleModule,
    CommentModule,
    TagModule,
  ],
  controllers: [],
  providers: [
    // {
    //   provide: APP_GUARD,
    //   useClass: ThrottlerGuard,
    // },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
