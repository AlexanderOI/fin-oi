import { Ionicons } from '@expo/vector-icons'

export interface Category {
  id: string
  name: string
  amount: number
  icon: keyof typeof Ionicons.glyphMap
  color: string
}

export interface CategoryRanking {
  id: string
  name: string
  amount: number
  percentage: number
  color: string
  icon: keyof typeof Ionicons.glyphMap
}
