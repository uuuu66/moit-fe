/* eslint-disable import/prefer-default-export */
type Service = 'naver' | 'kakao'

interface User {
  username: string
  accessToken: string
  refreshToken: string
}
export type { Service, User }
