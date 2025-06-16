import { Ionicons } from '@expo/vector-icons'

export interface Category {
  id: string
  name: string
  icon: keyof typeof Ionicons.glyphMap
  color: string
  userId: string
}
