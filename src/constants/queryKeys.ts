import { type Center } from '@/type/meeting'

const filterKeys = {
  firstRegion: ['firstRegion'],
  secondRegion: (regionId: string) => ['secondRegion', regionId],
}

const meetingKeys = {
  all: ['meetings'],
  lists: (center: Center) => ['meetings', 'list', { center }],
  search: (search: string) => ['meetings', 'list', { search }],
  filter: (filter: object) => ['meetings', 'list', { ...filter }],
}

export { filterKeys, meetingKeys }
