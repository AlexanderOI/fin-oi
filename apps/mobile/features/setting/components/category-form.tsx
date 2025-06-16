import { ModalComponent } from '@/components/ui/modal'
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/constants/Colors'
import { categoriesIcons, COLORS } from '@/features/setting/constants/categories'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { IconName } from '@/global'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { AxiosError } from 'axios'
import { useCategoryQuery } from '../hooks/use-category-query'
import { useEffect, useState } from 'react'
import { ModalDelete } from '@/components/common/modal-delete'
import { CategoryFormSkeleton } from './category-form-skeleton'

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
  isModalVisible: boolean
  setIsModalVisible: (visible: boolean) => void
}

export const CategoryForm = ({ id, isModalVisible, onClose }: Props) => {
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
        await handleUpdateCategory(id, newData)
      } else {
        await handleCreateCategory(newData)
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

  return (
    <ModalComponent
      visible={isModalVisible}
      onClose={() => {
        onClose()
        form.reset(initialData)
      }}
      title="Nueva categoría"
      isLoading={categoryQuery.isLoading}
      skeleton={<CategoryFormSkeleton />}
    >
      <ScrollView>
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

              <TouchableOpacity
                className="w-14 h-14 rounded-lg items-center justify-center bg-red-500/30 mt-6 ml-2"
                onPress={() => {
                  setIsModalDeleteVisible(true)
                }}
              >
                <Ionicons name="trash-outline" size={24} color="red" />
              </TouchableOpacity>
            </View>

            <View className="gap-4">
              <FormLabel>Color de fondo</FormLabel>
              <View className="flex-row items-center justify-center flex-wrap gap-3">
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{ gap: 10 }}
                >
                  {COLORS.map(color => (
                    <TouchableOpacity
                      key={color}
                      className="w-12 h-12 rounded-full items-center justify-center"
                      style={{
                        backgroundColor: color,
                      }}
                      onPress={() => form.setValue('color', color)}
                    />
                  ))}
                </ScrollView>
              </View>
              {form.formState.errors.color && (
                <Text className="text-red-500 text-sm">
                  {form.formState.errors?.color?.message}
                </Text>
              )}
            </View>

            <View>
              <FormLabel>Icono</FormLabel>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{ height: 180 }}
              >
                <View className="gap-3">
                  {[0, 1, 2].map(row => (
                    <View key={row} className="flex-row gap-3">
                      {categoriesIcons.slice(row * 8, (row + 1) * 8).map(category => (
                        <TouchableOpacity
                          key={category.icon}
                          className="w-12 h-12 rounded-full items-center justify-center"
                          onPress={() => form.setValue('icon', category.icon)}
                          style={{
                            backgroundColor: (form.watch('color') || '#000000') + '20',
                            borderWidth: form.watch('icon') === category.icon ? 2 : 0,
                            borderColor: form.watch('color') || '#000000',
                          }}
                        >
                          <Ionicons
                            name={category.icon}
                            color={form.watch('color') || '#000'}
                            size={24}
                          />
                        </TouchableOpacity>
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
      </ScrollView>

      <ModalDelete
        isModalVisible={isModalDeleteVisible}
        onClose={() => setIsModalDeleteVisible(false)}
        onDelete={handleDelete}
        title="Eliminar categoría"
        message="¿Estás seguro de querer eliminar esta categoría?"
      />
    </ModalComponent>
  )
}
