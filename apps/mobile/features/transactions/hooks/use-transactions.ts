import { useQuery } from '@tanstack/react-query'
import {
  getTransactions,
  getTransactionsSummary,
  getExpenseCategories,
  TransactionFilters,
} from '@/features/transactions/actions/transaction.action'

export const useTransactions = (filters: TransactionFilters = {}) => {
  const transactionsQuery = useQuery({
    queryKey: ['transactions', filters],
    queryFn: () => getTransactions(filters),
  })

  return {
    transactionsQuery,
  }
}

export const useTransactionsSummary = () => {
  const summaryQuery = useQuery({
    queryKey: ['transactions-summary'],
    queryFn: () => getTransactionsSummary(),
  })

  return { summaryQuery }
}

export const useExpenseCategories = () => {
  const categoriesQuery = useQuery({
    queryKey: ['expense-categories'],
    queryFn: () => getExpenseCategories(),
  })

  return { categoriesQuery }
}
