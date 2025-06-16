import { apiClient } from '@/lib/api-client'
import { Category } from '../interfaces/category.interface'

export interface CreateCategoryDto extends Omit<Category, 'id' | 'userId'> {}
export interface UpdateCategoryDto extends Omit<Category, 'id' | 'userId'> {}

export const getAllCategories = async () => {
  const { data } = await apiClient.get<Category[]>('/categories')
  return data
}

export const getCategoryById = async (id?: string) => {
  if (!id) return null
  const { data } = await apiClient.get<Category>(`/categories/${id}`)
  return data
}

export const createCategory = async (category: CreateCategoryDto) => {
  const { data } = await apiClient.post<Category>('/categories', category)
  return data
}

export const updateCategory = async (category: UpdateCategoryDto, id?: string) => {
  if (!id) return null
  const { data } = await apiClient.patch<Category>(`/categories/${id}`, category)
  return data
}

export const deleteCategory = async (id: string) => {
  const { data } = await apiClient.delete<Category>(`/categories/${id}`)
  return data
}
