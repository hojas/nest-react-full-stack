// default page size
export const PAGE_SIZE = 16

export interface Pagination<T> {
  page: number
  pageSize: number
  count?: number
  results?: T[]
}
