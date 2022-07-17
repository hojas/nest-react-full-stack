import { useState } from 'react'
import { UserService } from './login.service'

export const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSetEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const handleSetPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const handleLogin = async () => {
    const { ok } = await UserService.login(email, password)

    if (ok) {
      window.location.href = '/'
    }
  }

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">登录</h1>
          <p className="py-6">朝闻道，分享编程技术和编程思想。</p>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
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
                type="text"
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
      </div>
    </div>
  )
}
