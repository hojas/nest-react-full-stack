import getConfig from 'next/config'
import { initAxios } from '@nx-blog/axios'

const { publicRuntimeConfig } = getConfig()

export const $axios = initAxios(publicRuntimeConfig.apiBaseUrl)
