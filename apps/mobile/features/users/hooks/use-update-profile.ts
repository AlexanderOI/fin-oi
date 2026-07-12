import { useMutation } from '@tanstack/react-query'
import { userService } from '@/features/users/services/user.service'
import { useAuthStore } from '@/features/auth/store/auth.store'

export const useUpdateProfile = () => {
  return useMutation({
    mutationFn: userService.updateProfile,
    onSuccess: (updatedUser) => {
      useAuthStore.getState().updateUser(updatedUser)
    },
  })
}
