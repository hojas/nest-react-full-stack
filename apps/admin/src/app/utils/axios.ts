import { initAxios } from '@nest-react-blog/axios'

export const $axios = initAxios(import.meta.env.VITE_API_BASE_URL)
