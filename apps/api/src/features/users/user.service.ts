import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { File } from '@nest-lab/fastify-multer'
import { hash } from 'bcrypt'

import { UserAuth } from '@/types'

import { PrismaService } from '@/prisma/prisma.service'
import { CloudinaryService } from '@/cloudinary/cloudinary.service'
import { UpdateUserDto } from '@/features/users/dto/update-user.dto'

@Injectable()
export class UserService {
  constructor(
    private readonly cloudinaryService: CloudinaryService,
    private readonly prisma: PrismaService,
  ) {}

  async update(id: string, updateUserDto: UpdateUserDto) {
    const { password, confirmPassword, ...userData } = updateUserDto

    if (password && confirmPassword) {
      if (password !== confirmPassword) {
        throw new BadRequestException('Passwords do not match')
      }

      userData['password'] = await hash(password, 10)
    }

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: { ...userData },
    })

    if (!updatedUser) throw new NotFoundException('User not found')

    return updatedUser
  }

  async delete(id: string) {
    const user = await this.prisma.user.delete({
      where: { id },
    })

    if (!user) throw new NotFoundException('User not found')

    return 'User deleted'
  }

  async uploadAvatar(file: File, user: UserAuth): Promise<{ url: string }> {
    const avatarUrl = await this.cloudinaryService.uploadAvatar(file)

    await this.prisma.user.update({
      where: { id: user.id },
      data: { avatar: avatarUrl },
    })

    return { url: avatarUrl }
  }
}
