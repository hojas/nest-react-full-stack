import { $axios } from '@nx-blog/web/common'

const api = {
  resetPassword: '/auth/reset-password/',
}

export class ResetPasswordService {
  static resetPassword(
    oldPassword: string,
    newPassword: string,
    comparePassword: string
  ) {
    return $axios.post(api.resetPassword, {
      oldPassword,
      newPassword,
      comparePassword,
    })
  }
}
