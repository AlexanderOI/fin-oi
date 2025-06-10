import { UseGuards, applyDecorators } from '@nestjs/common'
import { AuthGuardJwt } from '@/auth/guards/auth.guard'

export function Auth() {
  return applyDecorators(UseGuards(AuthGuardJwt))
}
