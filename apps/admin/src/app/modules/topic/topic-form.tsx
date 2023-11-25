import { Form, Input, InputNumber } from 'antd'
import { Topic, CreateTopicDto } from './topic.service'

interface Props {
  topic?: Topic
  onFinish: (topic: CreateTopicDto) => void
}

export default ({ topic, onFinish }: Props) => {
  const [form] = Form.useForm<CreateTopicDto>()

  return (
    <Form
      name="topic"
      form={form}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
      initialValues={topic}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item
        label="名称"
        name="name"
        rules={[{ required: true, message: '请输入名称' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="CODE"
        name="code"
        rules={[{ required: true, message: '请输入 CODE' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="排序码"
        name="orderIndex"
        rules={[{ required: true, message: '请输入排序码' }]}
      >
        <InputNumber className="!w-[100%]" />
      </Form.Item>
    </Form>
  )
}
