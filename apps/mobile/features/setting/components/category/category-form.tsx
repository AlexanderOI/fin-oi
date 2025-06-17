import { useEffect, useState, useCallback } from 'react'
import { View, Text, TouchableOpacity, Alert, FlatList, ScrollView } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import { AxiosError } from 'axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Colors } from '@/constants/Colors'
import { IconName } from '@/global'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { ModalDelete } from '@/components/common/modal-delete'

import { useCategoryQuery } from '@/features/setting/hooks/use-category-query'
import { categoriesIcons, COLORS } from '@/features/setting/constants/categories'
import { IconRender } from '@/features/setting/components/category/icon-render'
import { ColorIcon } from '@/features/setting/components/category/color-icon'

const schema = z.object({
  name: z.string().min(4, { message: 'El nombre debe tener al menos 4 caracteres' }),
  icon: z.string().min(1, { message: 'El icono es requerido' }),
  color: z.string().min(1, { message: 'El color es requerido' }),
})

const initialData = {
  name: '',
  icon: '',
  color: '',
}

interface Props {
  id?: string
  onClose: () => void
}

const getIconColumns = (data: typeof categoriesIcons, itemsPerColumn = 3) => {
  const columns = []
  for (let i = 0; i < data.length; i += itemsPerColumn) {
    columns.push(data.slice(i, i + itemsPerColumn))
  }
  return columns
}

export const CategoryForm = ({ id, onClose }: Props) => {
  const [isModalDeleteVisible, setIsModalDeleteVisible] = useState(false)
  const {
    handleCreateCategory,
    handleUpdateCategory,
    handleDeleteCategory,
    categoryQuery,
  } = useCategoryQuery(id)

  const form = useForm({
    defaultValues: initialData,
    resolver: zodResolver(schema),
  })

  useEffect(() => {
    if (categoryQuery.data) {
      form.reset(categoryQuery.data)
    }
  }, [categoryQuery.data])

  const handleSubmit = form.handleSubmit(async data => {
    try {
      const newData = {
        ...data,
        icon: data.icon as IconName,
      }

      if (id) {
        handleUpdateCategory(id, newData)
      } else {
        handleCreateCategory(newData)
      }
      form.reset()
      onClose()
    } catch (error) {
      if (error instanceof AxiosError) {
        Alert.alert('Error', error.response?.data.message)
      }
    }
  })

  const handleDelete = () => {
    handleDeleteCategory(id ?? '')
    setIsModalDeleteVisible(false)
    onClose()
  }

  const colorKeyExtractor = useCallback((item: string) => item, [])

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Form {...form}>
        <View className="gap-4">
          <View className="w-full flex-row items-center justify-between">
            <FormField
              control={form.control}
              name="name"
              render={({
                field: { onChange, value, ...field },
                fieldState: { error },
              }) => (
                <FormItem className="flex-1 m-0">
                  <FormLabel className="h-5">Nombre de la categoría</FormLabel>
                  <FormControl
                    placeholder="Nombre"
                    onChangeText={onChange}
                    value={value}
                    className="h-14 m-0"
                    {...field}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            {id && (
              <TouchableOpacity
                className="w-14 h-14 rounded-lg items-center justify-center bg-red-500/30 mt-6 ml-2"
                onPress={() => {
                  setIsModalDeleteVisible(true)
                }}
              >
                <Ionicons name="trash-outline" size={24} color="red" />
              </TouchableOpacity>
            )}
          </View>

          <View className="gap-4">
            <FormLabel>Color de fondo</FormLabel>
            <View className="flex-row items-center justify-center flex-wrap gap-3">
              <FlatList
                data={COLORS}
                renderItem={({ item }) => (
                  <ColorIcon
                    color={item}
                    onPress={(value: string) => form.setValue('color', value)}
                  />
                )}
                keyExtractor={colorKeyExtractor}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 10 }}
                removeClippedSubviews={true}
                initialNumToRender={10}
                maxToRenderPerBatch={10}
                windowSize={5}
              />
            </View>
            {form.formState.errors.color && (
              <Text className="text-red-500 text-sm">
                {form.formState.errors?.color?.message}
              </Text>
            )}
          </View>

          <View>
            <FormLabel>Icono</FormLabel>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View className="flex-row gap-4">
                {getIconColumns(categoriesIcons).map((column, colIndex) => (
                  <View key={colIndex} className="gap-4">
                    {column.map(item => (
                      <IconRender
                        key={item.icon}
                        item={item}
                        color={form.watch('color')}
                        icon={form.watch('icon')}
                        onPress={value => form.setValue('icon', value)}
                      />
                    ))}
                  </View>
                ))}
              </View>
            </ScrollView>
            {form.formState.errors.icon && (
              <Text className="text-red-500 text-sm">
                {form.formState.errors?.icon?.message}
              </Text>
            )}
          </View>

          <TouchableOpacity
            className="bg-primary rounded-2xl h-14 items-center justify-center mt-4 mb-6"
            style={{ backgroundColor: Colors.light.primary }}
            onPress={handleSubmit}
          >
            <Text className="text-white font-medium text-base">Guardar</Text>
          </TouchableOpacity>
        </View>
      </Form>

      <ModalDelete
        isModalVisible={isModalDeleteVisible}
        onClose={() => setIsModalDeleteVisible(false)}
        onDelete={handleDelete}
        title="Eliminar categoría"
        message="¿Estás seguro de querer eliminar esta categoría?"
      />
    </ScrollView>
  )
}
