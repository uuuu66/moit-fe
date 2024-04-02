import { useState } from 'react'
import CommonButton from '../Button/CommonButton'
import ModalPortal from '@/components/modals/ModalPortal'
import {
  Background,
  BottomBox,
  BottomBoxNav,
  FilterContainer,
  FilterTitle,
  ModalBtn,
  SelectedStack,
  TechStackInput,
} from '../FilterFrame/styles'

const techStackItems: string[] = [
  'java',
  'javascript',
  'typescript',
  'react',
  'vue',
  'svelte',
  'nextjs',
  'kotlin',
  'express',
  'sql',
  'mysql',
  'linux',
  'swift',
  'python',
  'ios',
  'c#',
]

function TechStack(): JSX.Element {
  const [isShow, setIsShow] = useState(false)
  const [selectedStack, setSelectedStack] = useState<string[]>([])
  const [searchItem, setSearchItem] = useState('')

  const handleVisibleClick = (): void => {
    setIsShow(!isShow)
  }

  // 선택한 기술이 보임
  const handleStackClick = (stackItem: string): void => {
    setSelectedStack((prevStack) => {
      if (prevStack.includes(stackItem)) {
        return prevStack.filter((item) => item !== stackItem)
      }
      return [...prevStack, stackItem]
    })
  }

  // 선택한 기술 취소
  const handleDeleteStackClick = (stackItem: string): void => {
    setSelectedStack((prevStack) =>
      prevStack.filter((item) => item !== stackItem)
    )
  }

  // 기술 나열
  const renderTechStackItem = (item: string): JSX.Element => (
    <li key={item}>
      <button
        type="button"
        className={selectedStack.includes(item) ? 'selected' : ''}
        onClick={() => {
          handleStackClick(item)
        }}
      >
        <span>{item}</span>
        <span>{selectedStack.includes(item) && <span>V</span>}</span>
      </button>
    </li>
  )

  const handleSearchInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setSearchItem(e.target.value.toLowerCase())
  }

  // 검색해서 필터링
  const filteredTechStackItems = techStackItems.filter((item) =>
    item.toLowerCase().includes(searchItem)
  )

  const handleResetClick = (): void => {
    setSelectedStack([])
  }

  return (
    <>
      <ModalBtn type="button" onClick={handleVisibleClick}>
        기술스택
      </ModalBtn>
      <ModalPortal>
        {isShow ? (
          // TechStackContainer는 메인, 생성에 따라 보임새만 다르면 될 듯
          <Background onClick={handleVisibleClick}>
            <FilterContainer
              onClick={(e) => {
                e.stopPropagation()
              }}
            >
              <FilterTitle>기술스택</FilterTitle>
              <TechStackInput
                placeholder="기술 스택을 검색해 주세요"
                value={searchItem}
                onChange={handleSearchInputChange}
              />
              <ul>
                {filteredTechStackItems.map((item) =>
                  renderTechStackItem(item)
                )}
              </ul>
              <BottomBox>
                <SelectedStack>
                  {selectedStack.map((item) => (
                    <div key={item}>
                      <span>{item}</span>
                      <button
                        type="button"
                        onClick={() => {
                          handleDeleteStackClick(item)
                        }}
                      >
                        X
                      </button>
                    </div>
                  ))}
                </SelectedStack>
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

export default TechStack
