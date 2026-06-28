import { useState } from 'react'
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { AppSafeAreaView } from '@/components/common/app-safe-area-view'
import { ScreenHeader } from '@/components/common/screen-header'

import { Card } from '@/components/ui/card'
import { Modal, ModalContent } from '@/components/ui/modal'
import { IconCard } from '@/components/common/icon-card'

import { useCategoryQuery } from '@/features/setting/hooks/use-category-query'
import { Category } from '@/features/setting/interfaces/category.interface'
import { CategoryFormSkeleton } from '@/features/setting/components/category/category-form-skeleton'
import { CategoryForm } from '@/features/setting/components/category/category-form'

export default function CategoryScreen() {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const { categoriesQuery, handlePrefetchCategory } = useCategoryQuery()

  const handleOpenModal = (category?: Category) => {
    setSelectedCategory(category ?? null)
    setIsModalVisible(true)
  }

  return (
    <AppSafeAreaView>
      <ScreenHeader
        title="Categorías"
        rightAction={{
          icon: 'add-circle-outline',
          onPress: () => handleOpenModal(),
        }}
      />

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="flex-row flex-wrap justify-between px-6 gap-3 py-4">
          {categoriesQuery.data?.map((category: any) => (
            <TouchableOpacity
              key={category.id}
              className="w-[48%]"
              onPress={() => {
                handlePrefetchCategory(category.id)
                handleOpenModal(category)
              }}
            >
              <Card className="flex-col items-center gap-2 m-0">
                <IconCard icon={category.icon} color={category.color} />
                <Text className="text-lg font-medium">{category.name}</Text>
              </Card>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <Modal>
        <ModalContent
          showChildrenOnModalShow={false}
          visible={isModalVisible}
          onClose={() => {
            setIsModalVisible(false)
            setSelectedCategory(null)
          }}
          title="Nueva categoría"
          skeleton={<CategoryFormSkeleton />}
        >
          <CategoryForm
            id={selectedCategory?.id ?? undefined}
            onClose={() => {
              setIsModalVisible(false)
              setSelectedCategory(null)
            }}
          />
        </ModalContent>
      </Modal>
    </AppSafeAreaView>
  )
}
