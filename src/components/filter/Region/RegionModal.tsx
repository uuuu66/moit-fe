import { useState } from 'react'
import ModalPortal from '@/components/modals/ModalPortal'
import {
  Background,
  BottomBox,
  BottomBoxNav,
  FilterContainer,
  FilterTitle,
  ListBox,
  SelectedTagBox,
  ToggleButton,
} from '../FilterFrame/styles'
import {
  type SecondRegion,
  type FirstRegion,
  type FirstRegions,
  type SecondRegions,
  type FiltersKey,
} from '@/type/filter'
import CommonButton from '@/components/common/Button/CommonButton'
import { type Center } from '@/type/meeting'
import { setLocalStorageItem } from '@/util/localStorage'
import { theme } from '@/constants/theme'

interface RegionModalProps {
  firstRegions: FirstRegions | undefined
  secondRegions: SecondRegions | undefined
  selectedFirstRegion: string
  selectedFilters: number[]
  setSelectedFirstRegion: (name: string) => void
  handleSelectedFilters: (
    filterName: FiltersKey,
    selectedNums: number[]
  ) => void
  handleRegionName: (name: string) => void
  handleSetCenter: (value: Center) => void
  handleModalClose: () => void
}

interface SelectedSecondRegion {
  name: string
  id: number
}

export default function RegionModal({
  firstRegions,
  secondRegions,
  selectedFirstRegion,
  selectedFilters,
  setSelectedFirstRegion,
  handleSelectedFilters,
  handleRegionName,
  handleSetCenter,
  handleModalClose,
}: RegionModalProps): JSX.Element | null {
  const [selectedSecondRegion, setSelectedSecondRegion] = useState<
    SelectedSecondRegion[]
  >(
    selectedFilters.length !== 0
      ? [
          {
            name:
              secondRegions?.find(
                ({ regionSecondId }) => regionSecondId === selectedFilters[0]
              )?.regionSecondName ?? '',
            id: selectedFilters[0],
          },
        ]
      : []
  )

  const handleSecondRegionClick = (regionItem: SelectedSecondRegion): void => {
    setSelectedSecondRegion((prevRegion) => {
      if (prevRegion.includes(regionItem)) {
        return prevRegion.filter(({ id }) => id !== regionItem.id)
      }
      return [regionItem]
    })
  }

  const renderFirstRegions = ({
    regionFirstId,
    regionFirstName,
  }: FirstRegion): JSX.Element => (
    <li key={regionFirstId}>
      <button
        type="button"
        style={{
          background:
            selectedFirstRegion === String(regionFirstId)
              ? theme.color.white
              : theme.color.bg1,
          color:
            selectedFirstRegion === String(regionFirstId)
              ? theme.color.primary100
              : theme.color.black30,
        }}
        onClick={() => {
          setSelectedFirstRegion(String(regionFirstId))
        }}
      >
        <span>{regionFirstName.slice(0, 2)}</span>
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
        onClick={() => {
          handleSecondRegionClick({
            id: regionSecondId,
            name: regionSecondName,
          })
        }}
      >
        <span
          className={
            selectedSecondRegion.find(({ id }) => id === regionSecondId) != null
              ? 'selected'
              : ''
          }
        >
          {regionSecondName}
        </span>
        {selectedSecondRegion.find(({ id }) => id === regionSecondId) !=
          null && <img src="/assets/check.svg" alt="selected" />}
      </button>
    </li>
  )

  const handleResetClick = (): void => {
    setSelectedSecondRegion([])
    setSelectedFirstRegion('')
  }

  const handleDeleteRegionClick = (regionId: number): void => {
    setSelectedSecondRegion((prevRegion) =>
      prevRegion.filter(({ id }) => id !== regionId)
    )
  }

  const getSelectedRegionName = (): string => {
    const firstRegion = firstRegions?.find(
      ({ regionFirstId }) => regionFirstId === Number(selectedFirstRegion)
    )?.regionFirstName
    const secondRegion = selectedSecondRegion[0]?.name

    if (firstRegion == null || secondRegion == null) return '지역'

    return secondRegion.includes('전체')
      ? secondRegion
      : `${firstRegion.slice(0, 2)} ${secondRegion}`
  }

  const handleSelectClick = (): void => {
    const currentValue = secondRegions?.find(
      ({ regionSecondId }) => regionSecondId === selectedSecondRegion[0]?.id
    )
    if (currentValue != null) {
      const center: Center = {
        lat: currentValue.regionLat,
        lng: currentValue.regionLng,
      }
      handleSetCenter(center)
    }
    handleSelectedFilters(
      'region',
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      selectedSecondRegion[0] ? [selectedSecondRegion[0].id] : []
    )
    setLocalStorageItem('firstRegion', selectedFirstRegion)
    handleRegionName(getSelectedRegionName())
    setLocalStorageItem('regionName', getSelectedRegionName())
    handleModalClose()
  }

  return (
    <ModalPortal>
      <Background onClick={handleModalClose}>
        <FilterContainer
          onClick={(e) => {
            e.stopPropagation()
          }}
        >
          <ToggleButton onClick={handleModalClose}>
            <hr />
          </ToggleButton>
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
            {selectedSecondRegion.length !== 0 && (
              <SelectedTagBox>
                {selectedSecondRegion?.map(({ id, name }) => (
                  <div key={`${id}_${name}`}>
                    <span>{name}</span>
                    <button
                      type="button"
                      onClick={() => {
                        handleDeleteRegionClick(id)
                      }}
                    >
                      <img src="/assets/cancel.svg" alt="cancel" />
                    </button>
                  </div>
                ))}
              </SelectedTagBox>
            )}
            <BottomBoxNav>
              <button
                className="reset-button"
                type="button"
                onClick={handleResetClick}
              >
                <img src="/assets/resetGray.svg" alt="reset" />
                <p>초기화</p>
              </button>
              <CommonButton
                size="large"
                $type="primary"
                handleClick={handleSelectClick}
              >
                선택 완료하기
              </CommonButton>
            </BottomBoxNav>
          </BottomBox>
        </FilterContainer>
      </Background>
    </ModalPortal>
  )
}
