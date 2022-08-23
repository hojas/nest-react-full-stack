import { useState, useEffect, ChangeEvent } from 'react'
import { UserService } from './login.service'

export const LoginPage = () => {
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

  const handleSetEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const handleSetPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const handleLogin = async () => {
    const { ok } = await UserService.login(email, password)

    if (ok) {
      window.location.href = '/'
    }
  }

  return (
    <div className="card max-w-md w-1/2 mx-auto shadow-2xl bg-base-100">
      <div className="card-body">
        <div className="text-3xl font-bold text-center">登录</div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">邮箱</span>
          </label>
          <input
            type="text"
            className="input input-bordered"
            onChange={handleSetEmail}
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">密码</span>
          </label>
          <input
            type="password"
            className="input input-bordered"
            onChange={handleSetPassword}
          />
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary" onClick={handleLogin}>
            登录
          </button>
        </div>
      </div>
    </div>
  )
}
