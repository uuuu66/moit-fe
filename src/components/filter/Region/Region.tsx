import { memo, useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { ModalBtn } from '../FilterFrame/styles'
import RegionModal from './RegionModal'
import { type Center } from '@/type/meeting'
import { filterKeys } from '@/constants/queryKeys'
import { getFirstRegions, getSecondRegions } from '@/apis/filter'
import { getLocalStorageItem } from '@/util/localStorage'
import { type FiltersKey } from '@/type/filter'

interface RegionProps {
  selectedFilters: number[]
  handleSelectedFilters: (
    filterName: FiltersKey,
    selectedNums: number[]
  ) => void
  handleSetCenter: (value: Center) => void
}

export default memo(function Region({
  selectedFilters,
  handleSelectedFilters,
  handleSetCenter,
}: RegionProps): JSX.Element {
  const [isShow, setIsShow] = useState<boolean>(false)
  const handleVisibleClick = (): void => {
    setIsShow(!isShow)
  }

  const [regionName, setRegionName] = useState(
    (getLocalStorageItem('regionName') as string) ?? '지역'
  )
  const { data: firstRegions } = useQuery({
    queryKey: filterKeys.firstRegion,
    queryFn: async () => await getFirstRegions(),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  })

  const [selectedFirstRegion, setSelectedFirstRegion] = useState(
    (getLocalStorageItem('firstRegion') as string) ?? ''
  )

  const { data: secondRegions } = useQuery({
    queryKey: filterKeys.secondRegion(selectedFirstRegion),
    queryFn: async () => await getSecondRegions(selectedFirstRegion),
    enabled: !(selectedFirstRegion.length === 0),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  })

  useEffect(() => {
    if (selectedFilters.length === 0) {
      setRegionName('지역')
    }
  }, [selectedFilters])

  return (
    <>
      <ModalBtn
        type="button"
        onClick={handleVisibleClick}
        $isShow={isShow}
        className={selectedFilters.length !== 0 ? 'filter-btn-selected' : ''}
      >
        {regionName}
        {selectedFilters.length !== 0 ? (
          <img src="/assets/downSelected.svg" alt="down" />
        ) : (
          <img src="/assets/down.svg" alt="down" />
        )}
      </ModalBtn>
      {isShow && (
        <RegionModal
          firstRegions={firstRegions}
          secondRegions={secondRegions}
          selectedFirstRegion={selectedFirstRegion}
          selectedFilters={selectedFilters}
          setSelectedFirstRegion={(name: string) => {
            setSelectedFirstRegion(name)
          }}
          handleSelectedFilters={handleSelectedFilters}
          handleRegionName={(name: string) => {
            setRegionName(name)
          }}
          handleSetCenter={handleSetCenter}
          handleModalClose={() => {
            setIsShow(false)
          }}
        />
      )}
    </>
  )
})
