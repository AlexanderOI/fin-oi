import { Injectable, NotFoundException } from '@nestjs/common'
import { and, desc, eq, inArray, sum } from 'drizzle-orm'

import { DrizzleService } from '@/drizzle/drizzle.service'
import { categories, transactions } from '@/drizzle/schema'

import { CreateTransactionDto } from './dto/create-transaction.dto'
import { UpdateTransactionDto } from './dto/update-transaction.dto'

@Injectable()
export class TransactionsService {
  constructor(private drizzle: DrizzleService) {}

  async create(createTransactionDto: CreateTransactionDto, userId: string) {
    const [transaction] = await this.drizzle.db
      .insert(transactions)
      .values({
        ...createTransactionDto,
        userId,
      })
      .returning()

    return transaction
  }

  async findAll(userId: string) {
    const result = await this.drizzle.db.query.transactions.findMany({
      where: eq(transactions.userId, userId),
      with: {
        category: {
          columns: {
            name: true,
            icon: true,
            color: true,
          },
        },
      },
      orderBy: desc(transactions.date),
    })

    if (!result) {
      throw new NotFoundException('Transactions not found')
    }

    return result
  }

  async findOne(id: string, userId: string) {
    const [transaction] = await this.drizzle.db
      .select()
      .from(transactions)
      .where(and(eq(transactions.id, id), eq(transactions.userId, userId)))
      .limit(1)

    if (!transaction) {
      throw new NotFoundException('Transaction not found')
    }

    return transaction
  }

  async update(id: string, updateTransactionDto: UpdateTransactionDto, userId: string) {
    await this.findOne(id, userId)

    const [updatedTransaction] = await this.drizzle.db
      .update(transactions)
      .set(updateTransactionDto)
      .where(eq(transactions.id, id))
      .returning()

    return updatedTransaction
  }

  async remove(id: string, userId: string) {
    await this.findOne(id, userId)

    const [deletedTransaction] = await this.drizzle.db
      .delete(transactions)
      .where(eq(transactions.id, id))
      .returning()

    return deletedTransaction
  }

  async getTotalExpenseTransactions(userId: string) {
    const [totalTransactions] = await this.drizzle.db
      .select({ amount: sum(transactions.amount) })
      .from(transactions)
      .where(and(eq(transactions.userId, userId), eq(transactions.type, 'expense')))

    return { _sum: { amount: totalTransactions?.amount ?? null } }
  }

  async totalExpensePerCategory(userId: string) {
    const totalPerCategory = await this.drizzle.db
      .select({
        categoryId: transactions.categoryId,
        total: sum(transactions.amount),
      })
      .from(transactions)
      .where(and(eq(transactions.userId, userId), eq(transactions.type, 'expense')))
      .groupBy(transactions.categoryId)

    const categoryIds = totalPerCategory
      .map(item => item.categoryId)
      .filter((id): id is string => id !== null)

    const categoryRows = await this.drizzle.db
      .select({
        id: categories.id,
        name: categories.name,
        icon: categories.icon,
        color: categories.color,
      })
      .from(categories)
      .where(inArray(categories.id, categoryIds))

    const result = totalPerCategory.map(item => {
      const category = categoryRows.find(cat => cat.id === item.categoryId)
      return {
        name: category?.name || 'Desconocido',
        icon: category?.icon || 'default',
        color: category?.color || '#000000',
        total: Number(item.total) || 0,
      }
    })

    return result
  }
}
