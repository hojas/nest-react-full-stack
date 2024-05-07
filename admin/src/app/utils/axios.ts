import { initAxios } from '~/app/components/axios'

export const $axios = initAxios(import.meta.env.VITE_API_BASE_URL)
