import React from 'react'
import { TouchableOpacity, TouchableOpacityProps, Text } from 'react-native'
import { cn } from '@/lib/cn'

interface ButtonProps extends TouchableOpacityProps {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

export const Button = ({
  variant = 'primary',
  size = 'md',
  children,
  className,
  ...props
}: ButtonProps) => {
  const baseClasses = 'flex-row items-center justify-center rounded-full'

  const variantClasses = {
    primary: 'bg-primary',
    secondary: 'bg-gray-100',
    outline: 'bg-transparent border border-gray-300',
  }

  const sizeClasses = {
    sm: 'px-3 py-2',
    md: 'px-4 py-3',
    lg: 'px-6 py-4',
  }

  const textClasses = {
    primary: 'text-white font-semibold',
    secondary: 'text-gray-700 font-medium',
    outline: 'text-gray-700 font-medium',
  }

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  }

  return (
    <TouchableOpacity
      className={cn(baseClasses, variantClasses[variant], sizeClasses[size], className)}
      activeOpacity={0.8}
      {...props}
    >
      {typeof children === 'string' ? (
        <Text className={cn(textClasses[variant], textSizeClasses[size])}>
          {children}
        </Text>
      ) : (
        children
      )}
    </TouchableOpacity>
  )
}
