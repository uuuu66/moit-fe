import { type MyMeetingsStatus, type Center } from '@/type/meeting'

const filterKeys = {
  firstRegion: ['firstRegion'],
  secondRegion: (regionId: string) => ['secondRegion', regionId],
}

const meetingKeys = {
  all: ['meetings'],
  lists: (center: Center) => ['meetings', 'list', { center }],
  search: (search: string) => ['meetings', 'list', { search }],
  filter: (filter: object) => ['meetings', 'list', { ...filter }],
  myMeetings: (status: MyMeetingsStatus) => ['meetings', 'list', { status }],
}

const userKeys = {
  profile: ['profile'],
}

export { filterKeys, meetingKeys, userKeys }
