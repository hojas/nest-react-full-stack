export type Pagination<T> = {
  page: number;
  pageSize: number;
  count?: number;
  results?: T[];
};
