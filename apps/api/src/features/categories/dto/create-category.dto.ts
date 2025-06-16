import { IsNotEmpty, IsString, MinLength } from 'class-validator'

export class CreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  name: string

  @IsNotEmpty()
  @IsString()
  color: string

  @IsNotEmpty()
  @IsString()
  icon: string
}
