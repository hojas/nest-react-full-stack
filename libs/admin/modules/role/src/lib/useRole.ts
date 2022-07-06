import { useState, useEffect } from 'react'
import { Role, RoleService } from './role.service'

export const useRole = () => {
  const [roleList, setRoleList] = useState<Role[]>([])

  const getRoleList = async () => {
    const { ok, data } = await RoleService.getRoleList()
    ok && setRoleList(data)
  }

  useEffect(() => {
    getRoleList()
  }, [])

  return {
    roleList,
  }
}
