import React from 'react'
import { View, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { cn } from '@/lib/cn'

interface EmptyStateProps {
  icon?: keyof typeof Ionicons.glyphMap
  title: string
  description?: string
  className?: string
}

export const EmptyState = ({
  icon = 'document-text-outline',
  title,
  description,
  className,
}: EmptyStateProps) => {
  return (
    <View className={cn('flex-1 items-center justify-center py-8', className)}>
      <Ionicons name={icon} size={64} color="#94a3b8" />
      <Text className="text-base text-gray-600 mt-4 font-medium">{title}</Text>
      {description && (
        <Text className="text-sm text-gray-500 mt-2 text-center px-4">{description}</Text>
      )}
    </View>
  )
}
