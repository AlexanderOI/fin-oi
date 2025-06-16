import React, { useState } from 'react'
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors } from '@/constants/Colors'
import { HeaderScreen } from '@/components/common/header-screen'
import { Card } from '@/components/ui/card'
import { IconCard } from '@/components/common/icon-card'
import { CategoryForm } from '@/features/setting/components/category-form'
import { useCategoryQuery } from '@/features/setting/hooks/use-category-query'
import { Category } from '@/features/setting/interfaces/category.interface'

export default function CategoryScreen() {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const { categoriesQuery } = useCategoryQuery()

  const handleOpenModal = (category?: Category) => {
    setSelectedCategory(category ?? null)
    setIsModalVisible(true)
  }

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: Colors.light.background }}>
      <HeaderScreen
        title="Categorías"
        icon="add-circle-outline"
        onPressIcon={() => handleOpenModal()}
      />

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="flex-row flex-wrap justify-between px-6 gap-3 py-4">
          {categoriesQuery.data?.map((category: any) => (
            <TouchableOpacity
              key={category.id}
              className="w-[48%]"
              onPress={() => handleOpenModal(category)}
            >
              <Card className="flex-col items-center gap-2 m-0">
                <IconCard icon={category.icon} color={category.color} />
                <Text className="text-lg font-medium">{category.name}</Text>
              </Card>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <CategoryForm
        onClose={() => {
          setIsModalVisible(false)
          setSelectedCategory(null)
        }}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        id={selectedCategory?.id ?? undefined}
      />
    </SafeAreaView>
  )
}
