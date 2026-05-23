import React from 'react'
import { TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { cn } from '@/lib/cn'

interface Props extends TouchableOpacityProps {
  icon?: keyof typeof Ionicons.glyphMap
  size?: 'sm' | 'md' | 'lg'
}

export const FloatingActionButton = ({
  icon = 'add',
  size = 'md',
  className,
  ...props
}: Props) => {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-14 h-14',
    lg: 'w-16 h-16',
  }

  const iconSizes = {
    sm: 20,
    md: 28,
    lg: 32,
  }

  return (
    <TouchableOpacity
      className={cn(
        'absolute bottom-6 right-6 rounded-full bg-primary items-center justify-center shadow-md elevation-lg',
        sizeClasses[size],
        className,
      )}
      activeOpacity={0.8}
      {...props}
    >
      <Ionicons name={icon} size={iconSizes[size]} color="#ffffff" />
    </TouchableOpacity>
  )
}
