import { View, Text } from 'react-native'

import { cn } from '@/lib/cn'
import { Card } from '@/components/ui/card'
import { IconCard } from '@/components/common/icon-card'

import { Transaction } from '@/features/transactions/interfaces/transaction.interface'

export const TransactionCard = ({ transaction }: { transaction: Transaction }) => (
  <Card className="gap-3">
    <IconCard icon={transaction.icon} color={transaction.color} />
    <View className="flex-1">
      <Text className="text-lg font-bold">{transaction.category}</Text>
      <Text className="text-sm text-gray-500">{transaction.description}</Text>
    </View>
    <View className="items-end">
      <Text
        className={cn(
          'text-lg font-bold',
          transaction.amount >= 0 ? 'text-green-500' : 'text-red-500',
        )}
      >
        {transaction.amount >= 0 ? '+' : ''}
        {transaction.amount}Gs
      </Text>
      <Text className="text-sm text-gray-500">{transaction.date}</Text>
    </View>
  </Card>
)
