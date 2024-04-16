import { useState } from 'react'
import ModalPortal from '@/components/modals/ModalPortal'
import {
  Background,
  BottomBox,
  BottomBoxNav,
  FilterContainer,
  FilterTitle,
  SelectedTagBox,
} from '@/components/filter/FilterFrame/styles'
import CommonButton from '@/components/common/Button/CommonButton'
import { theme } from '@/constants/theme'

interface CareerModalProps {
  careerItems: Array<{ careerName: string; id: number }>
  selectedFilters: number[]
  handleSelectedFilters: (selectedNums: number[]) => void
  handleModalClose: () => void
}

export default function CareerModal({
  careerItems,
  selectedFilters,
  handleSelectedFilters,
  handleModalClose,
}: CareerModalProps): JSX.Element {
  const [selectedCareer, setSelectedCareer] = useState<number[]>(
    selectedFilters ?? []
  )

  // 선택한 경력이 보임
  const handleCareerClick = (careerItem: number): void => {
    setSelectedCareer((prevCareer) => {
      if (prevCareer.includes(careerItem)) {
        return prevCareer.filter((item) => item !== careerItem)
      }
      const currentCareer = [...prevCareer, careerItem]
      return currentCareer.sort((a, b) => a - b)
    })
  }

  // 선택한 경력 취소
  const handleDeleteCareerClick = (careerItem: number): void => {
    setSelectedCareer((prevCareer) =>
      prevCareer.filter((item) => item !== careerItem)
    )
  }

  // 기술 나열
  const renderCareerItem = ({
    careerName,
    id,
  }: {
    careerName: string
    id: number
  }): JSX.Element => (
    <li key={id}>
      <button
        type="button"
        onClick={() => {
          handleCareerClick(id)
        }}
      >
        <span className={selectedCareer.includes(id) ? 'selected' : ''}>
          {careerName}
        </span>
        {selectedCareer.includes(id) && (
          <img src="/assets/check.svg" alt="selected" />
        )}
      </button>
    </li>
  )

  const handleResetClick = (): void => {
    setSelectedCareer([])
  }

  const handleSelectClick = (): void => {
    handleSelectedFilters(selectedCareer)
    handleModalClose()
  }

  return (
    <ModalPortal>
      <Background onClick={handleModalClose}>
        <FilterContainer
          onClick={(e) => {
            e.stopPropagation()
          }}
          $isHigherPB={selectedCareer.length !== 0}
        >
          <hr />
          <FilterTitle>경력</FilterTitle>
          <ul>{careerItems.map((item) => renderCareerItem(item))}</ul>
          <BottomBox>
            {selectedCareer.length !== 0 && (
              <SelectedTagBox>
                {selectedCareer.map((item) => (
                  <div key={item}>
                    <span>
                      {careerItems.find(({ id }) => id === item)?.careerName}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        handleDeleteCareerClick(item)
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
