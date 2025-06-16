import { View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

interface IconCardProps {
  icon: keyof typeof Ionicons.glyphMap
  color: string
  size?: number
}

export const IconCard = ({ icon, color, size = 20 }: IconCardProps) => (
  <View
    className="w-12 h-12 rounded-full items-center justify-center"
    style={{ backgroundColor: `${color}20` }}
  >
    <Ionicons name={icon} size={size} color={color} />
  </View>
)
