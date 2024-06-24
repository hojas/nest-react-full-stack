import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import axios from 'axios'

export interface CustomResponse<T = unknown, D = unknown>
  extends AxiosResponse<T, D> {
  ok: boolean
  message?: string
}

export function initAxios(baseURL = '/api') {
  const instance = axios.create({
    baseURL,
    timeout: 3000,
    withCredentials: true,
  })

  instance.interceptors.response.use(
    (response: AxiosResponse): CustomResponse => ({
      ...response,
      ok: true,
    }),
    async (error: AxiosError<Record<string, unknown>>) => {
      const defaultMsg = '请求失败，请稍后再试'
      const data = error.response?.data || {}
      const message = data.message || defaultMsg

      return {
        ...error.response,
        ok: false,
        message,
      }
    },
  )

  return {
    get: <T = unknown, R = CustomResponse<T>, D = unknown>(
      url: string,
      config?: AxiosRequestConfig<D>,
    ): Promise<R> => instance.get(url, config),

    post: <T = unknown, R = CustomResponse<T>, D = unknown>(
      url: string,
      data?: D,
      config?: AxiosRequestConfig<D>,
    ): Promise<R> => instance.post(url, data, config),

    put: <T = unknown, R = CustomResponse<T>, D = unknown>(
      url: string,
      data?: D,
      config?: AxiosRequestConfig<D>,
    ): Promise<R> => instance.put(url, data, config),

    delete: <T = unknown, R = CustomResponse<T>, D = unknown>(
      url: string,
      config?: AxiosRequestConfig<D>,
    ): Promise<R> => instance.delete(url, config),
  }
}

export const $axios = initAxios(import.meta.env.VITE_API_BASE_URL)
