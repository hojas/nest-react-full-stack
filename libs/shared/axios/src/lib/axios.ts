import axios, { AxiosError, AxiosResponse, AxiosRequestConfig } from 'axios'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const humps = require('humps')

const instance = axios.create({
  baseURL: process.env['NX_AXIOS_BASE_URL'] || '/api',
  timeout: 3000,
  withCredentials: true,
})

instance.interceptors.request.use((config: AxiosRequestConfig) => {
  if (config.data) {
    config.data = humps.decamelizeKeys(config.data)
  }
  return config
})

instance.interceptors.response.use(
  (response: AxiosResponse) => ({
    ...response,
    ok: true,
    data: humps.camelizeKeys(response.data),
  }),
  async (error: AxiosError<Record<string, unknown>>) => {
    const defaultMsg = '请求失败，请稍后再试'
    const data = error.response?.data || {}
    const message = data['message'] || defaultMsg

    return {
      ...error.response,
      ok: false,
      message,
    }
  }
)

export interface MyRequestConfig<D = unknown> extends AxiosRequestConfig<D> {
  showError?: boolean
}

export interface MyResponse<T = unknown, D = unknown>
  extends AxiosResponse<T, D> {
  ok: boolean
  message?: string
}

export const $axios = {
  get: <T = unknown, R = MyResponse<T>, D = unknown>(
    url: string,
    config?: MyRequestConfig<D>
  ): Promise<R> => instance.get(url, config),

  post: <T = unknown, R = MyResponse<T>, D = unknown>(
    url: string,
    data?: D,
    config?: MyRequestConfig<D>
  ): Promise<R> => instance.post(url, data, config),

  put: <T = unknown, R = MyResponse<T>, D = unknown>(
    url: string,
    data?: D,
    config?: MyRequestConfig<D>
  ): Promise<R> => instance.put(url, data, config),

  delete: <T = unknown, R = MyResponse<T>, D = unknown>(
    url: string,
    config?: MyRequestConfig<D>
  ): Promise<R> => instance.delete(url, config),
}
