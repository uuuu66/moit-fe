type Service = 'naver' | 'kakao'

interface Profile {
  enterMeeting: number
  studyTime: string
  heldMeeting: number
}
interface User {
  username: string
  accessToken: string
  refreshToken: string
}
export type { Service, Profile, User }
