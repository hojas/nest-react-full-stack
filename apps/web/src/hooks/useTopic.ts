import { getApiUrl, getItem } from '../utils/request'

const api = {
  topic: '/topic/',
}

export function useTopic() {
  const url = getApiUrl(api.topic)

  function getTopicList() {
    return getItem(url)
  }

  return {
    getTopicList,
  }
}
