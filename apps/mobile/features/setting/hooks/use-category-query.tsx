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
import { categoryKeys } from '@/features/transactions/lib/query-keys'

export const useCategoryQuery = (id?: string) => {
  const queryClient = useQueryClient()

  const categoriesQuery = useQuery({
    queryKey: categoryKeys.all,
    queryFn: getAllCategories,
  })

  const categoryQuery = useQuery({
    queryKey: categoryKeys.detail(id),
    queryFn: () => getCategoryById(id),
    enabled: !!id,
  })

  const handlePrefetchCategory = (id: string) => {
    queryClient.prefetchQuery({
      queryKey: categoryKeys.detail(id),
      queryFn: () => getCategoryById(id),
    })
  }

  const invalidateCategoriesQuery = async (categoryId?: string) => {
    await queryClient.invalidateQueries({ queryKey: categoryKeys.all })
    const detailId = categoryId ?? id
    if (detailId) {
      await queryClient.invalidateQueries({ queryKey: categoryKeys.detail(detailId) })
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
