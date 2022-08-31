import { useState, ChangeEvent } from 'react'
import { ResetPasswordService } from './reset-password.service'

export const useResetPassword = () => {
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [comparePassword, setComparePassword] = useState('')

  const onSetOldPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setOldPassword(e.target.value)
  }

  const onSetNewPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value)
  }

  const onSetComparePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setComparePassword(e.target.value)
  }

  const onResetPassword = async () => {
    const { ok } = await ResetPasswordService.resetPassword({
      oldPassword,
      newPassword,
      comparePassword,
    })
    if (ok) {
      window.location.href = '/'
    }
  }

  return {
    onSetOldPassword,
    onSetNewPassword,
    onSetComparePassword,
    onResetPassword,
  }
}
