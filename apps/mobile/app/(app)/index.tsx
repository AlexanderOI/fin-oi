import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { router } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

import { formatNumber } from '@/lib/format-number'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { TransactionCard } from '@/features/transactions/components/transaction-card'
import {
  useTransactions,
  useTransactionsSummary,
  useExpenseCategories,
} from '@/features/transactions/hooks/use-transactions'
import { CategoryRankingItem } from '@/features/summary/category-ranking-Item'
import { AppSafeAreaView } from '@/components/common/app-safe-area-view'

const date = new Date().toLocaleDateString('es-ES', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
})

export default function DashboardScreen() {
  const { user } = useAuth()
  const { transactionsQuery } = useTransactions()
  const { summaryQuery } = useTransactionsSummary()
  const { categoriesQuery } = useExpenseCategories()

  return (
    <AppSafeAreaView>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View className="flex-row justify-between items-center px-5 pt-4 pb-2">
          <View>
            <Text className="text-[22px] font-bold text-slate-800">
              Hola, {user?.username}
            </Text>
            <Text className="text-sm text-slate-500">{date}</Text>
          </View>
          <TouchableOpacity className="w-11 h-11 rounded-full items-center justify-center">
            <Ionicons name="person-circle-outline" size={40} color="#6366f1" />
          </TouchableOpacity>
        </View>

        {/* Balance Card */}
        <View className="bg-indigo-500 rounded-[20px] mx-5 mt-4 mb-6 p-5">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-base text-slate-100 opacity-90">Balance Total</Text>
            <TouchableOpacity>
              <Ionicons name="eye-outline" size={24} color="#f8fafc" />
            </TouchableOpacity>
          </View>
          <Text className="text-[32px] font-bold text-white mb-6">
            {formatNumber(summaryQuery.data?.balance ?? 0)} ₲
          </Text>
          <View className="flex-row justify-between items-center">
            <View className="flex-row items-center flex-1">
              <Ionicons name="arrow-up-circle-outline" size={24} color="#84cc16" />
              <View className="ml-3">
                <Text className="text-sm text-slate-100 opacity-90">Ingresos</Text>
                <Text className="text-base font-semibold text-white">
                  {formatNumber(summaryQuery.data?.income ?? 0)} ₲
                </Text>
              </View>
            </View>

            <View className="w-px h-10 bg-slate-100 opacity-20 mx-5" />

            <View className="flex-row items-center flex-1">
              <Ionicons name="arrow-down-circle-outline" size={24} color="#f43f5e" />
              <View className="ml-3">
                <Text className="text-sm text-slate-100 opacity-90">Gastos</Text>
                <Text className="text-base font-semibold text-white">
                  {formatNumber(summaryQuery.data?.expense ?? 0)} ₲
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View className="flex-row justify-between items-center px-5 mb-4">
          <Text className="text-lg font-semibold text-slate-800">Gastos por Categoría</Text>
          <TouchableOpacity onPress={() => router.push('/summary')}>
            <Text className="text-sm text-indigo-500">Ver todo</Text>
          </TouchableOpacity>
        </View>

        <View className="bg-white rounded-[20px] mx-5 mb-6 p-4 shadow-sm">
          {categoriesQuery.data?.slice(0, 5).map((category, index) => (
            <CategoryRankingItem key={category.id} category={category} index={index} />
          ))}
        </View>

        <View className="flex-row justify-between items-center px-5 mb-4">
          <Text className="text-lg font-semibold text-slate-800">
            Transacciones Recientes
          </Text>
          <TouchableOpacity onPress={() => router.push('/transactions')}>
            <Text className="text-sm text-indigo-500">Ver todo</Text>
          </TouchableOpacity>
        </View>

        <View className="px-5">
          {transactionsQuery.data?.map(transaction => (
            <TransactionCard key={transaction.id} transaction={transaction} />
          ))}
        </View>

        <View className="h-24" />
      </ScrollView>

      <TouchableOpacity
        className="absolute bottom-6 right-6 w-14 h-14 rounded-full bg-indigo-500 items-center justify-center"
        onPress={() => router.push('/(app)/transactions/new')}
        activeOpacity={0.8}
      >
        <Ionicons name="add" size={28} color="#ffffff" />
      </TouchableOpacity>
    </AppSafeAreaView>
  )
}
