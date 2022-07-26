import { $axios } from '@nx-blog/shared/axios'

const api = {
  login: '/auth/login/',
}

interface User {
  id: number
  username: string
}

export class UserService {
  static login(username: string, password: string) {
    return $axios.post<User>(api.login, {
      username,
      password,
    })
  }
}
