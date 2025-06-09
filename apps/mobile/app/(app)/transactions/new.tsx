import React, { useState, useCallback } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'
import { router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { CategoryItem } from '@/features/transactions/components/category-item'
import { Category } from '@/features/transactions/interfaces/category.interfaces'

const categories: Category[] = [
  {
    id: '1',
    name: 'Alimentación',
    icon: 'fast-food-outline',
    color: '#6366f1',
    amount: 0,
  },
  { id: '2', name: 'Transporte', icon: 'car-outline', color: '#ec4899', amount: 0 },
  { id: '3', name: 'Ocio', icon: 'game-controller-outline', color: '#14b8a6', amount: 0 },
  { id: '4', name: 'Casa', icon: 'home-outline', color: '#f59e0b', amount: 0 },
  { id: '5', name: 'Salud', icon: 'fitness-outline', color: '#84cc16', amount: 0 },
  { id: '6', name: 'Trabajo', icon: 'briefcase-outline', color: '#8b5cf6', amount: 0 },
  { id: '7', name: 'Regalos', icon: 'gift-outline', color: '#f43f5e', amount: 0 },
  { id: '8', name: 'Educación', icon: 'school-outline', color: '#0ea5e9', amount: 0 },
]

export default function NewTransactionScreen() {
  const [transactionType, setTransactionType] = useState<'expense' | 'income'>('expense')
  const [amount, setAmount] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [description, setDescription] = useState('')
  const [date, setDate] = useState(new Date())

  const formattedDate = date.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })

  const handleCategorySelect = useCallback((category: Category) => {
    setSelectedCategory(category)
  }, [])

  const handleSaveTransaction = () => {
    router.back()
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.typeSelector}>
            <TouchableOpacity
              style={[
                styles.typeButton,
                transactionType === 'expense' && styles.selectedTypeButton,
              ]}
              onPress={() => setTransactionType('expense')}
            >
              <Text
                style={[
                  styles.typeText,
                  transactionType === 'expense' && styles.selectedTypeText,
                ]}
              >
                Gasto
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.typeButton,
                transactionType === 'income' && styles.selectedTypeButton,
              ]}
              onPress={() => setTransactionType('income')}
            >
              <Text
                style={[
                  styles.typeText,
                  transactionType === 'income' && styles.selectedTypeText,
                ]}
              >
                Ingreso
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.amountContainer}>
            <Text style={styles.amountLabel}>
              {transactionType === 'expense' ? 'Cuánto gastaste?' : 'Cuánto recibiste?'}
            </Text>
            <View style={styles.amountInputContainer}>
              <Text style={styles.currencySymbol}>€</Text>
              <TextInput
                style={styles.amountInput}
                placeholder="0.00"
                placeholderTextColor="#94a3b8"
                keyboardType="decimal-pad"
                value={amount}
                onChangeText={setAmount}
              />
            </View>
          </View>

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Categoría</Text>
            <View style={styles.categoriesContainer}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {categories.map(category => (
                  <CategoryItem
                    key={category.id}
                    category={category}
                    isSelected={selectedCategory?.id === category.id}
                    onSelect={handleCategorySelect}
                  />
                ))}
              </ScrollView>
            </View>
          </View>

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Fecha</Text>
            <TouchableOpacity style={styles.dateSelector}>
              <Ionicons
                name="calendar-outline"
                size={20}
                color="#64748b"
                style={styles.dateIcon}
              />
              <Text style={styles.dateText}>{formattedDate}</Text>
              <Ionicons name="chevron-down-outline" size={16} color="#64748b" />
            </TouchableOpacity>
          </View>

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Descripción (Opcional)</Text>
            <View style={styles.descriptionInputContainer}>
              <TextInput
                style={styles.descriptionInput}
                placeholder="Añadir nota"
                placeholderTextColor="#94a3b8"
                multiline
                numberOfLines={3}
                value={description}
                onChangeText={setDescription}
              />
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSaveTransaction}
              activeOpacity={0.8}
            >
              <Text style={styles.saveButtonText}>Guardar</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    padding: 20,
  },
  typeSelector: {
    flexDirection: 'row',
    backgroundColor: '#e2e8f0',
    borderRadius: 12,
    padding: 4,
    marginBottom: 24,
  },
  typeButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 10,
  },
  selectedTypeButton: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  typeText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#64748b',
  },
  selectedTypeText: {
    color: '#1e293b',
  },
  amountContainer: {
    marginBottom: 24,
  },
  amountLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748b',
    marginBottom: 8,
  },
  amountInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#6366f1',
    paddingBottom: 8,
  },
  currencySymbol: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1e293b',
    marginRight: 8,
  },
  amountInput: {
    flex: 1,
    fontSize: 24,
    fontWeight: '600',
    color: '#1e293b',
    padding: 0,
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748b',
    marginBottom: 12,
  },
  categoriesContainer: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },

  dateSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  dateIcon: {
    marginRight: 12,
  },
  dateText: {
    flex: 1,
    fontSize: 16,
    color: '#1e293b',
  },
  descriptionInputContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    padding: 16,
  },
  descriptionInput: {
    fontSize: 16,
    color: '#1e293b',
    textAlignVertical: 'top',
  },
  buttonContainer: {
    marginTop: 8,
    marginBottom: 32,
  },
  saveButton: {
    backgroundColor: '#6366f1',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
})
