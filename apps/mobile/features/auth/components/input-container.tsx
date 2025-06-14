import { cn } from '@/lib/cn'
import React from 'react'
import { Text, View } from 'react-native'

interface Props {
  children: React.ReactNode
  error?: string
}

export function InputContainer({ children, error }: Props) {
  return (
    <View
      className={cn(
        'flex-row items-center bg-white rounded-2xl  px-4 h-14 shadow-lg',
        error && 'border border-red-500',
      )}
    >
      {children}
    </View>
  )
}
