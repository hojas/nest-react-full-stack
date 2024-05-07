import { useEffect, useState } from 'react'
import type { To } from 'react-router-dom'
import { useLocation, useNavigate } from 'react-router-dom'
import { BaseLayoutService } from './base-layout.service'

export function useBaseLayout() {
  const location = useLocation()
  const [selectedKeys, setSelectedKeys] = useState([location.pathname])

  const getUser = async () => {
    const { ok } = await BaseLayoutService.getUser()
    if (!ok)
      window.location.href = '/'
  }

  useEffect(() => {
    getUser()
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
