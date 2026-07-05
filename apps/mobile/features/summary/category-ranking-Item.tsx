import { View, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import { formatNumber } from '@/lib/format-number'
import { CategoryRanking } from '../transactions/interfaces/category.interfaces'

interface Props {
  category: CategoryRanking
  index: number
}

export const CategoryRankingItem = ({ category, index }: Props) => (
  <View className="flex-row items-center py-3 border-b border-slate-100">
    <View className="w-6 h-6 rounded-full bg-slate-100 items-center justify-center mr-3">
      <Text className="text-xs font-semibold text-slate-500">{index + 1}</Text>
    </View>

    <View
      className="w-7 h-7 rounded-lg items-center justify-center mr-3"
      style={{ backgroundColor: category.color }}
    >
      <Ionicons name={category.icon} size={16} color="#ffffff" />
    </View>

    <View className="mr-3" style={{ flex: 1 }}>
      <Text className="text-sm font-medium text-slate-800 mb-1">{category.name}</Text>
      <View className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <View
          className="h-full rounded-full"
          style={{ width: `${category.percentage}%`, backgroundColor: category.color }}
        />
      </View>
    </View>

    <View className="items-end">
      <Text className="text-sm font-semibold text-slate-800">
        {formatNumber(category.amount)} ₲
      </Text>
      <Text className="text-xs text-slate-500">{category.percentage}%</Text>
    </View>
  </View>
)
