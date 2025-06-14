import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/constants/Colors'

interface Props {
  name: keyof typeof Ionicons.glyphMap
  size?: number
  color?: string
}

export function AuthIcon({ name, size = 20, color = Colors.light.blueGray }: Props) {
  return <Ionicons name={name} size={size} color={color} className="mr-3" />
}
