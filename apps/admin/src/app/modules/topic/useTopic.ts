import { useState, useEffect } from 'react'
import { message } from 'antd'
import {
  Topic,
  CreateTopicDto,
  TopicService,
} from './topic.service'

export const useTopic = () => {
  const [topicList, setTopicList] = useState<Topic[]>([])

  const getTopicList = async () => {
    const { ok, data } = await TopicService.getTopicList()
    ok && setTopicList(data)
  }

  useEffect(() => {
    getTopicList()
  }, [])

  const addTopic = async (topic: CreateTopicDto) => {
    const { ok, message: msg } = await TopicService.createTopic(topic)

    if (ok) {
      getTopicList()
      message.success('添加分类成功')
    } else {
      message.error(msg)
    }

    return ok
  }

  const updateTopic = async (id: number, topic: CreateTopicDto) => {
    const { ok, message: msg } = await TopicService.updateTopic(
      id,
      topic
    )

    if (ok) {
      getTopicList()
      message.success('更新分类成功')
    } else {
      message.error(msg)
    }

    return ok
  }

  const removeTopic = async (id: number) => {
    await TopicService.removeTopic(id)
    getTopicList()
  }

  return {
    topicList,
    addTopic,
    updateTopic,
    removeTopic,
  }
}
