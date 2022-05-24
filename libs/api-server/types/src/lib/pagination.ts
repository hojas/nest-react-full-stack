// default page size
export const PAGE_SIZE = 16

export interface Pagination<T> {
  page: number
  page_size: number
  count?: number
  results?: T[]
}
