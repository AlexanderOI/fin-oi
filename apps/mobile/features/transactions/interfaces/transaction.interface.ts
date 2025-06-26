import { Category } from '@/features/setting/interfaces/category.interface'

export interface Transaction {
  id: string
  amount: number
  type: string
  categoryId: string
  category: Category
  description?: string
  date: Date
  createdAt: Date
  updatedAt: Date
}
