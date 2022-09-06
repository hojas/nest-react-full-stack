import getConfig from 'next/config'
import { initAxios } from '@nx-blog/shared/axios'

const { publicRuntimeConfig } = getConfig()

export const $axios = initAxios(publicRuntimeConfig.baseURL)
