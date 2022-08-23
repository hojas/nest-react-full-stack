import { $axios } from '@nx-blog/shared/axios'

const api = {
  user: '/auth/user/',
}

export class AdminLayoutService {
  static getUser() {
    return $axios.get(api.user)
  }
}
