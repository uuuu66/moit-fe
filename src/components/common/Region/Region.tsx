import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import CommonButton from '../Button/CommonButton'
import ModalPortal from '@/components/modals/ModalPortal'
import {
  Background,
  BottomBox,
  BottomBoxNav,
  FilterContainer,
  FilterTitle,
  ListBox,
  SelectedStack,
} from '../FilterFrame/styles'
import { filterKeys } from '@/constants/queryKeys'
import { getFirstRegions, getSecondRegions } from '@/apis/filter'
import { type SecondRegion, type FirstRegion } from '@/type/filter'

interface RegionProps {
  handleModalClose: () => void
}

export default function Region({
  handleModalClose,
}: RegionProps): JSX.Element | null {
  const { data: firstRegions } = useQuery({
    queryKey: filterKeys.firstRegion,
    queryFn: async () => await getFirstRegions(),
  })
  //
  const [selectedFirstRegion, setSelectedFirstRegion] = useState(
    localStorage.getItem('firstRegion') ?? '1'
  )

  const localSecondRegion = localStorage.getItem('secondRegion')
  const [selectedSecondRegion, setSelectedSecondRegion] =
    useState<SecondRegion>(
      localSecondRegion !== null
        ? (JSON.parse(localSecondRegion) as SecondRegion)
        : {
            regionSecondId: 1,
            regionSecondName: '서울 전체',
          }
    )

  const { data: secondRegions } = useQuery({
    queryKey: filterKeys.secondRegion(selectedFirstRegion),
    queryFn: async () => await getSecondRegions(selectedFirstRegion),
  })

  const renderFirstRegions = ({
    regionFirstId,
    regionFirstName,
  }: FirstRegion): JSX.Element => (
    <li key={regionFirstId}>
      <button
        type="button"
        style={{
          background:
            selectedFirstRegion === String(regionFirstId) ? '#ddd' : '#fff',
        }}
        onClick={() => {
          setSelectedFirstRegion(String(regionFirstId))
        }}
      >
        <span>{regionFirstName}</span>
      </button>
    </li>
  )

  const renderSecondRegions = ({
    regionSecondId,
    regionSecondName,
  }: SecondRegion): JSX.Element => (
    <li key={regionSecondId}>
      <button
        type="button"
        className={
          selectedSecondRegion.regionSecondId === regionSecondId
            ? 'selected'
            : ''
        }
        onClick={() => {
          setSelectedSecondRegion({ regionSecondId, regionSecondName })
        }}
      >
        <span>{regionSecondName}</span>
        <span>
          {String(selectedSecondRegion.regionSecondId) ===
            String(regionSecondId) && <span>V</span>}
        </span>
      </button>
    </li>
  )

  const handleResetClick = (): void => {
    setSelectedFirstRegion('1')
    setSelectedSecondRegion({
      regionSecondId: 1,
      regionSecondName: '서울 전체',
    })
  }

  const handleSelectClick = (): void => {
    localStorage.setItem(
      'firstRegion',
      selectedSecondRegion.regionSecondId === 0 ? '1' : selectedFirstRegion
    )
    localStorage.setItem(
      'secondRegion',
      JSON.stringify(
        selectedSecondRegion.regionSecondId === 0
          ? {
              regionSecondId: 1,
              regionSecondName: '서울 전체',
            }
          : selectedSecondRegion
      )
    )
  }

  return (
    <ModalPortal>
      <Background onClick={handleModalClose}>
        <FilterContainer
          onClick={(e) => {
            e.stopPropagation()
          }}
        >
          <FilterTitle>모임 지역</FilterTitle>
          <ListBox>
            {firstRegions != null && (
              <ul>{firstRegions.map((item) => renderFirstRegions(item))}</ul>
            )}
            {secondRegions != null && (
              <ul>{secondRegions.map((item) => renderSecondRegions(item))}</ul>
            )}
          </ListBox>
          <BottomBox>
            <SelectedStack>
              {selectedSecondRegion.regionSecondName !== '' && (
                <div>
                  <span>{selectedSecondRegion.regionSecondName}</span>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedSecondRegion({
                        regionSecondId: 0,
                        regionSecondName: '',
                      })
                    }}
                  >
                    X
                  </button>
                </div>
              )}
            </SelectedStack>
            <BottomBoxNav>
              <button type="button" onClick={handleResetClick}>
                초기화
              </button>
              <CommonButton size="small" handleClick={handleSelectClick}>
                선택 완료하기
              </CommonButton>
            </BottomBoxNav>
          </BottomBox>
        </FilterContainer>
      </Background>
    </ModalPortal>
  )
}
