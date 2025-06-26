import { apiClient } from '@/lib/api-client'
import { Transaction } from '@/features/transactions/interfaces/transaction.interface'

export interface CreateTransactionProps
  extends Omit<Transaction, 'id' | 'createdAt' | 'updatedAt' | 'category'> {}
export interface UpdateTransactionProps extends Partial<CreateTransactionProps> {}

export const createTransaction = async (transaction: CreateTransactionProps) => {
  const { data } = await apiClient.post<Transaction>('/transactions', transaction)
  return data
}

export const getTransactions = async () => {
  const { data } = await apiClient.get<Transaction[]>('/transactions')
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
