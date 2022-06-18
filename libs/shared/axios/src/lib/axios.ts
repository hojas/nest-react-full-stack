import axios, { AxiosError, AxiosResponse, AxiosRequestConfig } from 'axios'
import { format } from 'date-fns'

interface TransformFn {
  (src: any): any
}

const isPlainObject = (src: any): boolean =>
  Object.prototype.toString.call(src) === '[object Object]'

// 对象模型转换
const transformModel = (src: any, cb: TransformFn): any => {
  if (Array.isArray(src)) {
    return src.map((item: any) => transformModel(item, cb))
  }

  if (isPlainObject(src)) {
    const keys = Object.keys(src)
    const result: any = {}

    keys.forEach(key => {
      const k = cb(key)

      if (k === 'createdAt' || k === 'updatedAt') {
        result[k] = format(new Date(src[key]), 'yyyy-MM-dd HH:mm:ss')
      } else {
        result[k] = transformModel(src[key], cb)
      }
    })

    return result
  }

  return src
}

// 将对象转换为模型
// { userId: 1 } => { user_id: 1 }
const objToModel = (src: any): any =>
  transformModel(src, (key: string) =>
    key.replace(/([A-Z])/, (_match, p1) => '_' + p1.toLowerCase())
  )

// 将模型转换为对象
// { user_id: 1 } => { userId: 1 }
const modelToObj = (src: any): any =>
  transformModel(src, (key: string) =>
    key.replace(/_([a-z])/, (_match, p1) => p1.toUpperCase())
  )

const instance = axios.create({
  baseURL: process.env['NEXT_PUBLIC_BASE_URL'],
  timeout: 3000,
})

instance.interceptors.request.use((config: AxiosRequestConfig) => {
  const { data } = config

  if (data) {
    Object.keys(data).forEach(key => {
      data[key] = objToModel(data[key])
    })

    config.data = objToModel(data)
  }

  return config
})

instance.interceptors.response.use(
  (response: AxiosResponse) => ({
    ...response,
    ok: true,
    data: modelToObj(response.data),
  }),
  async (error: AxiosError) => {
    const {
      response = {
        ok: false,
        data: {
          message: '请求失败，请稍后再试',
        },
      },
    } = error

    return response
  }
)

export interface MyRequestConfig<D = any> extends AxiosRequestConfig<D> {
  showError?: boolean
}

export interface MyResponse<T = any, D = any> extends AxiosResponse<T, D> {
  ok: boolean
}

export const $axios = {
  get: <T = any, R = MyResponse<T>, D = any>(
    url: string,
    config?: MyRequestConfig<D>
  ): Promise<R> => {
    return instance.get(url, config)
  },

  post: <T = any, R = MyResponse<T>, D = any>(
    url: string,
    data?: D,
    config?: MyRequestConfig<D>
  ): Promise<R> => {
    return instance.post(url, data, config)
  },

  put: <T = any, R = MyResponse<T>, D = any>(
    url: string,
    data?: D,
    config?: MyRequestConfig<D>
  ): Promise<R> => {
    return instance.put(url, data, config)
  },

  delete: <T = any, R = MyResponse<T>, D = any>(
    url: string,
    config?: MyRequestConfig<D>
  ): Promise<R> => {
    return instance.delete(url, config)
  },
}
