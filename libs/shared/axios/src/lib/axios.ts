import axios, { AxiosError, AxiosResponse, AxiosRequestConfig } from 'axios'

export interface CustomResponse<T = unknown, D = unknown>
  extends AxiosResponse<T, D> {
  ok: boolean
  message?: string
}

export const initAxios = (baseURL: string = '/api') => {
  const instance = axios.create({
    baseURL,
    timeout: 3000,
    withCredentials: true,
  })

  instance.interceptors.response.use(
    (response: AxiosResponse) => ({
      ok: true,
      data: response.data,
    }),
    async (error: AxiosError<Record<string, unknown>>) => {
      const defaultMsg = '请求失败，请稍后再试'
      const data = error.response?.data || {}
      const message = data['message'] || defaultMsg

      return {
        ok: false,
        data,
        message,
      }
    }
  )

  return {
    get: <T = unknown, R = CustomResponse<T>, D = unknown>(
      url: string,
      config?: AxiosRequestConfig<D>
    ): Promise<R> => instance.get(url, config),

    post: <T = unknown, R = CustomResponse<T>, D = unknown>(
      url: string,
      data?: D,
      config?: AxiosRequestConfig<D>
    ): Promise<R> => instance.post(url, data, config),

    put: <T = unknown, R = CustomResponse<T>, D = unknown>(
      url: string,
      data?: D,
      config?: AxiosRequestConfig<D>
    ): Promise<R> => instance.put(url, data, config),

    delete: <T = unknown, R = CustomResponse<T>, D = unknown>(
      url: string,
      config?: AxiosRequestConfig<D>
    ): Promise<R> => instance.delete(url, config),
  }
}
