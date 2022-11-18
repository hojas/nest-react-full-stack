import { $axios } from '../../utils/axios'

const api = {
  list: '/admin/role/',
  detail: (id: number) => `/admin/role/${id}/`,
}

export interface CreateRoleDto {
  code: string
  name: string
}

export interface Role extends CreateRoleDto {
  id: number
}

export class RoleService {
  static getRoleList() {
    return $axios.get<Role[]>(api.list)
  }

  static createRole(role: CreateRoleDto) {
    return $axios.post<Role>(api.list, { role })
  }

  static updateRole(id: number, role: CreateRoleDto) {
    return $axios.put<Role>(api.detail(id), { role })
  }

  static removeRole(id: number) {
    return $axios.delete<Role>(api.detail(id))
  }
}
