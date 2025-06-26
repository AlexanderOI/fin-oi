import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '@/prisma/prisma.service'

import { CreateTransactionDto } from './dto/create-transaction.dto'
import { UpdateTransactionDto } from './dto/update-transaction.dto'

@Injectable()
export class TransactionsService {
  constructor(private prisma: PrismaService) {}

  create(createTransactionDto: CreateTransactionDto, userId: string) {
    return this.prisma.transaction.create({
      data: {
        ...createTransactionDto,
        userId,
      },
    })
  }

  findAll(userId: string) {
    const transactions = this.prisma.transaction.findMany({
      where: {
        userId,
      },
      include: {
        category: {
          select: {
            name: true,
            icon: true,
            color: true,
          },
        },
      },
      orderBy: {
        date: 'desc',
      },
    })

    if (!transactions) {
      throw new NotFoundException('Transactions not found')
    }

    return transactions
  }

  findOne(id: string, userId: string) {
    const transaction = this.prisma.transaction.findUnique({
      where: {
        id,
        userId,
      },
    })

    if (!transaction) {
      throw new NotFoundException('Transaction not found')
    }

    return transaction
  }

  async update(id: string, updateTransactionDto: UpdateTransactionDto, userId: string) {
    await this.findOne(id, userId)

    const updatedTransaction = await this.prisma.transaction.update({
      where: { id },
      data: updateTransactionDto,
    })

    return updatedTransaction
  }

  async remove(id: string, userId: string) {
    await this.findOne(id, userId)

    const deletedTransaction = await this.prisma.transaction.delete({
      where: { id },
    })

    return deletedTransaction
  }

  async getTotalExpenseTransactions(userId: string) {
    const totalTransactions = await this.prisma.transaction.aggregate({
      where: {
        userId,
        type: 'expense',
      },
      _sum: {
        amount: true,
      },
    })

    return totalTransactions
  }

  async totalExpensePerCategory(userId: string) {
    const totalPerCategory = await this.prisma.transaction.groupBy({
      by: ['categoryId'],
      where: {
        userId,
        type: 'expense',
      },
      _sum: {
        amount: true,
      },
    })

    const categoryIds = totalPerCategory
      .map(item => item.categoryId)
      .filter(id => id !== null)

    const categories = await this.prisma.category.findMany({
      where: {
        id: {
          in: categoryIds,
        },
      },
      select: {
        id: true,
        name: true,
        icon: true,
        color: true,
      },
    })

    // Combinar los datos
    const result = totalPerCategory.map(item => {
      const category = categories.find(cat => cat.id === item.categoryId)
      return {
        name: category?.name || 'Desconocido',
        icon: category?.icon || 'default',
        color: category?.color || '#000000',
        total: item._sum.amount || 0,
      }
    })

    return result
  }
}
