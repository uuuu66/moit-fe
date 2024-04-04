const filterKeys = {
  firstRegion: ['firstRegion'],
  secondRegion: (regionId: string) => ['secondRegion', regionId],
}

const meetingKeys = {
  all: ['meetings'],
  lists: ['meetings', 'list'], // 전체 조회
  search: (search: string) => ['meetings', 'list', { search }],
  filter: (filter: object) => ['meetings', 'list', { ...filter }],
}

export { filterKeys, meetingKeys }
