interface Meeting {
  meetingId: number
  meetingName: string
  contents: string
  address: string
  registeredCount: number
  totalCount: number
  skills: string[]
  date: string
  startTime: string
  endTime: string
  locationLat: number
  locationLong: number
}

export type { Meeting }
