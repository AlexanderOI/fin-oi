import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common'
import { TransactionsService } from './transactions.service'
import { CreateTransactionDto } from './dto/create-transaction.dto'
import { UpdateTransactionDto } from './dto/update-transaction.dto'
import { FindTransactionsQueryDto } from './dto/find-transactions-query.dto'
import { User } from '@/auth/decorators/user.decorator'
import { UserAuth } from '@/types'
import { Auth } from '@/auth/decorators/auth.decorator'

@Auth()
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  create(@Body() createTransactionDto: CreateTransactionDto, @User() user: UserAuth) {
    return this.transactionsService.create(createTransactionDto, user.id)
  }

  @Get()
  findAll(@User() user: UserAuth, @Query() query: FindTransactionsQueryDto) {
    return this.transactionsService.findAll(user.id, query)
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string, @User() user: UserAuth) {
    return this.transactionsService.findOne(id, user.id)
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
    @User() user: UserAuth,
  ) {
    return this.transactionsService.update(id, updateTransactionDto, user.id)
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string, @User() user: UserAuth) {
    return this.transactionsService.remove(id, user.id)
  }
}
