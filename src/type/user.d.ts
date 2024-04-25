type Service = 'naver' | 'kakao'

interface Profile {
  enterMeeting: number
  studyTime: string
  heldMeeting: number
}

interface MyMeeting {
  meetingId: number
  meetingName: string
  meetingDate: string
  meetingStartTime: string
  meetingEndTime: string
  status: 'OPEN' | 'FULL' | 'COMPLETE'
  bookmarked: boolean
}

interface User {
  username: string
  accessToken: string
  refreshToken: string
}
export type { Service, Profile, MyMeeting, User }
