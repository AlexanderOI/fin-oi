import { View, Text } from 'react-native'

import { cn } from '@/lib/cn'
import { Card } from '@/components/ui/card'
import { IconCard } from '@/components/common/icon-card'

import { Transaction } from '@/features/transactions/interfaces/transaction.interface'
import { formatDate } from '@/lib/format-date'

export const TransactionCard = ({ transaction }: { transaction: Transaction }) => (
  <Card className="gap-3">
    <IconCard icon={transaction.category.icon} color={transaction.category.color} />
    <View className="flex-1">
      <Text className="text-lg font-bold">{transaction.category.name}</Text>
      <Text className="text-sm text-gray-500" numberOfLines={1}>
        {transaction.description}
      </Text>
    </View>
    <View className="items-end">
      <Text
        className={cn(
          'text-lg font-bold',
          transaction.type === 'income' ? 'text-green-500' : 'text-red-500',
        )}
      >
        {transaction.type === 'income' ? '+' : '-'}
        {transaction.amount}Gs
      </Text>
      <Text className="text-sm text-gray-500">{formatDate(transaction.date)}</Text>
    </View>
  </Card>
)
