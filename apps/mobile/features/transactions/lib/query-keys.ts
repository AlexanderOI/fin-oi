import { TransactionFilters } from '@/features/transactions/actions/transaction.action'

export const transactionKeys = {
  all: ['transactions'] as const,
  lists: () => [...transactionKeys.all, 'list'] as const,
  list: (filters: TransactionFilters = {}) =>
    [...transactionKeys.lists(), filters] as const,
  summary: () => ['transactions-summary'] as const,
  categories: () => ['expense-categories'] as const,
  detail: (id?: string) => ['transaction', id] as const,
}

export const categoryKeys = {
  all: ['categories'] as const,
  detail: (id?: string) => ['category', id] as const,
}