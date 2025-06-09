import React, { useState } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { BarChart } from '@/features/summary/bar-chart'
import { CategoryRankingItem } from '@/features/summary/category-ranking-Item'
import { CategoryRanking } from '@/features/transactions/interfaces/category.interfaces'
import { MonthlyData } from '@/features/dashboard/interface/data.interface'

const monthlyData: MonthlyData[] = [
  { month: 'Ene', income: 2500, expenses: 1800 },
  { month: 'Feb', income: 2600, expenses: 1750 },
  { month: 'Mar', income: 2400, expenses: 2200 },
  { month: 'Abr', income: 3100, expenses: 2100 },
  { month: 'May', income: 2800, expenses: 2300 },
  { month: 'Jun', income: 3200, expenses: 2150 },
]

const categoryRanking: CategoryRanking[] = [
  {
    id: '1',
    name: 'Casa',
    amount: 850,
    percentage: 35,
    color: '#f59e0b',
    icon: 'home-outline',
  },
  {
    id: '2',
    name: 'Alimentación',
    amount: 580,
    percentage: 25,
    color: '#6366f1',
    icon: 'fast-food-outline',
  },
  {
    id: '3',
    name: 'Transporte',
    amount: 320,
    percentage: 15,
    color: '#ec4899',
    icon: 'car-outline',
  },
  {
    id: '4',
    name: 'Ocio',
    amount: 250,
    percentage: 12,
    color: '#14b8a6',
    icon: 'game-controller-outline',
  },
  {
    id: '5',
    name: 'Salud',
    amount: 150,
    percentage: 8,
    color: '#84cc16',
    icon: 'fitness-outline',
  },
  {
    id: '6',
    name: 'Otros',
    amount: 100,
    percentage: 5,
    color: '#8b5cf6',
    icon: 'apps-outline',
  },
]

export default function SummaryScreen() {
  const [selectedPeriod, setSelectedPeriod] = useState<'3months' | '6months' | '1year'>(
    '6months',
  )

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Resumen</Text>
          <TouchableOpacity style={styles.calendarButton}>
            <Ionicons name="calendar-outline" size={22} color="#6366f1" />
          </TouchableOpacity>
        </View>

        <View style={styles.balanceCard}>
          <View style={styles.periodSelector}>
            <TouchableOpacity
              style={[
                styles.periodButton,
                selectedPeriod === '3months' && styles.selectedPeriodButton,
              ]}
              onPress={() => setSelectedPeriod('3months')}
            >
              <Text
                style={[
                  styles.periodButtonText,
                  selectedPeriod === '3months' && styles.selectedPeriodText,
                ]}
              >
                3 Meses
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.periodButton,
                selectedPeriod === '6months' && styles.selectedPeriodButton,
              ]}
              onPress={() => setSelectedPeriod('6months')}
            >
              <Text
                style={[
                  styles.periodButtonText,
                  selectedPeriod === '6months' && styles.selectedPeriodText,
                ]}
              >
                6 Meses
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.periodButton,
                selectedPeriod === '1year' && styles.selectedPeriodButton,
              ]}
              onPress={() => setSelectedPeriod('1year')}
            >
              <Text
                style={[
                  styles.periodButtonText,
                  selectedPeriod === '1year' && styles.selectedPeriodText,
                ]}
              >
                1 Año
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.balanceInfo}>
            <View style={styles.balanceColumn}>
              <Text style={styles.balanceLabel}>Ingresos</Text>
              <Text style={[styles.balanceValue, styles.incomeText]}>+15,800€</Text>
              <Text style={styles.balanceChange}>+12% vs. prev</Text>
            </View>

            <View style={styles.balanceColumn}>
              <Text style={styles.balanceLabel}>Gastos</Text>
              <Text style={[styles.balanceValue, styles.expenseText]}>-11,100€</Text>
              <Text style={styles.balanceChange}>-3% vs. prev</Text>
            </View>

            <View style={styles.balanceColumn}>
              <Text style={styles.balanceLabel}>Ahorro</Text>
              <Text style={[styles.balanceValue, styles.savingsText]}>4,700€</Text>
              <Text style={styles.balanceChange}>+18% vs. prev</Text>
            </View>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Ingresos vs. Gastos</Text>
          <TouchableOpacity>
            <Text style={styles.sectionAction}>Ver detalle</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.chartCard}>
          <BarChart data={monthlyData} />
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Principales Categorías</Text>
          <TouchableOpacity>
            <Text style={styles.sectionAction}>Ver todo</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.rankingCard}>
          {categoryRanking.map((category, index) => (
            <CategoryRankingItem key={category.id} category={category} index={index} />
          ))}
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Progresión Anual</Text>
        </View>

        <View style={styles.chartCard}></View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollView: {
    flex: 1,
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  calendarButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#e0e7ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  balanceCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    marginHorizontal: 20,
    marginBottom: 24,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  periodSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f1f5f9',
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 10,
  },
  selectedPeriodButton: {
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  periodButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748b',
  },
  selectedPeriodText: {
    color: '#1e293b',
  },
  balanceInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  balanceColumn: {
    alignItems: 'center',
  },
  balanceLabel: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 8,
  },
  balanceValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  incomeText: {
    color: '#84cc16',
  },
  expenseText: {
    color: '#f43f5e',
  },
  savingsText: {
    color: '#0ea5e9',
  },
  balanceChange: {
    fontSize: 12,
    color: '#64748b',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  sectionAction: {
    fontSize: 14,
    color: '#6366f1',
    fontWeight: '500',
  },
  chartCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    marginHorizontal: 20,
    marginBottom: 24,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  rankingCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    marginHorizontal: 20,
    marginBottom: 24,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  lineChart: {
    width: '100%',
    height: 200,
  },
})
