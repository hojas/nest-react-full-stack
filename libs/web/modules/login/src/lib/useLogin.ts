import { useState, useEffect, ChangeEvent } from 'react'
import { UserService } from './login.service'

export const useLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    const fn = async () => {
      const { ok } = await UserService.getUser()
      if (ok) {
        window.location.href = '/'
      }
    }

    fn()
  }, [])

  const onSetEmail = (e: ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value)

  const onSetPassword = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value)

  const onLogin = async () => {
    const { ok } = await UserService.login(email, password)
    if (ok) {
      window.location.href = '/'
    }
  }

  return {
    onSetEmail,
    onSetPassword,
    onLogin,
  }
}
