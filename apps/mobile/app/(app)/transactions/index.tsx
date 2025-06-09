import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { Transaction } from '@/features/transactions/interfaces/transaction.interface'
import { Category } from '@/features/transactions/interfaces/category.interfaces'

const transactionsData: Transaction[] = [
  {
    id: '1',
    category: 'Alimentación',
    description: 'Supermercado',
    amount: -125.5,
    date: '15 Jun',
    icon: 'fast-food-outline',
    color: '#6366f1',
  },
  {
    id: '2',
    category: 'Salario',
    description: 'Depósito mensual',
    amount: 2800,
    date: '10 Jun',
    icon: 'cash-outline',
    color: '#84cc16',
  },
  {
    id: '3',
    category: 'Transporte',
    description: 'Gasolina',
    amount: -45,
    date: '8 Jun',
    icon: 'car-outline',
    color: '#ec4899',
  },
  {
    id: '4',
    category: 'Casa',
    description: 'Alquiler',
    amount: -850,
    date: '5 Jun',
    icon: 'home-outline',
    color: '#f59e0b',
  },
  {
    id: '5',
    category: 'Ocio',
    description: 'Cine',
    amount: -32,
    date: '5 Jun',
    icon: 'game-controller-outline',
    color: '#14b8a6',
  },
  {
    id: '6',
    category: 'Salud',
    description: 'Farmacia',
    amount: -18.75,
    date: '3 Jun',
    icon: 'fitness-outline',
    color: '#84cc16',
  },
  {
    id: '7',
    category: 'Alimentación',
    description: 'Restaurante',
    amount: -45.8,
    date: '2 Jun',
    icon: 'fast-food-outline',
    color: '#6366f1',
  },
  {
    id: '8',
    category: 'Salud',
    description: 'Seguro médico',
    amount: -120,
    date: '1 Jun',
    icon: 'fitness-outline',
    color: '#84cc16',
  },
  {
    id: '9',
    category: 'Trabajo',
    description: 'Freelance',
    amount: 350,
    date: '28 May',
    icon: 'briefcase-outline',
    color: '#8b5cf6',
  },
  {
    id: '10',
    category: 'Ocio',
    description: 'Streaming',
    amount: -12.99,
    date: '25 May',
    icon: 'game-controller-outline',
    color: '#14b8a6',
  },
]

const groupTransactionsByDate = (transactions: Transaction[]) => {
  const grouped: Record<string, Transaction[]> = {}

  transactions.forEach(transaction => {
    if (!grouped[transaction.date]) {
      grouped[transaction.date] = []
    }
    grouped[transaction.date].push(transaction)
  })

  return Object.entries(grouped).map(([date, transactions]) => ({
    date,
    data: transactions,
  }))
}

const allCategories: Category[] = [
  { id: 'all', name: 'Todas', icon: 'fast-food-outline', color: '#6366f1', amount: 0 },
  {
    id: 'food',
    name: 'Alimentación',
    icon: 'fast-food-outline',
    color: '#6366f1',
    amount: 0,
  },
  {
    id: 'transport',
    name: 'Transporte',
    icon: 'car-outline',
    color: '#ec4899',
    amount: 0,
  },
  {
    id: 'leisure',
    name: 'Ocio',
    icon: 'game-controller-outline',
    color: '#14b8a6',
    amount: 0,
  },
  { id: 'home', name: 'Casa', icon: 'home-outline', color: '#f59e0b', amount: 0 },
  { id: 'health', name: 'Salud', icon: 'fitness-outline', color: '#84cc16', amount: 0 },
]

const TransactionItem = ({ transaction }: { transaction: Transaction }) => (
  <TouchableOpacity style={styles.transactionItem}>
    <View style={[styles.iconContainer, { backgroundColor: `${transaction.color}20` }]}>
      <Ionicons name={transaction.icon} size={20} color={transaction.color} />
    </View>

    <View style={styles.transactionContent}>
      <Text style={styles.transactionCategory}>{transaction.category}</Text>
      <Text style={styles.transactionDescription}>{transaction.description}</Text>
    </View>

    <View style={styles.transactionAmount}>
      <Text
        style={[
          styles.amountText,
          { color: transaction.amount >= 0 ? '#84cc16' : '#f43f5e' },
        ]}
      >
        {transaction.amount >= 0 ? '+' : ''}
        {transaction.amount}€
      </Text>
    </View>
  </TouchableOpacity>
)

export default function TransactionsScreen() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedPeriod, setSelectedPeriod] = useState('month')
  const [showFilterOptions, setShowFilterOptions] = useState(false)

  const filteredTransactions =
    selectedCategory === 'all'
      ? transactionsData
      : transactionsData.filter(t => t.category.toLowerCase().includes(selectedCategory))

  const groupedTransactions = groupTransactionsByDate(filteredTransactions)

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Transacciones</Text>

        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setShowFilterOptions(!showFilterOptions)}
        >
          <Ionicons name="filter" size={24} color="#6366f1" />
        </TouchableOpacity>
      </View>

      <View
        style={[styles.filtersContainer, showFilterOptions ? styles.showFilters : {}]}
      >
        <View style={styles.dateFilters}>
          <TouchableOpacity
            style={[
              styles.dateFilterButton,
              selectedPeriod === 'week' && styles.selectedDateFilter,
            ]}
            onPress={() => setSelectedPeriod('week')}
          >
            <Text
              style={[
                styles.dateFilterText,
                selectedPeriod === 'week' && styles.selectedFilterText,
              ]}
            >
              Semana
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.dateFilterButton,
              selectedPeriod === 'month' && styles.selectedDateFilter,
            ]}
            onPress={() => setSelectedPeriod('month')}
          >
            <Text
              style={[
                styles.dateFilterText,
                selectedPeriod === 'month' && styles.selectedFilterText,
              ]}
            >
              Mes
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.dateFilterButton,
              selectedPeriod === 'year' && styles.selectedDateFilter,
            ]}
            onPress={() => setSelectedPeriod('year')}
          >
            <Text
              style={[
                styles.dateFilterText,
                selectedPeriod === 'year' && styles.selectedFilterText,
              ]}
            >
              Año
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.dateFilterButton,
              selectedPeriod === 'custom' && styles.selectedDateFilter,
            ]}
            onPress={() => setSelectedPeriod('custom')}
          >
            <Text
              style={[
                styles.dateFilterText,
                selectedPeriod === 'custom' && styles.selectedFilterText,
              ]}
            >
              Personalizado
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.categoryFilterTitle}>Filtrar por categoría</Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryFilters}
        >
          {allCategories.map(category => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryFilterButton,
                selectedCategory === category.id && styles.selectedCategoryFilter,
              ]}
              onPress={() => setSelectedCategory(category.id)}
            >
              {category.icon && (
                <Ionicons
                  name={category.icon}
                  size={16}
                  color={selectedCategory === category.id ? '#ffffff' : '#64748b'}
                  style={styles.categoryFilterIcon}
                />
              )}
              <Text
                style={[
                  styles.categoryFilterText,
                  selectedCategory === category.id && styles.selectedCategoryFilterText,
                ]}
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        style={styles.transactionsList}
        data={groupedTransactions}
        keyExtractor={item => item.date}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.dateSection}>
            <Text style={styles.dateHeader}>{item.date}</Text>
            {item.data.map(transaction => (
              <TransactionItem key={transaction.id} transaction={transaction} />
            ))}
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="document-text-outline" size={64} color="#94a3b8" />
            <Text style={styles.emptyText}>No hay transacciones que mostrar</Text>
          </View>
        }
      />

      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => router.push('/transactions/new')}
        activeOpacity={0.8}
      >
        <Ionicons name="add" size={28} color="#ffffff" />
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
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
  filterButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#e0e7ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filtersContainer: {
    paddingHorizontal: 20,
    paddingBottom: 16,
    height: 0,
    overflow: 'hidden',
  },
  showFilters: {
    height: 'auto',
  },
  dateFilters: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  dateFilterButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 8,
  },
  selectedDateFilter: {
    backgroundColor: '#6366f120',
  },
  dateFilterText: {
    color: '#64748b',
    fontSize: 14,
  },
  selectedFilterText: {
    color: '#6366f1',
    fontWeight: '600',
  },
  categoryFilterTitle: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 8,
  },
  categoryFilters: {
    flexDirection: 'row',
  },
  categoryFilterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: '#f1f5f9',
  },
  selectedCategoryFilter: {
    backgroundColor: '#6366f1',
  },
  categoryFilterIcon: {
    marginRight: 4,
  },
  categoryFilterText: {
    color: '#64748b',
    fontSize: 14,
  },
  selectedCategoryFilterText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  transactionsList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  dateSection: {
    marginBottom: 16,
  },
  dateHeader: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 8,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  transactionContent: {
    flex: 1,
  },
  transactionCategory: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  transactionDescription: {
    fontSize: 12,
    color: '#64748b',
  },
  transactionAmount: {
    alignItems: 'flex-end',
  },
  amountText: {
    fontSize: 14,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 32,
  },
  emptyText: {
    fontSize: 16,
    color: '#64748b',
    marginTop: 16,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#6366f1',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
})
