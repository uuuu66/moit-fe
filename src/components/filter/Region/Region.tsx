import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { ModalBtn } from '../FilterFrame/styles'
import RegionModal from './RegionModal'
import { type Center } from '@/type/meeting'
import { filterKeys } from '@/constants/queryKeys'
import { getFirstRegions, getSecondRegions } from '@/apis/filter'
import { getLocalStorageItem } from '@/util/localStorage'

interface RegionProps {
  selectedFilters: number[]
  handleSelectedFilters: (selectedNums: number[]) => void
  handleSetCenter: (value: Center) => void
}

export default function Region({
  selectedFilters,
  handleSelectedFilters,
  handleSetCenter,
}: RegionProps): JSX.Element {
  const [isShow, setIsShow] = useState<boolean>(false)
  const handleVisibleClick = (): void => {
    setIsShow(!isShow)
  }

  const { data: firstRegions } = useQuery({
    queryKey: filterKeys.firstRegion,
    queryFn: async () => await getFirstRegions(),
  })

  const [selectedFirstRegion, setSelectedFirstRegion] = useState(
    (getLocalStorageItem('firstRegion') as string) ?? ''
  )

  const { data: secondRegions } = useQuery({
    queryKey: filterKeys.secondRegion(selectedFirstRegion),
    queryFn: async () => await getSecondRegions(selectedFirstRegion),
    enabled: !(selectedFirstRegion.length === 0),
  })

  const getSelectedRegionName = (): string => {
    const firstRegion = firstRegions?.find(
      ({ regionFirstId }) => regionFirstId === Number(selectedFirstRegion)
    )?.regionFirstName

    const secondRegion = secondRegions?.find(
      ({ regionSecondId }) => regionSecondId === selectedFilters[0]
    )?.regionSecondName

    if (firstRegion == null || secondRegion == null) return '지역'

    return secondRegion.includes('전체')
      ? secondRegion
      : `${firstRegion.slice(0, 2)} ${secondRegion}`
  }

  const filterDisplayName = (): string => {
    if (!(firstRegions != null && secondRegions != null)) return '지역'

    return selectedFilters.length !== 0 ? getSelectedRegionName() : '지역'
  }

  return (
    <>
      <ModalBtn type="button" onClick={handleVisibleClick}>
        {filterDisplayName()}
        <img src="/assets/toggleDown.svg" alt="down" />
      </ModalBtn>
      {/* {isShow && ( */}
      <RegionModal
        firstRegions={firstRegions}
        secondRegions={secondRegions}
        selectedFirstRegion={selectedFirstRegion}
        selectedFilters={selectedFilters}
        setSelectedFirstRegion={(name: string) => {
          setSelectedFirstRegion(name)
        }}
        handleSelectedFilters={handleSelectedFilters}
        handleSetCenter={handleSetCenter}
        handleModalClose={() => {
          setIsShow(false)
        }}
      />
      {/* )} */}
    </>
  )
}
