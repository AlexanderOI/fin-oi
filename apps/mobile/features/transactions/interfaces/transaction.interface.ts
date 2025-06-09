import { Ionicons } from '@expo/vector-icons'

export interface Transaction {
  id: string
  category: string
  description: string
  amount: number
  date: string // TODO: cambiar a date luego
  icon: keyof typeof Ionicons.glyphMap
  color: string
}
