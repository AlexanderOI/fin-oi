import { PartialType } from '@nestjs/swagger'
import { CreateCategoryDto } from '@/features/categories/dto/create-category.dto'

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
