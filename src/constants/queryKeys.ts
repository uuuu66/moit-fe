const queryKeys = {
  firstRegion: ['wideRegion'],
  secondRegion: (regionId: number) => ['narrowRegion', regionId],
}

export default queryKeys
