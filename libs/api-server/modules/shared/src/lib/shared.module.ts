import { Module } from '@nestjs/common'
import { PrismaModule } from '@nx-blog/api-server/modules/prisma'

@Module({
  imports: [PrismaModule],
  exports: [PrismaModule],
})
export class SharedModule {}
