import { useQuery } from '@tanstack/react-query'
import {
  getTransactions,
  getTransactionsSummary,
  getExpenseCategories,
  TransactionFilters,
} from '@/features/transactions/actions/transaction.action'
import { transactionKeys } from '@/features/transactions/lib/query-keys'

export const useTransactions = (filters: TransactionFilters = {}) => {
  const transactionsQuery = useQuery({
    queryKey: transactionKeys.list(filters),
    queryFn: () => getTransactions(filters),
  })

  return {
    transactionsQuery,
  }
}

export const useTransactionsSummary = () => {
  const summaryQuery = useQuery({
    queryKey: transactionKeys.summary(),
    queryFn: () => getTransactionsSummary(),
  })

  return { summaryQuery }
}

export const useExpenseCategories = () => {
  const categoriesQuery = useQuery({
    queryKey: transactionKeys.categories(),
    queryFn: () => getExpenseCategories(),
  })

  return { categoriesQuery }
}
