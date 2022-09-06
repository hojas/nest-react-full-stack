import { $axios } from '@nx-blog/admin/common'
import { Pagination } from '@nx-blog/shared/pagination'

const api = {
  user: '/admin/user/',
}

export interface User {
  id: number
  username: string
  phone: string
}

export class UserService {
  static getUserList() {
    return $axios.get<Pagination<User>>(api.user)
  }
}
