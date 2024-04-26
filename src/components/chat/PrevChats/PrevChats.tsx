import { useInfiniteQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import { throttle } from 'lodash'
import { getChatMsg } from '@/apis/meeting'
import { type ChatMessage } from '@/type/chat'
import LoadingPage from '@/shared/LoadingPage'
import ErrorPage from '@/shared/ErrorPage'
import ChatsList from '../ChatsList/ChatsList'

interface PrevChatsProps {
  scrollBox: HTMLDivElement | null
}

export default function PrevChats({ scrollBox }: PrevChatsProps): JSX.Element {
  const { meetingId, enterTime } = useParams()
  const [prevScrollHeight, setPrevScrollHeight] = useState<number>(0)

  useEffect(() => {
    if (scrollBox !== null) {
      setPrevScrollHeight(scrollBox.scrollHeight)
    }
  }, [scrollBox])

  // 채팅방 진입 시 이전 메세지 조회
  const { data, fetchNextPage, isLoading, isError } = useInfiniteQuery({
    queryKey: ['getAllChatMessages'],
    queryFn: async ({ pageParam }) => {
      return await getChatMsg({
        meetingId: Number(meetingId),
        pageParam,
        enterTime: enterTime ?? '',
      })
    },
    getNextPageParam: (lastPage) => {
      if (!lastPage.isLast) return lastPage.nextPage
      return undefined
    },
    initialPageParam: 1,
  })

  const chatDatas = useMemo(() => {
    let list: ChatMessage[] = []
    data != null &&
      data.pages.forEach(({ result }) => (list = [...list, ...result]))
    return list.reverse()
  }, [data])

  // 스크롤이 최상단일 때 다음페이지 조회
  const handleScroll: () => void = throttle(() => {
    if (scrollBox?.scrollTop === 0) {
      void fetchNextPage()
    }
  }, 500)

  useEffect(() => {
    if (scrollBox !== null) {
      scrollBox.addEventListener('scroll', handleScroll)
    }
    return () => {
      scrollBox?.removeEventListener('scroll', handleScroll)
    }
  }, [scrollBox, handleScroll])

  useEffect(() => {
    if (scrollBox === null || prevScrollHeight === null) return

    if (prevScrollHeight !== scrollBox.scrollHeight) {
      const current = scrollBox
      current.scrollTop = current.scrollHeight - prevScrollHeight

      setPrevScrollHeight(scrollBox.scrollHeight)
    }
  }, [chatDatas, prevScrollHeight, scrollBox])

  if (isLoading) return <LoadingPage name="페이지를" />
  if (isError) return <ErrorPage />

  return <ChatsList chats={chatDatas} />
}
