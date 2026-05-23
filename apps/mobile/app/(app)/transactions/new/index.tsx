import React, { useEffect } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  FlatList,
} from 'react-native'
import { router } from 'expo-router'
import { AppSafeAreaView } from '@/components/common/app-safe-area-view'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { formatDecimal } from '@/lib/format-number'
import {
  Form,
  FormLabel,
  FormControl,
  FormItem,
  FormField,
  FormMessage,
} from '@/components/ui/form'
import { DataPicker } from '@/components/ui/data-picker'

import {
  ToggleButton,
  ToggleContainer,
} from '@/features/transactions/components/toggle-type'
import { CategoryItem } from '@/features/transactions/components/category-item'
import { useCategoryQuery } from '@/features/setting/hooks/use-category-query'
import { useTransactions } from '@/features/transactions/hooks/use-transactions'

const formSchema = z.object({
  amount: z
    .string()
    .min(1, { message: 'Ingresa un monto' })
    .refine(
      val => {
        const num = parseFloat(val.replace(',', '.'))
        return !isNaN(num) && num > 0
      },
      { message: 'Ingresa un monto válido mayor a 0' },
    ),
  type: z.enum(['expense', 'income']),
  date: z.date(),
  categoryId: z.string().min(1, { message: 'Selecciona una categoría' }),
  description: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

const initialData: FormValues = {
  amount: '',
  type: 'expense',
  date: new Date(),
  categoryId: '',
  description: '',
}

export default function NewTransactionScreen() {
  const { handleCreateTransaction, mutateError } = useTransactions()
  const { categoriesQuery } = useCategoryQuery()

  const form = useForm<FormValues>({
    defaultValues: initialData,
    resolver: zodResolver(formSchema),
  })

  const submit = form.handleSubmit(data => {
    const processedData = {
      ...data,
      amount: parseFloat(data.amount.replace(',', '.')),
    }

    handleCreateTransaction(processedData)
    form.reset()
    router.back()
  })

  useEffect(() => {
    if (mutateError) {
      form.setError('amount', { message: 'Error al crear la transacción' })
    }
  }, [mutateError])

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
      className="bg-background"
    >
      <AppSafeAreaView>
        <ScrollView className="flex-1 p-5" showsVerticalScrollIndicator={false}>
          <Form {...form}>
            <ToggleContainer>
              <ToggleButton
                isSelected={form.watch('type') === 'expense'}
                onPress={() => form.setValue('type', 'expense')}
                label="Gasto"
              />
              <ToggleButton
                isSelected={form.watch('type') === 'income'}
                onPress={() => form.setValue('type', 'income')}
                label="Ingreso"
              />
            </ToggleContainer>

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {form.watch('type') === 'expense'
                      ? 'Cuánto gastaste?'
                      : 'Cuánto recibiste?'}
                  </FormLabel>
                  <View className="flex-row items-center gap-2">
                    <Text className="text-2xl font-bold text-gray-700 pt-2">Gs.</Text>
                    <FormControl
                      className="flex-1 text-2xl font-bold"
                      style={{
                        backgroundColor: 'none',
                        borderWidth: 0,
                        borderBottomWidth: 2,
                        borderBottomColor: '#e2e8f0',
                        paddingBottom: 0,
                      }}
                      placeholderTextColor="#94a3b8"
                      placeholder="0.00"
                      keyboardType="number-pad"
                      onChangeText={value => {
                        const formattedValue = formatDecimal(value)
                        field.onChange(formattedValue)
                      }}
                      value={field.value}
                    />
                  </View>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoría</FormLabel>
                  <FlatList
                    horizontal
                    data={categoriesQuery.data}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                      <CategoryItem
                        category={item}
                        isSelected={field.value === item.id}
                        onSelect={() => {
                          field.onChange(item.id)
                        }}
                      />
                    )}
                    showsHorizontalScrollIndicator={false}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fecha</FormLabel>
                  <DataPicker value={field.value} onChange={field.onChange} />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción (Opcional)</FormLabel>
                  <FormControl
                    className="h-24"
                    style={{
                      textAlignVertical: 'top',
                    }}
                    placeholder="Añadir nota"
                    numberOfLines={3}
                    onChangeText={field.onChange}
                    {...field}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <View className="mt-2 mb-8">
              <TouchableOpacity
                className="bg-primary rounded-lg p-4 shadow-md elevation-md"
                onPress={submit}
                activeOpacity={0.8}
              >
                <Text className="text-white text-center text-lg font-bold">Guardar</Text>
              </TouchableOpacity>
            </View>
          </Form>
        </ScrollView>
      </AppSafeAreaView>
    </KeyboardAvoidingView>
  )
}
