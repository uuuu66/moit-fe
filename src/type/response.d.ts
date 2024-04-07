type Result = 'SUCCESS' | 'ERROR' | 'FAIL'

// 기본 GET response data type
export interface CommonResponse<T> {
  resultCode: Result
  data: T
  message: string
}
// 페이지네이션이 적용되는 GET response data type
export interface Sort {
  empty: boolean
  sorted: boolean
  unsorted: boolean
}

interface Pageable {
  pageNumber: number
  pageSize: number
  sort: Sort
  offset: number
  paged: boolean
  unpaged: boolean
}

export interface PaginationData<T> {
  content: T
  pageable: Pageable
  size: number
  number: number
  sort: Sort
  numberOfElements: number
  first: boolean
  last: boolean
  empty: boolean
}

export interface PaginationResponse<T> {
  resultCode: Result
  data: PaginationData<T>
  message: string
}
