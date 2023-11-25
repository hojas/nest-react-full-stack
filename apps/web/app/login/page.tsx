'use client'

import { useAuth } from '../../hooks/useAuth'
import { LoginPage } from '../../themes'

export default function Login() {
  const { setEmail, setPassword, onLogin } = useAuth()

  return (
    <LoginPage
      setEmail={setEmail}
      setPassword={setPassword}
      onLogin={onLogin}
    />
  )
}
