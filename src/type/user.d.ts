type Service = 'naver' | 'kakao'

interface Profile {
  enterMeeting: number
  studyTime: string
  heldMeeting: number
}

export type { Service, Profile }
