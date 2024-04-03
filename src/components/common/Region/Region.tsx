import { useEffect, useState } from 'react'
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
  ModalBtn,
  SelectedStack,
} from '../FilterFrame/styles'
import queryKeys from '@/constants/queryKeys'
import { getWideRegion } from '@/apis/filter'
import { type FirstRegion } from '@/type/filter'

export default function Region(): JSX.Element {
  const { data: firstRegion } = useQuery({
    queryKey: queryKeys.firstRegion,
    queryFn: async () => await getWideRegion(),
  })
  //
  const [selectedFirstRegion, setSelectedFirstRegion] = useState(
    localStorage.getItem('firstRegion') ?? '1'
  )

  useEffect(() => {
    return () => {
      localStorage.setItem('firstRegion', selectedFirstRegion)
    }
  }, [selectedFirstRegion])

  const [isShow, setIsShow] = useState(false)
  const [selectedStack, setSelectedStack] = useState<string[]>([])

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

  //   wide region 나열
  const renderWideRegionItem = ({
    regionFirstId,
    regionFirstName,
  }: FirstRegion): JSX.Element => (
    <li key={regionFirstId}>
      <button
        type="button"
        className={selectedStack.includes(regionFirstName) ? 'selected' : ''}
        onClick={() => {
          setSelectedFirstRegion(String(regionFirstId))
        }}
      >
        <span>{regionFirstName}</span>
        <span>{selectedStack.includes(regionFirstName) && <span>V</span>}</span>
      </button>
    </li>
  )
  // narrow region 나열
  const renderNarrowRegionItem = (item: string): JSX.Element => (
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

  const handleResetClick = (): void => {
    setSelectedStack([])
  }

  return (
    <>
      <ModalBtn type="button" onClick={handleVisibleClick}>
        모임 지역
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
              <FilterTitle>모임 지역</FilterTitle>
              <ListBox>
                {firstRegion != null && (
                  <ul>
                    {firstRegion?.map((item) => renderWideRegionItem(item))}
                  </ul>
                )}
                <ul>
                  {firstRegion?.map((item) => renderWideRegionItem(item))}
                </ul>
              </ListBox>
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
