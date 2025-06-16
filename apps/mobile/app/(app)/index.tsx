import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native'
import { router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { Transaction } from '@/features/transactions/interfaces/transaction.interface'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { TransactionCard } from '@/features/transactions/components/transaction-card'

const expenseCategories = [
  {
    id: '1',
    category: 'Alimentación',
    amount: 580,
    color: '#6366f1',
    icon: 'fast-food-outline',
  },
  { id: '2', category: 'Transporte', amount: 320, color: '#ec4899', icon: 'car-outline' },
  {
    id: '3',
    category: 'Ocio',
    amount: 250,
    color: '#14b8a6',
    icon: 'game-controller-outline',
  },
  { id: '4', category: 'Casa', amount: 850, color: '#f59e0b', icon: 'home-outline' },
  { id: '5', category: 'Salud', amount: 150, color: '#84cc16', icon: 'fitness-outline' },
]

const recentTransactions: Transaction[] = [
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
    category: 'Ocio',
    description: 'Cine',
    amount: -32,
    date: '5 Jun',
    icon: 'game-controller-outline',
    color: '#14b8a6',
  },
]

const date = new Date().toLocaleDateString('es-ES', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
})

export default function DashboardScreen() {
  const { user } = useAuth()

  const totalExpenses = expenseCategories.reduce(
    (sum, category) => sum + category.amount,
    0,
  )

  const handleAddTransaction = () => {
    router.push('/transactions/new')
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hola, {user?.username}</Text>
            <Text style={styles.date}>{date}</Text>
          </View>
          <TouchableOpacity style={styles.profileButton}>
            <Ionicons name="person-circle-outline" size={40} color="#6366f1" />
          </TouchableOpacity>
        </View>

        <View style={styles.balanceCard}>
          <View style={styles.balanceHeader}>
            <Text style={styles.balanceTitle}>Balance Total</Text>
            <TouchableOpacity>
              <Ionicons name="eye-outline" size={24} color="#f8fafc" />
            </TouchableOpacity>
          </View>
          <Text style={styles.balanceAmount}>5.240,30 €</Text>
          <View style={styles.balanceFooter}>
            <View style={styles.balanceItem}>
              <Ionicons name="arrow-up-circle-outline" size={24} color="#84cc16" />
              <View style={styles.balanceItemText}>
                <Text style={styles.balanceItemLabel}>Ingresos</Text>
                <Text style={styles.balanceItemAmount}>+3.200 €</Text>
              </View>
            </View>
            <View style={styles.separator} />
            <View style={styles.balanceItem}>
              <Ionicons name="arrow-down-circle-outline" size={24} color="#f43f5e" />
              <View style={styles.balanceItemText}>
                <Text style={styles.balanceItemLabel}>Gastos</Text>
                <Text style={styles.balanceItemAmount}>-2.150 €</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Gastos por Categoría</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>Ver todo</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.expensesContainer}>
          <View style={styles.chartContainer}>
            <View style={styles.centerCircle}>
              <Text style={styles.totalExpensesAmount}>{totalExpenses}€</Text>
              <Text style={styles.totalExpensesLabel}>Total</Text>
            </View>
          </View>

          <View style={styles.categoriesContainer}>
            <FlatList
              data={expenseCategories}
              keyExtractor={item => item.id}
              scrollEnabled={false}
              renderItem={({ item }) => (
                <View style={styles.categoryItem}>
                  <View style={[styles.categoryDot, { backgroundColor: item.color }]} />
                  <Text style={styles.categoryName}>{item.category}</Text>
                  <Text style={styles.categoryAmount}>{item.amount}€</Text>
                </View>
              )}
            />
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Transacciones Recientes</Text>
          <TouchableOpacity onPress={() => router.push('/transactions')}>
            <Text style={styles.seeAllText}>Ver todo</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.transactionsContainer}>
          {recentTransactions.map(transaction => (
            <TransactionCard key={transaction.id} transaction={transaction} />
          ))}
        </View>

        <View style={styles.footer} />
      </ScrollView>

      <TouchableOpacity
        style={styles.floatingButton}
        onPress={handleAddTransaction}
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
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  greeting: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  date: {
    fontSize: 14,
    color: '#64748b',
  },
  profileButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  balanceCard: {
    backgroundColor: '#6366f1',
    borderRadius: 20,
    marginHorizontal: 20,
    marginTop: 16,
    marginBottom: 24,
    padding: 20,
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  balanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  balanceTitle: {
    fontSize: 16,
    color: '#f8fafc',
    opacity: 0.9,
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 24,
  },
  balanceFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  balanceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  balanceItemText: {
    marginLeft: 12,
  },
  balanceItemLabel: {
    fontSize: 14,
    color: '#f8fafc',
    opacity: 0.9,
  },
  balanceItemAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  separator: {
    width: 1,
    height: 40,
    backgroundColor: '#f8fafc',
    opacity: 0.2,
    marginHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
  },
  seeAllText: {
    fontSize: 14,
    color: '#6366f1',
  },
  expensesContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  chartContainer: {
    width: 120,
    height: 120,
    marginRight: 20,
    position: 'relative',
  },
  chartImage: {
    width: '100%',
    height: '100%',
    borderRadius: 60,
  },
  centerCircle: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -40 }, { translateY: -30 }],
    width: 80,
    height: 80,
    borderRadius: 30,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  totalExpensesAmount: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  totalExpensesLabel: {
    fontSize: 12,
    color: '#64748b',
  },
  categoriesContainer: {
    flex: 1,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  categoryName: {
    flex: 1,
    fontSize: 14,
    color: '#1e293b',
  },
  categoryAmount: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
  },
  transactionsContainer: {
    paddingHorizontal: 20,
  },

  footer: {
    height: 100,
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
