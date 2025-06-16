import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'

import { UserAuth } from '@/types'
import { User } from '@/auth/decorators/user.decorator'
import { Auth } from '@/auth/decorators/auth.decorator'

import { CategoriesService } from '@/features/categories/categories.service'
import { CreateCategoryDto } from '@/features/categories/dto/create-category.dto'
import { UpdateCategoryDto } from '@/features/categories/dto/update-category.dto'

@ApiTags('Categories')
@ApiBearerAuth()
@Auth()
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto, @User() user: UserAuth) {
    return this.categoriesService.create(createCategoryDto, user)
  }

  @Get()
  findAll(@User() user: UserAuth) {
    return this.categoriesService.findAll(user)
  }

  @Get(':id')
  findOne(@Param('id') id: string, @User() user: UserAuth) {
    return this.categoriesService.findOne(id, user)
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
    @User() user: UserAuth,
  ) {
    return this.categoriesService.update(id, updateCategoryDto, user)
  }

  @Delete(':id')
  remove(@Param('id') id: string, @User() user: UserAuth) {
    return this.categoriesService.remove(id, user)
  }
}
