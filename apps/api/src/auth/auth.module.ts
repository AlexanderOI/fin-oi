import { Module } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { AuthController } from '@/auth/auth.controller'
import { AuthService } from '@/auth/auth.service'

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtService],
  imports: [],
  exports: [JwtService],
})
export class AuthModule {}
