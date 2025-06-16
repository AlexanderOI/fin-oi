import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '@/prisma/prisma.service'
import { UserAuth } from '@/types'

import { CreateCategoryDto } from '@/features/categories/dto/create-category.dto'
import { UpdateCategoryDto } from '@/features/categories/dto/update-category.dto'

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  create(createCategoryDto: CreateCategoryDto, user: UserAuth) {
    return this.prisma.category.create({
      data: {
        ...createCategoryDto,
        userId: user.id,
      },
    })
  }

  findAll(user: UserAuth) {
    return this.prisma.category.findMany({
      where: {
        userId: user.id,
      },
    })
  }

  findOne(id: string, user: UserAuth) {
    const category = this.prisma.category.findUnique({
      where: {
        id,
        userId: user.id,
      },
    })

    if (!category) {
      throw new NotFoundException('Category not found')
    }

    return category
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto, user: UserAuth) {
    const category = await this.prisma.category.update({
      where: {
        id,
        userId: user.id,
      },
      data: updateCategoryDto,
    })

    if (!category) {
      throw new NotFoundException('Category not found')
    }

    return category
  }

  async remove(id: string, user: UserAuth) {
    const category = await this.findOne(id, user)

    return this.prisma.category.delete({
      where: {
        id: category?.id,
      },
    })
  }
}
