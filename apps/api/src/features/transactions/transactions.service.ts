import { Injectable, NotFoundException } from '@nestjs/common'
import { and, desc, eq, gte, inArray, lte, sum } from 'drizzle-orm'

import { DrizzleService } from '@/drizzle/drizzle.service'
import { categories, transactions } from '@/drizzle/schema'

import { CreateTransactionDto } from './dto/create-transaction.dto'
import { UpdateTransactionDto } from './dto/update-transaction.dto'
import { FindTransactionsQueryDto } from './dto/find-transactions-query.dto'

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

  private getDateRange(filters?: FindTransactionsQueryDto): { start: Date; end: Date } | null {
    if (!filters?.period) {
      return null
    }

    if (filters.period === 'custom') {
      if (!filters.startDate || !filters.endDate) {
        return null
      }

      const start = new Date(filters.startDate)
      start.setHours(0, 0, 0, 0)

      const end = new Date(filters.endDate)
      end.setHours(23, 59, 59, 999)

      return { start, end }
    }

    const now = new Date()
    const end = new Date(now)
    end.setHours(23, 59, 59, 999)

    let start: Date

    switch (filters.period) {
      case 'week': {
        start = new Date(now)
        const day = start.getDay()
        const diff = day === 0 ? 6 : day - 1
        start.setDate(start.getDate() - diff)
        start.setHours(0, 0, 0, 0)
        break
      }
      case 'month':
        start = new Date(now.getFullYear(), now.getMonth(), 1)
        start.setHours(0, 0, 0, 0)
        break
      case 'year':
        start = new Date(now.getFullYear(), 0, 1)
        start.setHours(0, 0, 0, 0)
        break
      default:
        return null
    }

    return { start, end }
  }

  async findAll(userId: string, filters?: FindTransactionsQueryDto) {
    const conditions = [eq(transactions.userId, userId)]

    if (filters?.categoryId) {
      conditions.push(eq(transactions.categoryId, filters.categoryId))
    }

    const dateRange = this.getDateRange(filters)
    if (dateRange) {
      conditions.push(gte(transactions.date, dateRange.start))
      conditions.push(lte(transactions.date, dateRange.end))
    }

    const result = await this.drizzle.db.query.transactions.findMany({
      where: and(...conditions),
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
