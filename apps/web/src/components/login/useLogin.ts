import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { UserService } from './login.service'

export const useLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    ;(async () => {
      const { ok } = await UserService.getUser()
      if (ok) {
        window.location.href = '/'
      }
    })()
  }, [])

  const router = useRouter()
  const onLogin = async () => {
    const { ok, message } = await UserService.login(email, password)
    if (ok) {
      await router.push('/')
    } else {
      toast.error(message)
    }
  }

  return {
    setEmail,
    setPassword,
    onLogin,
  }
}
