import { memo, useState } from 'react'

import { useQuery } from '@tanstack/react-query'
import TechStackModal from './TechStackModal'
import { ModalBtn } from '../FilterFrame/styles'
import { getTechStackList } from '@/apis/filter'
import getFilterDisplayNames from '@/util/getFilterDisplayNames'
import { type FiltersKey } from '@/type/filter'
import { filterKeys } from '@/constants/queryKeys'

interface TechStackProps {
  selectedFilters: number[]
  handleSelectedFilters: (
    filterName: FiltersKey,
    selectedNums: number[],
    selectedNames?: string[]
  ) => void
}

export default memo(function TechStack({
  selectedFilters,
  handleSelectedFilters,
}: TechStackProps): JSX.Element | null {
  const [isShow, setIsShow] = useState<boolean>(false)

  const { data } = useQuery({
    queryKey: filterKeys.stackList,
    queryFn: async () => await getTechStackList(),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  })

  if (data == null) return null

  const filterDisplayName =
    selectedFilters.length !== 0
      ? getFilterDisplayNames(
          data.map(({ skillName, skillId }) => ({
            name: skillName,
            id: skillId,
          })),
          selectedFilters
        )
      : '기술스택'

  const handleVisibleClick = (): void => {
    setIsShow(!isShow)
  }

  return (
    <>
      <ModalBtn
        type="button"
        onClick={handleVisibleClick}
        $isShow={isShow}
        className={selectedFilters.length !== 0 ? 'filter-btn-selected' : ''}
      >
        {filterDisplayName}
        {selectedFilters.length !== 0 ? (
          <img src="/assets/downSelected.svg" alt="down" />
        ) : (
          <img src="/assets/down.svg" alt="down" />
        )}
      </ModalBtn>
      {isShow && (
        <TechStackModal
          techItems={data}
          selectedFilters={selectedFilters}
          handleSelectedFilters={handleSelectedFilters}
          handleModalClose={() => {
            setIsShow(false)
          }}
        />
      )}
    </>
  )
})
