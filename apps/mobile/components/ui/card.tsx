import { View, ViewProps } from 'react-native'
import { cn } from '@/lib/cn'

export const Card = ({ children, className, ...props }: ViewProps) => (
  <View
    className={cn(
      'bg-white rounded-2xl p-4 shadow-md elevation-md flex-row items-center border border-gray-200 mb-4',
      className,
    )}
    {...props}
  >
    {children}
  </View>
)
