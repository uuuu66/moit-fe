import { useState } from 'react'
import ModalPortal from '@/components/modals/ModalPortal'
import {
  Background,
  BottomBox,
  BottomBoxNav,
  FilterContainer,
  FilterTitle,
  SelectedTagBox,
  SearchInputBox,
  ToggleButton,
} from '../FilterFrame/styles'
import { type TechStackLists, type TechStackList } from '@/type/filter'
import CommonButton from '@/components/common/Button/CommonButton'
import { theme } from '@/constants/theme'

interface TechStackModalProps {
  techItems: TechStackLists
  selectedFilters: number[]
  handleSelectedFilters: (
    selectedNums: number[],
    selectedNames?: string[]
  ) => void
  handleModalClose: () => void
}

export default function TechStackModal({
  techItems,
  selectedFilters,
  handleSelectedFilters,
  handleModalClose,
}: TechStackModalProps): JSX.Element {
  const [searchItem, setSearchItem] = useState<string>('')
  const [selectedStackItems, setSelectedStackItems] = useState<number[]>(
    selectedFilters ?? []
  )

  // 기술 선택
  const handleStackClick = (stackItem: number): void => {
    setSelectedStackItems((prevStack) => {
      if (prevStack.includes(stackItem)) {
        return prevStack.filter((item) => item !== stackItem)
      }
      const currentStack = [...prevStack, stackItem]
      return currentStack.sort((a, b) => a - b)
    })
  }

  // 선택한 기술 취소 (X 버튼)
  const handleDeleteStackClick = (stackItem: number): void => {
    setSelectedStackItems((prevStack) =>
      prevStack.filter((item) => item !== stackItem)
    )
  }

  // 기술 나열
  const renderTechStackItem = (item: {
    skillId: number
    skillName: string
  }): JSX.Element => (
    <li key={item.skillId}>
      <button
        type="button"
        onClick={() => {
          handleStackClick(item.skillId)
        }}
      >
        <span
          className={
            selectedStackItems.includes(item.skillId) ? 'selected' : ''
          }
        >
          {item.skillName}
        </span>
        {selectedStackItems.includes(item.skillId) && (
          <img src="/assets/check.svg" alt="selected" />
        )}
      </button>
    </li>
  )

  const handleSearchInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setSearchItem(e.target.value.toLowerCase())
  }

  // 검색해서 필터링
  const filteredTechStackItems: TechStackList[] =
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    techItems?.filter(
      (item: TechStackList) => item.skillName.toLowerCase().includes(searchItem)
      // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    ) || []

  const handleResetClick = (): void => {
    setSelectedStackItems([])
  }

  const selectedStacksName = selectedStackItems.map(
    (id) => techItems?.find(({ skillId }) => skillId === id)?.skillName
  )

  const handleCompleteClick = (): void => {
    handleSelectedFilters(selectedStackItems, selectedStacksName as string[])
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
          <FilterTitle>기술스택</FilterTitle>
          <SearchInputBox>
            <input
              placeholder="기술 스택을 검색해 주세요"
              value={searchItem}
              onChange={handleSearchInputChange}
            />
          </SearchInputBox>
          <ul style={{ height: '534px' }}>
            {filteredTechStackItems.map((item: TechStackList) =>
              renderTechStackItem(item)
            )}
          </ul>
          <BottomBox>
            {selectedStackItems.length !== 0 && (
              <SelectedTagBox>
                {selectedStackItems?.map((selectedId) => (
                  <div key={selectedId}>
                    <span>
                      {
                        techItems?.find(({ skillId }) => skillId === selectedId)
                          ?.skillName
                      }
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        handleDeleteStackClick(selectedId)
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
                handleClick={handleCompleteClick}
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
