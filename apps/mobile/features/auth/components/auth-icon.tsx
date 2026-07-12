import { View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/constants/colors'

interface Props {
  name: keyof typeof Ionicons.glyphMap
  size?: number
  color?: string
}

export function AuthIcon({ name, size = 20, color = Colors.light.blueGray }: Props) {
  return (
    <View className="mr-3">
      <Ionicons name={name} size={size} color={color} />
    </View>
  )
}
