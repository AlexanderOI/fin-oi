import { IsBoolean, IsOptional, IsString, Matches } from 'class-validator'

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  name: string

  @IsString()
  @IsOptional()
  @Matches(/^\S*$/)
  username: string

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
