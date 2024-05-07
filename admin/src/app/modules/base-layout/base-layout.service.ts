import { $axios } from '~/app/utils/axios'

const api = {
  user: '/auth/user/',
}

export class BaseLayoutService {
  static getUser() {
    return $axios.get(api.user)
  }
}
