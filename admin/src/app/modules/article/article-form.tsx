// import { useEffect } from 'react'
import { Form, Input, Select } from 'antd'
import { Topic } from '../topic/topic.service'
import { Article, CreateArticleDto } from './article.service'

interface Props {
  topicList: Topic[]
  article?: Article
  onFinish: (article: CreateArticleDto) => void
}

export default ({ topicList, article, onFinish }: Props) => {
  const [form] = Form.useForm<CreateArticleDto>()

  // useEffect(() => {
  //   form && form.resetFields && form.resetFields(['title', 'topicId'])
  // }, [form, article])

  return (
    <Form
      name="article"
      form={form}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
      initialValues={article}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item
        label="标题"
        name="title"
        rules={[{ required: true, message: '请输入标题' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="分类"
        name="topicId"
        rules={[{ required: true, message: '请选择分类' }]}
      >
        <Select>
          {topicList.map(topic => (
            <Select.Option key={topic.id} value={topic.id}>
              {topic.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  )
}
