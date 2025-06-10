import {
  Controller,
  Post,
  Body,
  Patch,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common'
import { FileInterceptor, File } from '@nest-lab/fastify-multer'

import { UserAuth } from '@/types'
import { multerOptions } from '@/cloudinary/config/multer.config'
import { Auth } from '@/auth/decorators/auth.decorator'
import { User } from '@/auth/decorators/user.decorator'

import { UserService } from '@/features/users/user.service'
import { UpdateUserDto } from '@/features/users/dto/update-user.dto'

@Auth()
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Auth()
  @Patch()
  update(@Body() updateUserDto: UpdateUserDto, @User() user: UserAuth) {
    return this.userService.update(user.id, updateUserDto)
  }

  @Auth()
  @Delete()
  delete(@User() user: UserAuth) {
    return this.userService.delete(user.id)
  }

  @Auth()
  @Post('upload-avatar')
  @UseInterceptors(FileInterceptor('file', multerOptions))
  async uploadAvatar(@UploadedFile() file: File, @User() user: UserAuth) {
    return this.userService.uploadAvatar(file, user)
  }
}
