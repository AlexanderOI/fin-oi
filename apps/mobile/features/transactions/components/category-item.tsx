import { Ionicons } from '@expo/vector-icons'
import { Text, TouchableOpacity, View } from 'react-native'
import { Category } from '@/features/setting/interfaces/category.interface'
import { cn } from '@/lib/cn'

interface Props {
  category: Category
  isSelected: boolean
  onSelect: () => void
}

export const CategoryItem = ({ category, isSelected, onSelect }: Props) => (
  <TouchableOpacity
    className={cn(
      'items-center mr-4 p-3 rounded-xl border border-slate-200 bg-white w-[100px]',
      isSelected && 'border-transparent',
    )}
    style={isSelected ? { backgroundColor: `${category.color}20`, borderColor: category.color } : undefined}
    onPress={() => onSelect()}
  >
    <View className="w-12 h-12 rounded-full items-center justify-center mb-2" style={{ backgroundColor: category.color }}>
      <Ionicons name={category.icon} size={24} color="#ffffff" />
    </View>
    <Text
      className={cn('text-xs text-slate-500 text-center', isSelected && 'font-medium')}
      style={isSelected ? { color: category.color } : undefined}
    >
      {category.name}
    </Text>
  </TouchableOpacity>
)
