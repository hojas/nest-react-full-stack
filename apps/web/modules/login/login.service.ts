import { $axios } from '../../utils/axios'

const api = {
  login: '/auth/login/',
  user: '/auth/user/',
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

  static getUser() {
    return $axios.get<User>(api.user)
  }
}
