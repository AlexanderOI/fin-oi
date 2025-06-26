import React from 'react'
import { View } from 'react-native'
import { cn } from '@/lib/cn'

interface LoadingSkeletonProps {
  className?: string
  height?: number
  width?: number
}

export const LoadingSkeleton = ({
  className,
  height = 20,
  width,
}: LoadingSkeletonProps) => {
  return (
    <View
      className={cn('bg-gray-200 rounded animate-pulse', className)}
      style={{ height, width }}
    />
  )
}

interface TransactionSkeletonProps {
  className?: string
}

export const TransactionSkeleton = ({ className }: TransactionSkeletonProps) => {
  return (
    <View
      className={cn('bg-white rounded-2xl p-4 mb-4 flex-row items-center', className)}
    >
      <LoadingSkeleton className="w-12 h-12 rounded-full mr-3" />
      <View className="flex-1">
        <LoadingSkeleton className="h-5 mb-2" width={120} />
        <LoadingSkeleton className="h-4" width={160} />
      </View>
      <View className="items-end">
        <LoadingSkeleton className="h-5 mb-2" width={80} />
        <LoadingSkeleton className="h-4" width={60} />
      </View>
    </View>
  )
}

interface TransactionListSkeletonProps {
  count?: number
  className?: string
}

export const TransactionListSkeleton = ({
  count = 5,
  className,
}: TransactionListSkeletonProps) => {
  return (
    <View className={cn('px-5', className)}>
      {Array.from({ length: count }).map((_, index) => (
        <TransactionSkeleton key={index} />
      ))}
    </View>
  )
}
