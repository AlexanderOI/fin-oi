import { Module } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { AuthController } from '@/auth/auth.controller'
import { AuthService } from '@/auth/auth.service'
import { PrismaService } from '@/prisma/prisma.service'

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtService, PrismaService],
  imports: [],
  exports: [JwtService],
})
export class AuthModule {}
