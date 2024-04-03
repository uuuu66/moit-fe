export interface CommonResponse<T> {
  resultCode: 'SUCCESS' | 'ERROR' | 'FAIL'
  data: T
  message: string
}
