import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { join } from 'path'

import { AppService } from '@/app.service'
import { AppController } from '@/app.controller'

import { AuthModule } from '@/auth/auth.module'
import { DrizzleModule } from '@/drizzle/drizzle.module'

import { UserModule } from '@/features/users/user.module'
import { TransactionsModule } from '@/features/transactions/transactions.module'
import { CategoriesModule } from '@/features/categories/categories.module'
import { SeederModule } from '@/seeder/seeder.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: join(__dirname, '..', '.env'),
    }),
    DrizzleModule,
    AuthModule,
    UserModule,
    TransactionsModule,
    CategoriesModule,
    SeederModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
