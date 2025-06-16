import { Module } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { CategoriesController } from '@/features/categories/categories.controller'
import { CategoriesService } from '@/features/categories/categories.service'

@Module({
  imports: [],
  controllers: [CategoriesController],
  providers: [CategoriesService, JwtService],
})
export class CategoriesModule {}
