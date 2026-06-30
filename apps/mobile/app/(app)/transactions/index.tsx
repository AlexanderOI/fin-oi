import { useMemo, useState } from 'react'
import { router } from 'expo-router'
import { AppSafeAreaView } from '@/components/common/app-safe-area-view'
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
import { TransactionPeriod } from '@/features/transactions/actions/transaction.action'

export default function TransactionsScreen() {
  const [showFilterOptions, setShowFilterOptions] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedPeriod, setSelectedPeriod] = useState<TransactionPeriod>('month')

  const filters = useMemo(
    () => ({
      period: selectedPeriod,
      categoryId: selectedCategory,
    }),
    [selectedPeriod, selectedCategory],
  )

  const { transactionsQuery } = useTransactions(filters)
  const { categoriesQuery } = useCategoryQuery()

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
