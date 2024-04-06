import { useState } from 'react'
import ModalPortal from '@/components/modals/ModalPortal'
import {
  Background,
  BottomBox,
  BottomBoxNav,
  FilterContainer,
  FilterTitle,
  ModalBtn,
  SelectedCareer,
} from '../FilterFrame/styles'
import CommonButton from '../Button/CommonButton'
import { type FiltersKey } from '@/type/filter'

const careerItems: Array<{ careerName: string; id: number }> = [
  { careerName: '신입', id: 1 },
  { careerName: '주니어(1~4)', id: 2 },
  { careerName: '미들(5~8)', id: 3 },
  { careerName: '시니어(9~12)', id: 4 },
  { careerName: '엑스퍼트(13이상)', id: 5 },
]

interface CareerProps {
  handleFilterChange: (
    filter: Partial<{
      [key in FiltersKey]: number[]
    }>
  ) => void
}

function Career({ handleFilterChange }: CareerProps): JSX.Element {
  const [isShow, setIsShow] = useState(false)
  const [selectedCareer, setSelectedCareer] = useState<number[]>([])

  const handleVisibleClick = (): void => {
    setIsShow(!isShow)
  }

  // 선택한 경력이 보임
  const handleCareerClick = (careerItem: number): void => {
    setSelectedCareer((prevCareer) => {
      if (prevCareer.includes(careerItem)) {
        return prevCareer.filter((item) => item !== careerItem)
      }
      return [...prevCareer, careerItem]
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
        className={selectedCareer.includes(id) ? 'selected' : ''}
        onClick={() => {
          handleCareerClick(id)
        }}
      >
        <span>{careerName}</span>
        <span>{selectedCareer.includes(id) && <span>V</span>}</span>
      </button>
    </li>
  )

  const handleResetClick = (): void => {
    setSelectedCareer([])
  }

  const handleSelectClick = (): void => {
    handleFilterChange({ careers: selectedCareer })
    setIsShow(!isShow)
  }

  return (
    <>
      <ModalBtn type="button" onClick={handleVisibleClick}>
        경력
      </ModalBtn>
      <ModalPortal>
        {isShow ? (
          <Background onClick={handleVisibleClick}>
            <FilterContainer
              onClick={(e) => {
                e.stopPropagation()
              }}
            >
              <FilterTitle>경력</FilterTitle>
              <ul>{careerItems.map((item) => renderCareerItem(item))}</ul>
              <BottomBox>
                <SelectedCareer>
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
                        X
                      </button>
                    </div>
                  ))}
                </SelectedCareer>
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
        ) : null}
      </ModalPortal>
    </>
  )
}

export default Career
