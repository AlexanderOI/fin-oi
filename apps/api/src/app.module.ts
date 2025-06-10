import { Module } from '@nestjs/common'

import { AppService } from '@/app.service'
import { AppController } from '@/app.controller'

import { AuthModule } from '@/auth/auth.module'
import { PrismaModule } from '@/prisma/prisma.module'

import { UserModule } from '@/features/users/user.module'

@Module({
  imports: [PrismaModule, AuthModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
