import { Module } from '@nestjs/common'

import { AppService } from '@/app.service'
import { AppController } from '@/app.controller'

import { AuthModule } from '@/auth/auth.module'
import { PrismaModule } from '@/prisma/prisma.module'

import { UserModule } from '@/features/users/user.module'
import { TransactionsModule } from '@/features/transactions/transactions.module'
import { CategoriesModule } from '@/features/categories/categories.module'
import { SeederModule } from '@/seeder/seeder.module'

@Module({
  imports: [
    PrismaModule,
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
