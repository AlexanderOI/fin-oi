import React, { useState } from 'react'
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import { BarChart } from '@/features/summary/bar-chart'
import { CategoryRankingItem } from '@/features/summary/category-ranking-Item'
import { MonthlyData } from '@/features/dashboard/interface/data.interface'
import { ScreenHeader } from '@/components/common/screen-header'
import { AppSafeAreaView } from '@/components/common/app-safe-area-view'
import { useExpenseCategories } from '@/features/transactions/hooks/use-transactions'
import { cn } from '@/lib/cn'

const monthlyData: MonthlyData[] = [
  { month: 'Ene', income: 2500, expenses: 1800 },
  { month: 'Feb', income: 2600, expenses: 1750 },
  { month: 'Mar', income: 2400, expenses: 2200 },
  { month: 'Abr', income: 3100, expenses: 2100 },
  { month: 'May', income: 2800, expenses: 2300 },
  { month: 'Jun', income: 3200, expenses: 2150 },
]

export default function SummaryScreen() {
  const [selectedPeriod, setSelectedPeriod] = useState<'3months' | '6months' | '1year'>(
    '6months',
  )
  const { categoriesQuery } = useExpenseCategories()

  return (
    <AppSafeAreaView>
      <ScreenHeader title="Resumen" rightAction={{ icon: 'calendar-outline' }} />
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View className="bg-white rounded-[20px] mx-5 mb-6 p-5 shadow-sm">
          <View className="flex-row justify-between bg-slate-100 rounded-xl p-1 mb-5">
            <TouchableOpacity
              className={cn(
                'py-2 items-center rounded-lg',
                selectedPeriod === '3months' && 'bg-white shadow-sm',
              )}
              style={{ flex: 1 }}
              onPress={() => setSelectedPeriod('3months')}
            >
              <Text
                className={cn(
                  'text-sm font-medium text-slate-500',
                  selectedPeriod === '3months' && 'text-slate-800',
                )}
              >
                3 Meses
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className={cn(
                'py-2 items-center rounded-lg',
                selectedPeriod === '6months' && 'bg-white shadow-sm',
              )}
              style={{ flex: 1 }}
              onPress={() => setSelectedPeriod('6months')}
            >
              <Text
                className={cn(
                  'text-sm font-medium text-slate-500',
                  selectedPeriod === '6months' && 'text-slate-800',
                )}
              >
                6 Meses
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className={cn(
                'py-2 items-center rounded-lg',
                selectedPeriod === '1year' && 'bg-white shadow-sm',
              )}
              style={{ flex: 1 }}
              onPress={() => setSelectedPeriod('1year')}
            >
              <Text
                className={cn(
                  'text-sm font-medium text-slate-500',
                  selectedPeriod === '1year' && 'text-slate-800',
                )}
              >
                1 Año
              </Text>
            </TouchableOpacity>
          </View>

          <View className="flex-row justify-between">
            <View className="items-center">
              <Text className="text-sm text-slate-500 mb-2">Ingresos</Text>
              <Text className="text-xl font-bold mb-1 text-lime-500">+15,800€</Text>
              <Text className="text-xs text-slate-500">+12% vs. prev</Text>
            </View>

            <View className="items-center">
              <Text className="text-sm text-slate-500 mb-2">Gastos</Text>
              <Text className="text-xl font-bold mb-1 text-rose-500">-11,100€</Text>
              <Text className="text-xs text-slate-500">-3% vs. prev</Text>
            </View>

            <View className="items-center">
              <Text className="text-sm text-slate-500 mb-2">Ahorro</Text>
              <Text className="text-xl font-bold mb-1 text-sky-500">4,700€</Text>
              <Text className="text-xs text-slate-500">+18% vs. prev</Text>
            </View>
          </View>
        </View>

        <View className="flex-row justify-between items-center px-5 mb-3">
          <Text className="text-lg font-bold text-slate-800">Ingresos vs. Gastos</Text>
          <TouchableOpacity>
            <Text className="text-sm text-indigo-500 font-medium">Ver detalle</Text>
          </TouchableOpacity>
        </View>

        <View className="bg-white rounded-[20px] mx-5 mb-6 p-5 shadow-sm">
          <BarChart data={monthlyData} />
        </View>

        <View className="flex-row justify-between items-center px-5 mb-3">
          <Text className="text-lg font-bold text-slate-800">Principales Categorías</Text>
          <TouchableOpacity>
            <Text className="text-sm text-indigo-500 font-medium">Ver todo</Text>
          </TouchableOpacity>
        </View>

        <View className="bg-white rounded-[20px] mx-5 mb-6 p-4 shadow-sm">
          {categoriesQuery.data?.map((category, index) => (
            <CategoryRankingItem key={category.id} category={category} index={index} />
          ))}
        </View>

        <View className="flex-row justify-between items-center px-5 mb-3">
          <Text className="text-lg font-bold text-slate-800">Progresión Anual</Text>
        </View>

        <View className="bg-white rounded-[20px] mx-5 mb-6 p-5 shadow-sm" />
      </ScrollView>
    </AppSafeAreaView>
  )
}
