import { View } from 'react-native'
import { SafeAreaView, SafeAreaViewProps } from 'react-native-safe-area-context'
import { cn } from '@/lib/cn'

export function AppSafeAreaView({ className, style, children, ...props }: SafeAreaViewProps) {
  return (
    <SafeAreaView style={[{ flex: 1 }, style]} {...props}>
      <View className={cn('flex-1 bg-background', className)}>{children}</View>
    </SafeAreaView>
  )
}
