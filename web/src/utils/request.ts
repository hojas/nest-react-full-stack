import getConfig from 'next/config'
import queryString from 'query-string'

export function getApiUrl(path: string, query: object = {}) {
  const { publicRuntimeConfig } = getConfig()
  const { apiBaseUrl } = publicRuntimeConfig
  const qStr = queryString.stringify(query, { skipEmptyString: true })
  const q = qStr ? `?${qStr}` : ''
  return `${apiBaseUrl}${path}${q}`
}

export async function getList(url: string) {
  try {
    const res = await fetch(url)
    return res.json()
  } catch {
    return {
      page: 1,
      pageSize: 16,
      total: 0,
      results: [],
    }
  }
}

export async function getItem(url: string) {
  try {
    const res = await fetch(url)
    return res.json()
  } catch (err) {
    return null
  }
}
