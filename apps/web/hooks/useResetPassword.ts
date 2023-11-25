import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { getApiUrl } from '../utils/request'

const api = {
  resetPassword: '/auth/reset-password/',
}

async function resetPassword(oldPassword: string, newPassword: string) {
  const url = getApiUrl(api.resetPassword)

  try {
    const res = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        oldPassword,
        newPassword,
      }),
    })
    return res.json()
  } catch {
    return null
  }
}

export const useResetPassword = () => {
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const router = useRouter()
  const onResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      toast('两次密码不一致')
      return
    }

    const res = await resetPassword(oldPassword, newPassword)
    if (res) {
      router.push('/')
    } else {
      toast('重置密码失败')
    }
  }

  return {
    setOldPassword,
    setNewPassword,
    setConfirmPassword,
    onResetPassword,
  }
}
