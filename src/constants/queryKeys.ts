import { type MyMeetingsStatus } from '@/type/meeting'

const filterKeys = {
  all: ['filters'],
  firstRegion: ['filters', 'firstRegion'],
  secondRegion: (regionId: string) => ['filters', 'secondRegion', regionId],
  stackList: ['filters', 'stackList'],
}

const meetingKeys = {
  all: ['meetings'],
  lists: ['meetings', 'list'],
  search: (search: string) => ['meetings', 'list', { search }],
  filter: (filter: object) => ['meetings', 'list', { ...filter }],
  myMeetings: (status: MyMeetingsStatus) => ['meetings', 'list', { status }],
  popular: ['popular'],
  detail: (meetingId: string | number | undefined) => [
    'meetings',
    'detail',
    meetingId,
  ],
}

const userKeys = {
  profile: ['profile'],
  bookmarks: ['bookmarks'],
}

export { filterKeys, meetingKeys, userKeys }
