import { useEffect } from 'react'
import { Form, Input, InputNumber } from 'antd'
import { Category, CreateCategoryDto } from './category.service'

interface Props {
  category?: Category
  onFinish: (category: CreateCategoryDto) => void
}

export default ({ category, onFinish }: Props) => {
  const [form] = Form.useForm<CreateCategoryDto>()

  useEffect(() => {
    form.resetFields(['code', 'name', 'orderIndex'])
  }, [category])

  return (
    <Form
      name="category"
      form={form}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
      initialValues={category}
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
