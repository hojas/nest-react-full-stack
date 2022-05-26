import axios, { AxiosError, AxiosResponse } from 'axios'
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

declare module 'axios' {
  export interface AxiosRequestConfig {
    showError?: boolean
  }

  export interface AxiosResponse {
    ok: boolean
  }

  export interface AxiosError {
    ok: boolean
  }
}

export const instance = axios.create({
  baseURL: process.env['NEXT_PUBLIC_BASE_URL'],
  timeout: 3000,
  showError: true,
})

instance.interceptors.request.use(config => {
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
