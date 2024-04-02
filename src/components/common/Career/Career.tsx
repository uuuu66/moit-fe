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

const careerItems: string[] = [
  '신입',
  '주니어(1~4)',
  '미들(5~8)',
  '시니어(9~12)',
  '엑스퍼트(13이상)',
]

function Career(): JSX.Element {
  const [isShow, setIsShow] = useState(false)
  const [selectedCareer, setSelectedCareer] = useState<string[]>([])

  const handleVisibleClick = (): void => {
    setIsShow(!isShow)
  }

  // 선택한 경력이 보임
  const handleCareerClick = (careerItem: string): void => {
    setSelectedCareer((prevCareer) => {
      if (prevCareer.includes(careerItem)) {
        return prevCareer.filter((item) => item !== careerItem)
      }
      return [...prevCareer, careerItem]
    })
  }

  // 선택한 경력 취소
  const handleDeleteCareerClick = (careerItem: string): void => {
    setSelectedCareer((prevCareer) =>
      prevCareer.filter((item) => item !== careerItem)
    )
  }

  // 기술 나열
  const renderCareerItem = (item: string): JSX.Element => (
    <li key={item}>
      <button
        type="button"
        className={selectedCareer.includes(item) ? 'selected' : ''}
        onClick={() => {
          handleCareerClick(item)
        }}
      >
        <span>{item}</span>
        <span>{selectedCareer.includes(item) && <span>V</span>}</span>
      </button>
    </li>
  )

  const handleResetClick = (): void => {
    setSelectedCareer([])
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
                      <span>{item}</span>
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
                  <CommonButton size="small">선택 완료하기</CommonButton>
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
