import { Transform } from 'class-transformer'
import { IsDate, IsEnum, IsOptional, IsString, IsUUID } from 'class-validator'

export class FindTransactionsQueryDto {
  @IsOptional()
  @IsString()
  @IsUUID()
  categoryId?: string

  @IsOptional()
  @IsEnum(['week', 'month', 'year', 'custom'])
  period?: 'week' | 'month' | 'year' | 'custom'

  @IsOptional()
  @Transform(({ value }) => (value ? new Date(value) : undefined))
  @IsDate()
  startDate?: Date

  @IsOptional()
  @Transform(({ value }) => (value ? new Date(value) : undefined))
  @IsDate()
  endDate?: Date
}
