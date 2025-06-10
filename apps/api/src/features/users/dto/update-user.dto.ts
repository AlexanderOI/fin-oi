import { IsBoolean, IsOptional, IsString } from 'class-validator'

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  name: string

  @IsString()
  @IsOptional()
  email: string

  @IsString()
  @IsOptional()
  password: string

  @IsString()
  @IsOptional()
  confirmPassword: string

  @IsBoolean()
  @IsOptional()
  isActive: boolean
}
