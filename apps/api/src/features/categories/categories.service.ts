import { Injectable, NotFoundException } from '@nestjs/common'
import { and, asc, eq } from 'drizzle-orm'

import { DrizzleService } from '@/drizzle/drizzle.service'
import { categories } from '@/drizzle/schema'
import { UserAuth } from '@/types'

import { CreateCategoryDto } from '@/features/categories/dto/create-category.dto'
import { UpdateCategoryDto } from '@/features/categories/dto/update-category.dto'

@Injectable()
export class CategoriesService {
  constructor(private drizzle: DrizzleService) {}

  async create(createCategoryDto: CreateCategoryDto, user: UserAuth) {
    const [category] = await this.drizzle.db
      .insert(categories)
      .values({
        ...createCategoryDto,
        userId: user.id,
      })
      .returning()

    return category
  }

  findAll(user: UserAuth) {
    return this.drizzle.db.query.categories.findMany({
      where: eq(categories.userId, user.id),
      orderBy: asc(categories.name),
    })
  }

  async findOne(id: string, user: UserAuth) {
    const [category] = await this.drizzle.db
      .select()
      .from(categories)
      .where(and(eq(categories.id, id), eq(categories.userId, user.id)))
      .limit(1)

    if (!category) {
      throw new NotFoundException('Category not found')
    }

    return category
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto, user: UserAuth) {
    const [category] = await this.drizzle.db
      .update(categories)
      .set(updateCategoryDto)
      .where(and(eq(categories.id, id), eq(categories.userId, user.id)))
      .returning()

    if (!category) {
      throw new NotFoundException('Category not found')
    }

    return category
  }

  async remove(id: string, user: UserAuth) {
    const category = await this.findOne(id, user)

    const [deletedCategory] = await this.drizzle.db
      .delete(categories)
      .where(eq(categories.id, category.id))
      .returning()

    return deletedCategory
  }
}
