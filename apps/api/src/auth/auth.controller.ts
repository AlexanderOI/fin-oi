import { Controller, Post, Body, UseGuards, Query, Get } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { UserAuth } from '@/types'
import { RefreshGuardJwt } from '@/auth/guards/refresh.guard'
import { User } from '@/auth/decorators/user.decorator'

import { AuthService } from '@/auth/auth.service'
import { LoginAuthDto } from '@/auth/dto/login.dto'
import { RegisterAuthDto } from '@/auth/dto/register.dto'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() userRegister: RegisterAuthDto) {
    return this.authService.register(userRegister)
  }

  @Post('login')
  login(@Body() userLogin: LoginAuthDto) {
    return this.authService.login(userLogin)
  }

  @UseGuards(RefreshGuardJwt)
  @Post('refresh')
  refresh(@User() req: UserAuth) {
    return this.authService.refreshToken(req)
  }

  @Get('check-user-data')
  checkUserData(@Query() userData: { userName?: string; email?: string }) {
    return this.authService.checkUserData(userData.userName, userData.email)
  }
}
