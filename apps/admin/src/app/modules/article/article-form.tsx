// import { useEffect } from 'react'
import { Form, Input, Select } from 'antd'
import { Category } from '../category/category.service'
import { Article, CreateArticleDto } from './article.service'

interface Props {
  categoryList: Category[]
  article?: Article
  onFinish: (article: CreateArticleDto) => void
}

export default ({ categoryList, article, onFinish }: Props) => {
  const [form] = Form.useForm<CreateArticleDto>()

  // useEffect(() => {
  //   form && form.resetFields && form.resetFields(['title', 'categoryId'])
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
        name="categoryId"
        rules={[{ required: true, message: '请选择分类' }]}
      >
        <Select>
          {categoryList.map(category => (
            <Select.Option key={category.id} value={category.id}>
              {category.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  )
}
