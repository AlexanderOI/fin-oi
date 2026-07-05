import { Ionicons } from '@expo/vector-icons'

import { apiClient } from '@/lib/api-client'
import { Transaction } from '@/features/transactions/interfaces/transaction.interface'

export interface CreateTransactionProps
  extends Omit<Transaction, 'id' | 'createdAt' | 'updatedAt' | 'category'> {}
export interface UpdateTransactionProps extends Partial<CreateTransactionProps> {}

export type TransactionPeriod = 'week' | 'month' | 'year' | 'custom'

export interface TransactionFilters {
  period?: TransactionPeriod
  categoryId?: string
  startDate?: string
  endDate?: string
}

export const createTransaction = async (transaction: CreateTransactionProps) => {
  const { data } = await apiClient.post<Transaction>('/transactions', transaction)
  return data
}

export const getTransactions = async (filters?: TransactionFilters) => {
  const params: Record<string, string> = {}

  if (filters?.period) {
    params.period = filters.period
  }

  if (filters?.period === 'custom' && filters.startDate && filters.endDate) {
    params.startDate = filters.startDate
    params.endDate = filters.endDate
  }

  if (filters?.categoryId && filters.categoryId !== 'all') {
    params.categoryId = filters.categoryId
  }

  const { data } = await apiClient.get<Transaction[]>('/transactions', { params })
  return data.map(transaction => ({
    ...transaction,
    date: new Date(transaction.date),
  }))
}

export const getTransactionById = async (id?: string) => {
  if (!id) return null
  const { data } = await apiClient.get<Transaction>(`/transactions/${id}`)
  return data
}

export const updateTransaction = async (
  id: string,
  transaction: UpdateTransactionProps,
) => {
  const { data } = await apiClient.put<Transaction>(`/transactions/${id}`, transaction)
  return data
}

export const deleteTransaction = async (id: string) => {
  const { data } = await apiClient.delete<Transaction>(`/transactions/${id}`)
  return data
}

export interface TransactionsSummary {
  income: number
  expense: number
  balance: number
}

export const getTransactionsSummary = async () => {
  const { data } = await apiClient.get<TransactionsSummary>('/transactions/summary')
  return data
}

export interface ExpenseCategorySummary {
  id: string
  name: string
  amount: number
  percentage: number
  color: string
  icon: keyof typeof Ionicons.glyphMap
}

export const getExpenseCategories = async () => {
  const { data } = await apiClient.get<ExpenseCategorySummary[]>('/transactions/categories/summary')
  return data
}
