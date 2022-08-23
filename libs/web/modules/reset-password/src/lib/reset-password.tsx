import { useState, ChangeEvent } from 'react'
import { ResetPasswordService } from './reset-password.service'

export const ResetPasswordPage = () => {
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [comparePassword, setComparePassword] = useState('')

  const handleSetOldPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setOldPassword(e.target.value)
  }

  const handleSetNewPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value)
  }

  const handleSetComparePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setComparePassword(e.target.value)
  }

  const handleLogin = async () => {
    const { ok } = await ResetPasswordService.resetPassword({
      oldPassword,
      newPassword,
      comparePassword,
    })

    if (ok) {
      window.location.href = '/'
    }
  }

  return (
    <div className="card max-w-md w-1/2 mx-auto shadow-2xl bg-base-100">
      <div className="card-body">
        <div className="text-3xl font-bold text-center">设置新密码</div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">原密码</span>
          </label>
          <input
            type="password"
            className="input input-bordered"
            onChange={handleSetOldPassword}
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">新密码</span>
          </label>
          <input
            type="password"
            className="input input-bordered"
            onChange={handleSetNewPassword}
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">确认新密码</span>
          </label>
          <input
            type="password"
            className="input input-bordered"
            onChange={handleSetComparePassword}
          />
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary" onClick={handleLogin}>
            确认
          </button>
        </div>
      </div>
    </div>
  )
}
