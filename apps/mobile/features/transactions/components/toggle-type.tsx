import { Text, TouchableOpacity, View } from 'react-native'
import { cn } from '@/lib/cn'

export const ToggleContainer = ({ children }: { children: React.ReactNode }) => {
  return <View className="flex-row bg-slate-200 rounded-2xl p-2 mb-4">{children}</View>
}

interface ToggleButtonProps {
  isSelected: boolean
  label: string
  onPress: () => void
}

export const ToggleButton = ({ isSelected, label, onPress }: ToggleButtonProps) => {
  return (
    <TouchableOpacity
      className={cn(
        'flex-1 items-center justify-center p-3 rounded-xl shadow-sm elevation-sm',
        isSelected ? 'bg-white' : 'bg-slate-200',
      )}
      onPress={onPress}
    >
      <Text
        className={cn('text-lg font-medium', isSelected ? 'text-black' : 'text-gray-500')}
      >
        {label}
      </Text>
    </TouchableOpacity>
  )
}
