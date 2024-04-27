import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { meetingKeys } from '@/constants/queryKeys'
import { getMeetingsBySearch, getPopularMeetings } from '@/apis/meeting'
import {
  CardBox,
  EmptyTextBox,
  InputBox,
  SearchBox,
  SearchLayout,
  RecentTagBox,
  ToggleBox,
  ToggleButton,
  PopularMeetingsBox,
  PopularMeetingCard,
  PopularMeetingCardBox,
  PopularCardTextBox,
} from './styles'
import { type GetMeeting } from '@/type/meeting'
import { getLocalStorageItem, setLocalStorageItem } from '@/util/localStorage'
import LoadingPage from '@/shared/LoadingPage'
import ErrorPage from '@/shared/ErrorPage'
import useScrollEnd from '@/hooks/useScrollEnd'
import SearchMeetingsCard from '@/components/meeting/MeetingCard/SearchMeetingsCard'
import { notify } from '@/components/Toast'

export default function Search(): JSX.Element {
  const [onRecentsToggle, setOnRecentsToggle] = useState(true)
  const [recents, setRecents] = useState<string[]>(
    (getLocalStorageItem('recents') as string[]) ?? []
  )
  const scrollBoxRef = useRef<HTMLDivElement>(null)
  const [queries] = useSearchParams()
  const navigate = useNavigate()
  const { handleScroll } = useScrollEnd()

  const keyword = queries.get('keyword') ?? ''
  const [inputText, setInputText] = useState(keyword ?? '')

  useEffect(() => {
    setInputText(keyword)
  }, [keyword])

  const hasRecents = recents.length !== 0

  const { data: popularMeetings } = useQuery({
    queryKey: meetingKeys.popular,
    queryFn: async () => await getPopularMeetings(),
  })

  const { data, fetchNextPage, isLoading, isError } = useInfiniteQuery({
    queryKey: meetingKeys.search(keyword),
    queryFn: async ({ pageParam }) => {
      return await getMeetingsBySearch({ text: keyword, pageParam })
    },
    getNextPageParam: (lastPage) => {
      if (!lastPage.isLast) return lastPage.nextPage
      return undefined
    },
    initialPageParam: 1,
    enabled: keyword !== '',
  })

  useEffect(() => {
    const handleFetchPages = (): void => {
      void fetchNextPage()
    }
    const scrollBox = scrollBoxRef?.current

    const handleScrollEvent = (): void => {
      handleScroll(scrollBox, handleFetchPages)
    }
    scrollBox?.addEventListener('scroll', handleScrollEvent)
    return () => {
      scrollBox?.removeEventListener('scroll', handleScrollEvent)
    }
  }, [fetchNextPage, handleScroll])

  useEffect(() => {
    const storageScrollPosition = sessionStorage.getItem('searchScrollPosition')

    if (scrollBoxRef.current !== null && storageScrollPosition !== null) {
      scrollBoxRef.current.scrollTo({ top: Number(storageScrollPosition) })
      sessionStorage.removeItem('scrollPosition')
    }
  }, [])

  const meetings = useMemo(() => {
    let list: GetMeeting[] = []
    data?.pages.forEach(({ result }) => (list = [...list, ...result]))
    return list
  }, [data])

  useEffect(() => {
    if (meetings.length !== 0) {
      setOnRecentsToggle(false)
    }
  }, [meetings])

  const handleSearch = (): void => {
    if (inputText.trim().length === 0) {
      notify({ type: 'warning', text: '검색어를 입력해 주세요.' })
      return
    }
    handleRecents(inputText)
    navigate(`?keyword=${inputText}`)
  }

  const handleRecents = (text: string): void => {
    const prevRecents = getLocalStorageItem('recents') as string[]
    if (prevRecents == null) {
      setLocalStorageItem('recents', [text])
    } else {
      const currentRecents = [
        text,
        ...prevRecents.filter((word) => word !== text),
      ].slice(0, 10)
      setLocalStorageItem('recents', currentRecents)
    }
    setRecents([text, ...recents.filter((word) => word !== text)].slice(0, 10))
  }

  const handleCickTag = (e: React.MouseEvent<HTMLButtonElement>): void => {
    const targetValue = e.currentTarget.value
    navigate(`?keyword=${targetValue}`)
  }

  const handleCardClick = (meetingId: number): void => {
    const scrollBox = scrollBoxRef?.current
    sessionStorage.setItem('searchScrollPosition', String(scrollBox?.scrollTop))
    navigate(`/meetings/${meetingId}`)
  }

  if (isLoading) return <LoadingPage name="페이지를" />
  if (isError) return <ErrorPage />
  return (
    <SearchLayout>
      <SearchBox>
        <div className="input-flex-box">
          <button
            type="button"
            onClick={() => {
              navigate('/')
            }}
          >
            <img src="/assets/left.svg" alt="left" />
          </button>
          <InputBox>
            <input
              type="text"
              placeholder="모임 이름, 모임 내용, 주소를 검색해 보세요"
              value={inputText}
              onChange={(e) => {
                setInputText(e.currentTarget.value)
              }}
              onKeyUp={(e) => {
                e.key === 'Enter' && handleSearch()
              }}
            />
            <button type="button" onClick={handleSearch}>
              <img src="/assets/search.svg" alt="icon" />
            </button>
          </InputBox>
        </div>
        <ToggleBox>
          <ToggleButton
            $isPointer={hasRecents}
            onClick={() => {
              if (!hasRecents) return
              setOnRecentsToggle(!onRecentsToggle)
            }}
          >
            <h1>
              <img src="/assets/watch.svg" alt="watch" />
              최근 검색어
            </h1>
            {hasRecents &&
              (onRecentsToggle ? (
                <img src="/assets/up.svg" alt="up" />
              ) : (
                <img src="/assets/down.svg" alt="down" />
              ))}
          </ToggleButton>
          {hasRecents && onRecentsToggle && (
            <RecentTagBox>
              {recents.map((word) => (
                <button
                  type="button"
                  key={word}
                  value={word}
                  onClick={handleCickTag}
                >
                  {word}
                </button>
              ))}
            </RecentTagBox>
          )}
        </ToggleBox>
      </SearchBox>
      {data != null && (
        <CardBox ref={scrollBoxRef}>
          {meetings.length === 0 ? (
            <EmptyTextBox>
              <img src="/assets/warning.svg" alt="warning" />
              <p>조회된 모임이 없습니다</p>
            </EmptyTextBox>
          ) : (
            <>
              {meetings.map((meeting) => (
                <SearchMeetingsCard
                  key={`${meeting.meetingId}_${meeting.meetingName}`}
                  meeting={meeting}
                  handleCardClick={handleCardClick}
                />
              ))}
            </>
          )}
        </CardBox>
      )}
      {meetings.length === 0 && (
        <PopularMeetingsBox>
          <h1>
            <img src="/assets/fire.svg" alt="fire" />
            현재 MOIT에서 인기있는 모임
          </h1>
          <PopularMeetingCardBox>
            <div className="popular-card-flex-box">
              {popularMeetings?.map(
                (
                  {
                    meetingId,
                    meetingName,
                    meetingDate,
                    meetingStartTime,
                    meetingEndTime,
                    locationAddress,
                  },
                  index
                ) => (
                  <PopularMeetingCard key={meetingId}>
                    <span>{`${`0${index + 1}`}`}</span>
                    <h2>{meetingName}</h2>
                    <PopularCardTextBox>
                      <div className="card-icon-text">
                        <img src="/assets/timeSearch.svg" alt="time" />
                        <div>
                          <p>{meetingDate}</p>
                          <p>{`${meetingStartTime} - ${meetingEndTime}`}</p>
                        </div>
                      </div>
                      <div className="card-icon-text">
                        <img src="/assets/pinSearch.svg" alt="time" />
                        <div>
                          <p>{locationAddress}</p>
                        </div>
                      </div>
                    </PopularCardTextBox>
                    <button
                      type="button"
                      onClick={() => {
                        navigate(`/meetings/${meetingId}`)
                      }}
                    >
                      모임 상세보기
                    </button>
                  </PopularMeetingCard>
                )
              )}
            </div>
          </PopularMeetingCardBox>
        </PopularMeetingsBox>
      )}
    </SearchLayout>
  )
}
