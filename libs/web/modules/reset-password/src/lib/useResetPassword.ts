import { useState } from 'react'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { ResetPasswordService } from './reset-password.service'

export const useResetPassword = () => {
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [comparePassword, setComparePassword] = useState('')

  const router = useRouter()
  const onResetPassword = async () => {
    const { ok, message } = await ResetPasswordService.resetPassword(
      oldPassword,
      newPassword,
      comparePassword
    )
    if (ok) {
      await router.push('/')
    } else {
      toast(message)
    }
  }

  return {
    setOldPassword,
    setNewPassword,
    setComparePassword,
    onResetPassword,
  }
}
