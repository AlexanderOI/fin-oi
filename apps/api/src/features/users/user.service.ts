import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { File } from '@nest-lab/fastify-multer'
import { hash } from 'bcrypt'
import { eq } from 'drizzle-orm'

import { UserAuth } from '@/types'

import { DrizzleService } from '@/drizzle/drizzle.service'
import { users } from '@/drizzle/schema'
import { CloudinaryService } from '@/cloudinary/cloudinary.service'
import { UpdateUserDto } from '@/features/users/dto/update-user.dto'

@Injectable()
export class UserService {
  constructor(
    private readonly cloudinaryService: CloudinaryService,
    private readonly drizzle: DrizzleService,
  ) {}

  async update(id: string, updateUserDto: UpdateUserDto) {
    const { password, confirmPassword, ...userData } = updateUserDto

    if (password && confirmPassword) {
      if (password !== confirmPassword) {
        throw new BadRequestException('Passwords do not match')
      }

      userData['password'] = await hash(password, 10)
    }

    const [updatedUser] = await this.drizzle.db
      .update(users)
      .set({ ...userData })
      .where(eq(users.id, id))
      .returning()

    if (!updatedUser) throw new NotFoundException('User not found')

    return updatedUser
  }

  async delete(id: string) {
    const [user] = await this.drizzle.db.delete(users).where(eq(users.id, id)).returning()

    if (!user) throw new NotFoundException('User not found')

    return 'User deleted'
  }

  async uploadAvatar(file: File, user: UserAuth): Promise<{ url: string }> {
    const avatarUrl = await this.cloudinaryService.uploadAvatar(file)

    await this.drizzle.db
      .update(users)
      .set({ avatar: avatarUrl })
      .where(eq(users.id, user.id))

    return { url: avatarUrl }
  }
}
