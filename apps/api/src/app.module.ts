import { Module } from '@nestjs/common'
import { AuthModule } from '@/auth/auth.module'
import { PrismaModule } from '@/prisma/prisma.module'
import { AppService } from '@/app.service'
import { AppController } from '@/app.controller'

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
