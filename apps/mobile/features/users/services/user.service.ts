import { apiClient } from '@/lib/api-client'

interface UpdateProfileData {
  name?: string
  username?: string
  email?: string
}

export const userService = {
  updateProfile: async (data: UpdateProfileData) => {
    const response = await apiClient.patch('/users', data)
    return response.data
  },
}
