import { $axios } from '../../utils/axios'

const api = {
  list: '/admin/category/',
  detail: (id: number) => `/admin/category/${id}/`,
}

export interface CreateCategoryDto {
  code: string
  name: string
  orderIndex: number
}

export interface Category extends CreateCategoryDto {
  id: number
}

export class CategoryService {
  static getCategoryList() {
    return $axios.get<Category[]>(api.list)
  }

  static createCategory(category: CreateCategoryDto) {
    return $axios.post<Category>(api.list, { category })
  }

  static updateCategory(id: number, category: CreateCategoryDto) {
    return $axios.put<Category>(api.detail(id), { category })
  }

  static removeCategory(id: number) {
    return $axios.delete<Category>(api.detail(id))
  }
}
