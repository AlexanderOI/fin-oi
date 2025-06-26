import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  createTransaction,
  CreateTransactionProps,
  deleteTransaction,
  getTransactionById,
  getTransactions,
  updateTransaction,
  UpdateTransactionProps,
} from '@/features/transactions/actions/transaction.action'

export const useTransactions = (id?: string) => {
  const queryClient = useQueryClient()

  const transactionQuery = useQuery({
    queryKey: ['transaction', id],
    queryFn: () => getTransactionById(id),
  })

  const transactionsQuery = useQuery({
    queryKey: ['transactions'],
    queryFn: () => getTransactions(),
  })

  const invalidateTransactionQuery = () => {
    queryClient.invalidateQueries({ queryKey: ['transaction', id] })
    queryClient.invalidateQueries({ queryKey: ['transactions'] })
  }

  const createTransactionMutation = useMutation({
    mutationFn: (transaction: CreateTransactionProps) => createTransaction(transaction),
    onSuccess: invalidateTransactionQuery,
  })

  const updateTransactionMutation = useMutation({
    mutationFn: ({
      id,
      transaction,
    }: {
      id: string
      transaction: UpdateTransactionProps
    }) => updateTransaction(id, transaction),
    onSuccess: invalidateTransactionQuery,
  })

  const deleteTransactionMutation = useMutation({
    mutationFn: (id: string) => deleteTransaction(id),
    onSuccess: invalidateTransactionQuery,
  })

  const handleCreateTransaction = (transaction: CreateTransactionProps) => {
    createTransactionMutation.mutate(transaction)
  }

  const handleUpdateTransaction = (id: string, transaction: UpdateTransactionProps) => {
    updateTransactionMutation.mutate({ id, transaction })
  }

  const handleDeleteTransaction = (id: string) => {
    deleteTransactionMutation.mutate(id)
  }

  const mutateError =
    createTransactionMutation.error ||
    updateTransactionMutation.error ||
    deleteTransactionMutation.error

  return {
    transactionQuery,
    transactionsQuery,
    createTransactionMutation,
    updateTransactionMutation,
    deleteTransactionMutation,
    handleCreateTransaction,
    handleUpdateTransaction,
    handleDeleteTransaction,
    mutateError,
  }
}
