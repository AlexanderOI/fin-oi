import React from 'react'
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { cn } from '@/lib/cn'
import { FilterChip } from '../../../components/ui/filter-chip'
import { TransactionPeriod } from '@/features/transactions/actions/transaction.action'

interface FilterContainerProps {
  visible: boolean
  children: React.ReactNode
  className?: string
}

export const FilterContainer = ({
  visible,
  children,
  className,
}: FilterContainerProps) => {
  if (!visible) return null

  return <View className={cn('px-5 pb-4', className)}>{children}</View>
}

interface DateFilterProps {
  selectedPeriod: TransactionPeriod
  onPeriodChange: (period: TransactionPeriod) => void
}

export const DateFilter = ({ selectedPeriod, onPeriodChange }: DateFilterProps) => {
  const periods: { key: TransactionPeriod; label: string }[] = [
    { key: 'week', label: 'Semana' },
    { key: 'month', label: 'Mes' },
    { key: 'year', label: 'Año' },
    { key: 'custom', label: 'Personalizado' },
  ]

  return (
    <View className="flex-row mb-4">
      {periods.map(period => (
        <TouchableOpacity
          key={period.key}
          className={cn(
            'py-2 px-3 rounded-full mr-2',
            selectedPeriod === period.key ? 'bg-primary/20' : 'bg-transparent',
          )}
          onPress={() => onPeriodChange(period.key)}
        >
          <Text
            className={cn(
              'text-sm',
              selectedPeriod === period.key
                ? 'text-primary font-semibold'
                : 'text-gray-600',
            )}
          >
            {period.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}

interface CategoryFilterProps {
  categories: Array<{ id: string; name: string; icon?: string }>
  selectedCategory: string
  onCategoryChange: (categoryId: string) => void
}

export const CategoryFilter = ({
  categories,
  selectedCategory,
  onCategoryChange,
}: CategoryFilterProps) => {
  return (
    <View>
      <Text className="text-sm text-gray-600 mb-2">Filtrar por categoría</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
        <FilterChip
          selected={selectedCategory === 'all'}
          onPress={() => onCategoryChange('all')}
        >
          Todas
        </FilterChip>
        {categories.map(category => (
          <FilterChip
            key={category.id}
            selected={selectedCategory === category.id}
            icon={category.icon as any}
            onPress={() => onCategoryChange(category.id)}
          >
            {category.name}
          </FilterChip>
        ))}
      </ScrollView>
    </View>
  )
}
