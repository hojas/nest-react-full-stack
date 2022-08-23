import { $axios } from '@nx-blog/shared/axios'

const api = {
  resetPassword: '/auth/reset-password/',
}

interface ResetPasswordUser {
  oldPassword: string
  newPassword: string
  comparePassword: string
}

export class ResetPasswordService {
  static resetPassword(user: ResetPasswordUser) {
    return $axios.post<ResetPasswordUser>(api.resetPassword, { user })
  }
}
