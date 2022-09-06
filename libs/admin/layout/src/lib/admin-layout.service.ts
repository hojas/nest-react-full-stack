import { $axios } from '@nx-blog/admin/common'

const api = {
  user: '/auth/user/',
}

export class AdminLayoutService {
  static getUser() {
    return $axios.get(api.user)
  }
}
