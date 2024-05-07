import { $axios } from '~/app/utils/axios'
import { Pagination } from '~/app/components/pagination'

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
