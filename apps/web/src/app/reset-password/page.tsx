'use client'

import { useResetPassword } from '../../hooks/useResetPassword'
import { ResetPasswordPage } from '../../themes'

export default function ResetPassword() {
  const {
    setOldPassword,
    setNewPassword,
    setConfirmPassword,
    onResetPassword,
  } = useResetPassword()

  return (
    <ResetPasswordPage
      setOldPassword={setOldPassword}
      setNewPassword={setNewPassword}
      setConfirmPassword={setConfirmPassword}
      onResetPassword={onResetPassword}
    />
  )
}
