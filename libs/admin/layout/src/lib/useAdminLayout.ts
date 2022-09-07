import { useState, useEffect } from 'react'
import { To, useLocation, useNavigate } from 'react-router-dom'
import { AdminLayoutService } from './admin-layout.service'

export const useAdminLayout = () => {
  const location = useLocation()
  const [selectedKeys, setSelectedKeys] = useState([location.pathname])

  useEffect(() => {
    ;(async () => {
      const { ok } = await AdminLayoutService.getUser()
      if (!ok) {
        window.location.href = '/'
      }
    })()
  }, [])

  useEffect(() => {
    setSelectedKeys([location.pathname])
  }, [location])

  const navigate = useNavigate()
  const onClick = (e: { key: To }) => {
    navigate(e.key)
  }

  return {
    selectedKeys,
    onClick,
  }
}
