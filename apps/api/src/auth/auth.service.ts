import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { hash, compare } from 'bcrypt'
import { eq } from 'drizzle-orm'

import { UserAuth } from '@/types'
import { DrizzleService } from '@/drizzle/drizzle.service'
import { users } from '@/drizzle/schema'
import { UserPayload } from '@/auth/interfaces/user-payload.interface'

import { RegisterAuthDto } from '@/auth/dto/register.dto'
import { LoginAuthDto } from '@/auth/dto/login.dto'

@Injectable()
export class AuthService {
  constructor(
    private jwtAuthService: JwtService,
    private readonly drizzle: DrizzleService,
  ) {}

  async register(userRegister: RegisterAuthDto) {
    const { password, email, username } = userRegister
    const passwordHash = await hash(password, 10)
    const userToCreate = { ...userRegister, password: passwordHash }

    const [existingUserByEmail] = await this.drizzle.db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1)

    if (existingUserByEmail) {
      throw new ConflictException({
        email: [`A user with email: ${email} already exists`],
      })
    }

    const [existsUserByName] = await this.drizzle.db
      .select()
      .from(users)
      .where(eq(users.username, username))
      .limit(1)

    if (existsUserByName) {
      throw new ConflictException({
        username: [`A user with username: ${username} already exists`],
      })
    }

    await this.drizzle.db.insert(users).values(userToCreate)

    return { message: 'User registered successfully' }
  }

  async login(userLogin: LoginAuthDto) {
    const { username, password } = userLogin

    const [user] = await this.drizzle.db
      .select()
      .from(users)
      .where(eq(users.username, username))
      .limit(1)

    if (!user) throw new NotFoundException('User does not exist')

    const checkPassword = await compare(password, user.password)
    if (!checkPassword) throw new UnauthorizedException('Incorrect password, try again')

    const payload = await this.createUserPayload(user.id)

    return {
      user: payload,
      backendTokens: {
        accessToken: await this.jwtAuthService.signAsync(payload, {
          expiresIn: '1h',
          secret: process.env.JWT_SECRET_ACCESS,
        }),
        refreshToken: await this.jwtAuthService.signAsync(payload, {
          expiresIn: '7d',
          secret: process.env.JWT_SECRET_REFRESH,
        }),
        expiresIn: new Date().getTime() + 60 * 60 * 1000,
      },
    }
  }

  async refreshToken(user: UserAuth) {
    const payload = await this.createUserPayload(user.id)

    return {
      accessToken: await this.jwtAuthService.signAsync(payload, {
        expiresIn: '1h',
        secret: process.env.JWT_SECRET_ACCESS,
      }),
      refreshToken: await this.jwtAuthService.signAsync(payload, {
        expiresIn: '7d',
        secret: process.env.JWT_SECRET_REFRESH,
      }),
      expiresIn: new Date().getTime() + 60 * 60 * 1000,
    }
  }

  async checkUserData(username?: string, email?: string) {
    if (username) {
      const [user] = await this.drizzle.db
        .select()
        .from(users)
        .where(eq(users.username, username))
        .limit(1)

      if (user) throw new ConflictException({ username: 'User already exists' })
    }

    if (email) {
      const [userByEmail] = await this.drizzle.db
        .select()
        .from(users)
        .where(eq(users.email, email))
        .limit(1)

      if (userByEmail) throw new ConflictException({ email: 'Email already exists' })
    }

    return { message: 'User data is valid' }
  }

  async createUserPayload(userId: string): Promise<UserPayload> {
    const [user] = await this.drizzle.db
      .select()
      .from(users)
      .where(eq(users.id, userId))
      .limit(1)

    if (!user) throw new NotFoundException('User does not exist')

    const { name, username, email, id, avatar } = user

    const userDataPayload = {
      id: id.toString(),
      name,
      username,
      email,
      avatar,
    }

    return userDataPayload
  }
}
