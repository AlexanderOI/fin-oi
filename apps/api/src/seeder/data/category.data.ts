import { Category } from 'generated/prisma/client'

export const categoryData: Omit<Category, 'userId' | 'isDefault'>[] = [
  {
    id: '1',
    name: 'Supermercado',
    icon: 'fast-food-outline',
    color: '#6366f1',
  },
  {
    id: '2',
    name: 'Salario',
    icon: 'cash-outline',
    color: '#84cc16',
  },
  {
    id: '3',
    name: 'Transporte',
    icon: 'car-outline',
    color: '#ec4899',
  },
  {
    id: '4',
    name: 'Casa',
    icon: 'home-outline',
    color: '#f59e0b',
  },
  {
    id: '5',
    name: 'Ocio',
    icon: 'game-controller-outline',
    color: '#14b8a6',
  },
  {
    id: '6',
    name: 'Salud',
    icon: 'fitness-outline',
    color: '#84cc16',
  },
  {
    id: '7',
    name: 'Alimentación',
    icon: 'fast-food-outline',
    color: '#6366f1',
  },
  {
    id: '8',
    name: 'Salud',
    icon: 'fitness-outline',
    color: '#84cc16',
  },
  {
    id: '9',
    name: 'Trabajo',
    icon: 'briefcase-outline',
    color: '#8b5cf6',
  },
  {
    id: '10',
    name: 'Ocio',
    icon: 'game-controller-outline',
    color: '#14b8a6',
  },
]
