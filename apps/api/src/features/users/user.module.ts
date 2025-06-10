import { Module } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { UserService } from '@/features/users/user.service'
import { UserController } from '@/features/users/user.controller'

import { CloudinaryModule } from '@/cloudinary/cloudinary.module'

@Module({
  controllers: [UserController],
  providers: [UserService, JwtService],
  imports: [CloudinaryModule],
  exports: [UserService],
})
export class UserModule {}
