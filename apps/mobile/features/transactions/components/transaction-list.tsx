import React from 'react'
import { FlatList, View, Text } from 'react-native'
import { Transaction } from '@/features/transactions/interfaces/transaction.interface'
import { TransactionCard } from '@/features/transactions/components/transaction-card'
import { EmptyState } from '../../../components/ui/empty-state'
import { cn } from '@/lib/cn'

interface Props {
  transactions: Transaction[]
  className?: string
}

const groupTransactionsByDate = (transactions: Transaction[]) => {
  const grouped: Record<string, Transaction[]> = {}

  transactions.forEach(transaction => {
    if (!grouped[transaction.date.toISOString()]) {
      grouped[transaction.date.toISOString()] = []
    }
    grouped[transaction.date.toISOString()].push(transaction)
  })

  return Object.entries(grouped).map(([date, transactions]) => ({
    date: new Date(date),
    data: transactions,
  }))
}

export const TransactionList = ({ transactions, className }: Props) => {
  const groupedTransactions = groupTransactionsByDate(transactions)

  return (
    <FlatList
      className={cn('flex-1 px-5', className)}
      data={groupedTransactions}
      keyExtractor={item => item.date.toISOString()}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => (
        <View className="mb-4">
          <Text className="text-sm text-gray-600 mb-2">
            {item.date.toLocaleDateString()}
          </Text>
          {item.data.map(transaction => (
            <TransactionCard key={transaction.id} transaction={transaction} />
          ))}
        </View>
      )}
      ListEmptyComponent={
        <EmptyState
          title="No hay transacciones que mostrar"
          description="Agrega tu primera transacción para comenzar"
        />
      }
    />
  )
}
