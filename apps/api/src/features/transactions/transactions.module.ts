import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { TransactionsController } from '@/features/transactions/transactions.controller'
import { TransactionsService } from '@/features/transactions/transactions.service'

@Module({
  imports: [JwtModule],
  controllers: [TransactionsController],
  providers: [TransactionsService],
})
export class TransactionsModule {}
