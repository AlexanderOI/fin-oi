import { useQuery } from '@tanstack/react-query'
import {
  getTransactions,
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
