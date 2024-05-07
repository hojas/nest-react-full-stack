import { $axios } from '~/app/utils/axios'

const api = {
  list: '/admin/topic/',
  detail: (id: number) => `/admin/topic/${id}/`,
}

export interface CreateTopicDto {
  code: string
  name: string
  orderIndex: number
}

export interface Topic extends CreateTopicDto {
  id: number
}

export class TopicService {
  static getTopicList() {
    return $axios.get<Topic[]>(api.list)
  }

  static createTopic(topic: CreateTopicDto) {
    return $axios.post<Topic>(api.list, { topic })
  }

  static updateTopic(id: number, topic: CreateTopicDto) {
    return $axios.put<Topic>(api.detail(id), { topic })
  }

  static removeTopic(id: number) {
    return $axios.delete<Topic>(api.detail(id))
  }
}
