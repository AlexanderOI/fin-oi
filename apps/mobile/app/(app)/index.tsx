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
import { useTransactions } from '@/features/transactions/hooks/use-transactions'
import { formatNumber } from '@/lib/format-number'

const date = new Date().toLocaleDateString('es-ES', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
})

export default function DashboardScreen() {
  const { user } = useAuth()
  const { transactionsQuery } = useTransactions()
  const transactionsAmounts = transactionsQuery.data?.reduce<{
    expenses: number
    incomes: number
  }>(
    (sum: { expenses: number; incomes: number }, transaction: Transaction) => {
      if (transaction.type === 'expense') {
        sum.expenses += transaction.amount
      } else {
        sum.incomes += transaction.amount
      }
      return sum
    },
    {
      expenses: 0,
      incomes: 0,
    },
  )

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
          <Text style={styles.balanceAmount}>
            {formatNumber(transactionsAmounts?.expenses ?? 0)} ₲
          </Text>
          <View style={styles.balanceFooter}>
            <View style={styles.balanceItem}>
              <Ionicons name="arrow-up-circle-outline" size={24} color="#84cc16" />
              <View style={styles.balanceItemText}>
                <Text style={styles.balanceItemLabel}>Ingresos</Text>
                <Text style={styles.balanceItemAmount}>
                  {formatNumber(transactionsAmounts?.incomes ?? 0)} ₲
                </Text>
              </View>
            </View>
            <View style={styles.separator} />
            <View style={styles.balanceItem}>
              <Ionicons name="arrow-down-circle-outline" size={24} color="#f43f5e" />
              <View style={styles.balanceItemText}>
                <Text style={styles.balanceItemLabel}>Gastos</Text>
                <Text style={styles.balanceItemAmount}>
                  {formatNumber(transactionsAmounts?.expenses ?? 0)} ₲
                </Text>
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
              <Text style={styles.totalExpensesAmount}>
                {formatNumber(transactionsAmounts?.expenses ?? 0)} ₲
              </Text>
              <Text style={styles.totalExpensesLabel}>Total</Text>
            </View>
          </View>

          <View style={styles.categoriesContainer}>
            <FlatList
              data={transactionsQuery.data?.filter(
                transaction => transaction.type === 'expense',
              )}
              keyExtractor={item => item.id}
              scrollEnabled={false}
              renderItem={({ item }) => (
                <View style={styles.categoryItem}>
                  <View
                    style={[styles.categoryDot, { backgroundColor: item.category.color }]}
                  />
                  <Text style={styles.categoryName}>{item.category.name}</Text>
                  <Text style={styles.categoryAmount}>{item.amount}₲</Text>
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
          {transactionsQuery.data?.map(transaction => (
            <TransactionCard key={transaction.id} transaction={transaction} />
          ))}
        </View>

        <View style={styles.footer} />
      </ScrollView>

      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => router.push('/(app)/transactions/new')}
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
