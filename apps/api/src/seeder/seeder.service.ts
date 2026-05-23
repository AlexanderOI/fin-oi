import { Injectable } from '@nestjs/common'
import { hash } from 'bcrypt'

import { DrizzleService } from '@/drizzle/drizzle.service'
import { categories, notifications, transactions, users } from '@/drizzle/schema'

import { userSeeder } from '@/seeder/data/user.data'
import { categoryData } from '@/seeder/data/category.data'

@Injectable()
export class SeederService {
  constructor(private readonly drizzle: DrizzleService) {}

  async seed() {
    await this.delete()
    const user = await this.createUser()
    await this.createCategories(user.id)
  }

  async createUser() {
    const [user] = await this.drizzle.db
      .insert(users)
      .values({
        ...userSeeder,
        password: await hash(userSeeder.password, 10),
      })
      .returning()

    return user
  }

  async createCategories(userId: string) {
    await this.drizzle.db.insert(categories).values(
      categoryData.map(category => ({
        ...category,
        userId,
      })),
    )
  }

  async delete() {
    await this.drizzle.db.delete(notifications)
    await this.drizzle.db.delete(transactions)
    await this.drizzle.db.delete(categories)
    await this.drizzle.db.delete(users)
  }
}
