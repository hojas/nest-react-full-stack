export interface Pagination<T> {
  page: number
  pageSize: number
  total: number
  results: T[]
}
