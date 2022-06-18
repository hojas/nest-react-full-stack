import axios from 'axios'

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
