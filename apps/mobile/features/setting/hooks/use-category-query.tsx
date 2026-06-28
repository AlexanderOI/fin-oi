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
    enabled: !!id,
  })

  const handlePrefetchCategory = (id: string) => {
    queryClient.prefetchQuery({
      queryKey: ['category', id],
      queryFn: () => getCategoryById(id),
    })
  }

  const invalidateCategoriesQuery = async (categoryId?: string) => {
    await queryClient.invalidateQueries({ queryKey: ['categories'] })
    const detailId = categoryId ?? id
    if (detailId) {
      await queryClient.invalidateQueries({ queryKey: ['category', detailId] })
    }
  }

  const createCategoryMutation = useMutation({
    mutationFn: (category: CreateCategoryDto) => createCategory(category),
  })

  const updateCategoryMutation = useMutation({
    mutationFn: ({ category, id }: { category: UpdateCategoryDto; id: string }) =>
      updateCategory(category, id),
  })

  const deleteCategoryMutation = useMutation({
    mutationFn: (id: string) => deleteCategory(id),
  })

  const handleCreateCategory = async (category: CreateCategoryDto) => {
    const result = await createCategoryMutation.mutateAsync(category)
    await invalidateCategoriesQuery()
    return result
  }

  const handleUpdateCategory = async (id: string, category: UpdateCategoryDto) => {
    const result = await updateCategoryMutation.mutateAsync({ category, id })
    await invalidateCategoriesQuery(id)
    return result
  }

  const handleDeleteCategory = async (id: string) => {
    const result = await deleteCategoryMutation.mutateAsync(id)
    await invalidateCategoriesQuery(id)
    return result
  }

  return {
    categoriesQuery,
    categoryQuery,
    handleCreateCategory,
    handleUpdateCategory,
    handleDeleteCategory,
    handlePrefetchCategory,
  }
}
