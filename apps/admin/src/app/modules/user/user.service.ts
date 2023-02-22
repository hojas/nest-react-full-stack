import { $axios } from '../../utils/axios'
import { Pagination } from '@nest-react-blog/pagination'

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
