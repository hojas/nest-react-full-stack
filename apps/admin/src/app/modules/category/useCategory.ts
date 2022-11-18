import { useState, useEffect } from 'react'
import { message } from 'antd'
import {
  Category,
  CreateCategoryDto,
  CategoryService,
} from './category.service'

export const useCategory = () => {
  const [categoryList, setCategoryList] = useState<Category[]>([])

  const getCategoryList = async () => {
    const { ok, data } = await CategoryService.getCategoryList()
    ok && setCategoryList(data)
  }

  useEffect(() => {
    getCategoryList()
  }, [])

  const addCategory = async (category: CreateCategoryDto) => {
    const { ok, message: msg } = await CategoryService.createCategory(category)

    if (ok) {
      getCategoryList()
      message.success('添加分类成功')
    } else {
      message.error(msg)
    }

    return ok
  }

  const updateCategory = async (id: number, category: CreateCategoryDto) => {
    const { ok, message: msg } = await CategoryService.updateCategory(
      id,
      category
    )

    if (ok) {
      getCategoryList()
      message.success('更新分类成功')
    } else {
      message.error(msg)
    }

    return ok
  }

  const removeCategory = async (id: number) => {
    await CategoryService.removeCategory(id)
    getCategoryList()
  }

  return {
    categoryList,
    addCategory,
    updateCategory,
    removeCategory,
  }
}
