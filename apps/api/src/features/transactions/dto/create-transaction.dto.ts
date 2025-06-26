import { Transform } from 'class-transformer'
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class CreateTransactionDto {
  @IsNumber()
  amount: number

  @IsString()
  @IsEnum(['income', 'expense'])
  type: 'income' | 'expense'

  @IsString()
  @IsNotEmpty()
  categoryId: string

  @IsString()
  @IsOptional()
  description?: string

  @Transform(({ value }) => new Date(value))
  @IsDate()
  date: Date
}
