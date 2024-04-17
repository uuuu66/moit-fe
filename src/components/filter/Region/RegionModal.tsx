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
  handleSelectedFilters: (selectedNums: number[]) => void
  handleSetCenter: (value: Center) => void
  handleModalClose: () => void
}

export default function RegionModal({
  firstRegions,
  secondRegions,
  selectedFirstRegion,
  selectedFilters,
  setSelectedFirstRegion,
  handleSelectedFilters,
  handleSetCenter,
  handleModalClose,
}: RegionModalProps): JSX.Element | null {
  const [selectedSecondRegion, setSelectedSecondRegion] = useState<number[]>(
    selectedFilters ?? []
  )

  const handleSecondRegionClick = (regionItem: number): void => {
    setSelectedSecondRegion((prevRegion) => {
      if (prevRegion.includes(regionItem)) {
        return prevRegion.filter((item) => item !== regionItem)
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
          handleSecondRegionClick(regionSecondId)
        }}
      >
        <span
          className={
            selectedSecondRegion.includes(regionSecondId) ? 'selected' : ''
          }
        >
          {regionSecondName}
        </span>
        {selectedSecondRegion.includes(regionSecondId) && (
          <img src="/assets/check.svg" alt="selected" />
        )}
      </button>
    </li>
  )

  const handleResetClick = (): void => {
    setSelectedSecondRegion([])
    setSelectedFirstRegion('')
  }

  const handleDeleteRegionClick = (regionId: number): void => {
    setSelectedSecondRegion((prevRegion) =>
      prevRegion.filter((item) => item !== regionId)
    )
  }

  const handleSelectClick = (): void => {
    const currentValue = secondRegions?.find(
      ({ regionSecondId }) => regionSecondId === selectedSecondRegion[0]
    )
    if (currentValue != null) {
      const center: Center = {
        lat: currentValue.regionLat,
        lng: currentValue.regionLng,
      }
      handleSetCenter(center)
    }
    handleSelectedFilters(selectedSecondRegion)
    setLocalStorageItem('firstRegion', selectedFirstRegion)
    handleModalClose()
  }

  return (
    <ModalPortal>
      <Background onClick={handleModalClose}>
        <FilterContainer
          onClick={(e) => {
            e.stopPropagation()
          }}
          $isHigherPB={selectedSecondRegion.length !== 0}
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
                {selectedSecondRegion?.map((item) => (
                  <div key={item}>
                    <span>
                      {
                        secondRegions?.find(
                          ({ regionSecondId }) => regionSecondId === item
                        )?.regionSecondName
                      }
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        handleDeleteRegionClick(item)
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
                handleClick={handleSelectClick}
                style={{ width: '100%', background: theme.color.primary100 }}
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
