import { View } from 'react-native'
import { cn } from '@/lib/cn'

interface SkeletonProps {
  className?: string
}

export const Skeleton = ({ className }: SkeletonProps) => {
  return <View className={cn('bg-gray-300 rounded-md animate-pulse', className)} />
}
