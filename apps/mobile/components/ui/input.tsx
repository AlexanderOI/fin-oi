import { TextInput, TextInputProps } from 'react-native'
import { Colors } from '@/constants/Colors'
import { cn } from '@/lib/cn'

export function Input({ className, placeholderTextColor, ...props }: TextInputProps) {
  return (
    <TextInput
      className={cn(
        'flex-1 text-base text-gray-700 rounded-2xl px-4 h-14 p-4 border border-gray-300',
        className,
      )}
      placeholderTextColor={placeholderTextColor || Colors.light.blueGray}
      {...props}
    />
  )
}
