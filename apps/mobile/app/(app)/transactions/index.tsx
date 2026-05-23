import React, { useState } from 'react'
import { View } from 'react-native'
import { AppSafeAreaView } from '@/components/common/app-safe-area-view'
import { router } from 'expo-router'
import { useTransactions } from '@/features/transactions/hooks/use-transactions'
import { useCategoryQuery } from '@/features/setting/hooks/use-category-query'
import { ScreenHeader } from '@/components/common/screen-header'
import {
  FilterContainer,
  DateFilter,
  CategoryFilter,
} from '@/features/transactions/components/filter-container'
import { TransactionList } from '@/features/transactions/components/transaction-list'
import { FloatingActionButton } from '@/components/ui/floating-action-button'
import { TransactionListSkeleton } from '@/features/transactions/components/loading-skeleton'

export default function TransactionsScreen() {
  const { transactionsQuery } = useTransactions()
  const { categoriesQuery } = useCategoryQuery()

  const [showFilterOptions, setShowFilterOptions] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedPeriod, setSelectedPeriod] = useState('month')

  const isLoading = transactionsQuery.isLoading || categoriesQuery.isLoading

  return (
    <AppSafeAreaView>
      <ScreenHeader
        title="Transacciones"
        rightAction={{
          icon: 'filter',
          onPress: () => setShowFilterOptions(!showFilterOptions),
        }}
      />

      <FilterContainer visible={showFilterOptions}>
        <DateFilter selectedPeriod={selectedPeriod} onPeriodChange={setSelectedPeriod} />
        <CategoryFilter
          categories={categoriesQuery.data ?? []}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
      </FilterContainer>

      {isLoading ? (
        <TransactionListSkeleton count={8} />
      ) : (
        <TransactionList transactions={transactionsQuery.data ?? []} />
      )}

      <FloatingActionButton onPress={() => router.push('/(app)/transactions/new')} />
    </AppSafeAreaView>
  )
}
