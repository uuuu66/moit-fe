import { type MyMeetingsStatus } from '@/type/meeting'

const filterKeys = {
  firstRegion: ['firstRegion'],
  secondRegion: (regionId: string) => ['secondRegion', regionId],
}

const meetingKeys = {
  all: ['meetings'],
  lists: ['meetings', 'list'],
  search: (search: string) => ['meetings', 'list', { search }],
  filter: (filter: object) => ['meetings', 'list', { ...filter }],
  myMeetings: (status: MyMeetingsStatus) => ['meetings', 'list', { status }],
  popular: ['popular'],
}

const userKeys = {
  profile: ['profile'],
  bookmarks: ['bookmarks'],
}

export { filterKeys, meetingKeys, userKeys }
