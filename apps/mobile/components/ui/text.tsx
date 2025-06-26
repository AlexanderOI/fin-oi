import React from 'react'
import { Text as RNText, TextProps } from 'react-native'
import { cn } from '@/lib/cn'

interface CustomTextProps extends TextProps {
  variant?: 'h1' | 'h2' | 'h3' | 'body' | 'caption' | 'label'
  weight?: 'normal' | 'medium' | 'semibold' | 'bold'
  color?: 'primary' | 'secondary' | 'muted' | 'success' | 'error'
  className?: string
}

export const Text = ({
  variant = 'body',
  weight = 'normal',
  color = 'primary',
  className,
  children,
  ...props
}: CustomTextProps) => {
  const variantClasses = {
    h1: 'text-3xl',
    h2: 'text-2xl',
    h3: 'text-xl',
    body: 'text-base',
    caption: 'text-sm',
    label: 'text-sm',
  }

  const weightClasses = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
  }

  const colorClasses = {
    primary: 'text-gray-900',
    secondary: 'text-gray-700',
    muted: 'text-gray-500',
    success: 'text-green-600',
    error: 'text-red-600',
  }

  return (
    <RNText
      className={cn(
        variantClasses[variant],
        weightClasses[weight],
        colorClasses[color],
        className,
      )}
      {...props}
    >
      {children}
    </RNText>
  )
}
