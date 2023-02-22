import getConfig from 'next/config'
import { initAxios } from '@nest-react-blog/axios'

const { publicRuntimeConfig } = getConfig()

export const $axios = initAxios(publicRuntimeConfig.apiBaseUrl)
