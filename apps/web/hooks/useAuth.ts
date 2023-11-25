import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { getApiUrl } from '../utils/request'

const api = {
  login: '/auth/login/',
  user: '/auth/user/',
}

async function login(username: string, password: string) {
  const url = getApiUrl(api.login)
  try {
    const res = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
      }),
    })
    return res.json()
  } catch {
    return null
  }
}

// async function getUser() {
//   const url = getApiUrl(api.user)
//   const user = await getItem(url)
//   if (user) {
//     window.location.href = '/'
//   }
// }

export const useAuth = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onLogin = async () => {
    const res = await login(email, password)
    if (res) {
      router.push('/')
    } else {
      toast.error('登录失败')
    }
  }

  return {
    setEmail,
    setPassword,
    onLogin,
  }
}
