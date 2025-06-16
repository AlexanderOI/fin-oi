import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  CreateCategoryDto,
  UpdateCategoryDto,
  deleteCategory,
} from '@/features/setting/services/category.services'

export const useCategoryQuery = (id?: string) => {
  const queryClient = useQueryClient()

  const categoriesQuery = useQuery({
    queryKey: ['categories'],
    queryFn: getAllCategories,
  })

  const categoryQuery = useQuery({
    queryKey: ['category', id],
    queryFn: () => getCategoryById(id),
  })

  const invalidateCategoriesQuery = () => {
    queryClient.invalidateQueries({ queryKey: ['categories'] })
  }

  const createCategoryMutation = useMutation({
    mutationFn: (category: CreateCategoryDto) => createCategory(category),
    onSuccess: invalidateCategoriesQuery,
  })

  const updateCategoryMutation = useMutation({
    mutationFn: ({ category, id }: { category: UpdateCategoryDto; id: string }) =>
      updateCategory(category, id),
    onSuccess: invalidateCategoriesQuery,
  })

  const deleteCategoryMutation = useMutation({
    mutationFn: (id: string) => deleteCategory(id),
    onSuccess: invalidateCategoriesQuery,
  })

  const handleCreateCategory = (category: CreateCategoryDto) => {
    createCategoryMutation.mutate(category)
  }

  const handleUpdateCategory = (id: string, category: UpdateCategoryDto) => {
    updateCategoryMutation.mutate({ category, id })
  }

  const handleDeleteCategory = (id: string) => {
    deleteCategoryMutation.mutate(id)
  }

  return {
    categoriesQuery,
    categoryQuery,
    handleCreateCategory,
    handleUpdateCategory,
    handleDeleteCategory,
  }
}
