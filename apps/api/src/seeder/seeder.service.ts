import { Injectable } from '@nestjs/common'
import { hash } from 'bcrypt'

import { PrismaService } from '@/prisma/prisma.service'

import { userSeeder } from '@/seeder/data/user.data'
import { categoryData } from '@/seeder/data/category.data'

@Injectable()
export class SeederService {
  constructor(private readonly prisma: PrismaService) {}

  async seed() {
    await this.delete()
    const user = await this.createUser()
    await this.createCategories(user.id)
  }

  async createUser() {
    const user = await this.prisma.user.create({
      data: {
        ...userSeeder,
        password: await hash(userSeeder.password, 10),
      },
    })

    return user
  }

  async createCategories(userId: string) {
    const categories = await this.prisma.category.createMany({
      data: categoryData.map(category => ({
        ...category,
        userId,
      })),
    })
  }

  async delete() {
    const notifications = await this.prisma.notification.deleteMany()
    const categories = await this.prisma.category.deleteMany()
    const transactions = await this.prisma.transaction.deleteMany()
    const users = await this.prisma.user.deleteMany()
  }
}
