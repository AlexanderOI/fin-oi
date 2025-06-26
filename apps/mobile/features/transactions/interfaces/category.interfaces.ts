import { Ionicons } from '@expo/vector-icons'
import { Transaction } from './transaction.interface'

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

export const transactionsData: Transaction[] = [
  {
    id: '1',
    category: 'Alimentación',
    description: 'Supermercado',
    amount: -125.5,
    date: '15 Jun',
    icon: 'fast-food-outline',
    color: '#6366f1',
  },
  {
    id: '2',
    category: 'Salario',
    description: 'Depósito mensual',
    amount: 2800,
    date: '10 Jun',
    icon: 'cash-outline',
    color: '#84cc16',
  },
  {
    id: '3',
    category: 'Transporte',
    description: 'Gasolina',
    amount: -45,
    date: '8 Jun',
    icon: 'car-outline',
    color: '#ec4899',
  },
  {
    id: '4',
    category: 'Casa',
    description: 'Alquiler',
    amount: -850,
    date: '5 Jun',
    icon: 'home-outline',
    color: '#f59e0b',
  },
  {
    id: '5',
    category: 'Ocio',
    description: 'Cine',
    amount: -32,
    date: '5 Jun',
    icon: 'game-controller-outline',
    color: '#14b8a6',
  },
  {
    id: '6',
    category: 'Salud',
    description: 'Farmacia',
    amount: -18.75,
    date: '3 Jun',
    icon: 'fitness-outline',
    color: '#84cc16',
  },
  {
    id: '7',
    category: 'Alimentación',
    description: 'Restaurante',
    amount: -45.8,
    date: '2 Jun',
    icon: 'fast-food-outline',
    color: '#6366f1',
  },
  {
    id: '8',
    category: 'Salud',
    description: 'Seguro médico',
    amount: -120,
    date: '1 Jun',
    icon: 'fitness-outline',
    color: '#84cc16',
  },
  {
    id: '9',
    category: 'Trabajo',
    description: 'Freelance',
    amount: 350,
    date: '28 May',
    icon: 'briefcase-outline',
    color: '#8b5cf6',
  },
  {
    id: '10',
    category: 'Ocio',
    description: 'Streaming',
    amount: -12.99,
    date: '25 May',
    icon: 'game-controller-outline',
    color: '#14b8a6',
  },
]
