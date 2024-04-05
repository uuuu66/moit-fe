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
  ModalBtn,
  SelectedStack,
  TechStackInput,
} from '../FilterFrame/styles'
import { getTechStackList } from '@/apis/filter'
import { type TechStackLists, type TechStackList } from '@/type/filter'
import { type Info } from '@/pages/Meeting/RegisterMeeting'

interface TechStackProps {
  info: Info
  setInfo: React.Dispatch<React.SetStateAction<Info>>
}

function TechStack({ info, setInfo }: TechStackProps): JSX.Element {
  const [isShow, setIsShow] = useState<boolean>(false)
  const [searchItem, setSearchItem] = useState<string>('')
  const [selectedStackItems, setSelectedStackItems] = useState<TechStackLists>(
    []
  )

  const handleVisibleClick = (): void => {
    setIsShow(!isShow)
  }

  // 기술스택 데이터 가져오기
  const { data: techItems } = useQuery({
    queryKey: ['stackList'],
    queryFn: async () => await getTechStackList(),
  })

  // 기술 선택
  const handleStackClick = (stackItem: TechStackList): void => {
    // TODO 1
    setInfo((prevStack) => {
      if (prevStack.skillIds?.includes(stackItem.skillId)) {
        setSelectedStackItems(
          selectedStackItems.filter((el) => el !== stackItem)
        )
        return {
          ...prevStack,
          skillIds: prevStack.skillIds.filter(
            (item) => item !== stackItem.skillId
          ),
        }
      }
      setSelectedStackItems([...selectedStackItems, stackItem])
      return {
        ...prevStack,
        skillIds: [...prevStack.skillIds, stackItem.skillId],
      }
    })
  }

  // 선택한 기술 취소 (X 버튼)
  const handleDeleteStackClick = (stackItem: TechStackList): void => {
    // TODO 2
    setSelectedStackItems(selectedStackItems.filter((el) => el !== stackItem))
    setInfo((prev) => {
      return {
        ...prev,
        skillIds: prev.skillIds.filter((item) => item !== stackItem.skillId),
      }
    })
  }

  // 기술 나열
  const renderTechStackItem = (item: {
    skillId: number
    skillName: string
  }): JSX.Element => (
    <li key={item.skillId}>
      <button
        type="button"
        // className={selectedStack?.includes(item.skillId) ? 'selected' : ''}
        onClick={() => {
          handleStackClick(item) // 여기가 문젠데
        }}
      >
        <span>{item.skillName}</span>
        <span>{selectedStackItems?.includes(item) && <span>V</span>}</span>
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
    // TODO 3
    setInfo({ ...info, skillIds: [] })
  }

  const handleCompleteClick = (): void => {
    setIsShow(!isShow)
  }

  return (
    <>
      <ModalBtn type="button" onClick={handleVisibleClick}>
        기술스택
      </ModalBtn>
      {selectedStackItems.map((item) => (
        <div key={item.skillId}>{item.skillName}</div>
      ))}
      <ModalPortal>
        {isShow ? (
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
                {filteredTechStackItems.map((item: TechStackList) =>
                  renderTechStackItem(item)
                )}
              </ul>
              <BottomBox>
                <SelectedStack>
                  {selectedStackItems?.map((tech) => (
                    <div key={tech.skillId}>
                      {/* 여기 span을 문자열로 바꿔서 보이게 해야함 */}
                      <span>{tech.skillName}</span>
                      <button
                        type="button"
                        onClick={() => {
                          handleDeleteStackClick(tech)
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
                  <CommonButton size="small" handleClick={handleCompleteClick}>
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

export default TechStack
