import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { cn } from '@/lib/cn'

interface ScreenHeaderProps {
  title: string
  rightAction?: {
    icon: keyof typeof Ionicons.glyphMap
    onPress?: () => void
  }
  className?: string
}

export const ScreenHeader = ({ title, rightAction, className }: ScreenHeaderProps) => {
  return (
    <View className={cn('flex-row justify-between items-center px-5 py-4', className)}>
      <Text className="text-2xl font-bold text-gray-800">{title}</Text>

      {rightAction && (
        <TouchableOpacity
          className="w-11 h-11 rounded-full bg-blue-100 items-center justify-center"
          onPress={rightAction.onPress ?? undefined}
          activeOpacity={0.7}
        >
          <Ionicons name={rightAction.icon} size={24} color="#6366f1" />
        </TouchableOpacity>
      )}
    </View>
  )
}
