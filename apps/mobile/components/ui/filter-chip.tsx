import React from 'react'
import { TouchableOpacity, TouchableOpacityProps, Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { cn } from '@/lib/cn'

interface Props extends TouchableOpacityProps {
  selected?: boolean
  icon?: keyof typeof Ionicons.glyphMap
  children: React.ReactNode
}

export const FilterChip = ({
  selected = false,
  icon,
  children,
  className,
  ...props
}: Props) => {
  return (
    <TouchableOpacity
      className={cn(
        'flex-row items-center px-3 py-2 rounded-full mr-2',
        selected ? 'bg-primary' : 'bg-gray-100',
        className,
      )}
      activeOpacity={0.7}
      {...props}
    >
      {icon && (
        <View className="mr-1">
          <Ionicons
            name={icon}
            size={16}
            color={selected ? '#ffffff' : '#64748b'}
          />
        </View>
      )}
      <Text
        className={cn('text-sm', selected ? 'text-white font-semibold' : 'text-gray-600')}
      >
        {children}
      </Text>
    </TouchableOpacity>
  )
}
