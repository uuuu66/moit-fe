import React, { useEffect, useMemo, useRef, useState } from 'react'
import SockJS from 'sockjs-client/dist/sockjs'
import { Stomp, type CompatClient } from '@stomp/stompjs'
import { useParams } from 'react-router-dom'
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query'
import { jwtDecode } from 'jwt-decode'
import { throttle } from 'lodash'
import DetailHeader from '@/components/DetailHeader/DetailHeader'
import {
  BubbleBox,
  BubbleContainer,
  ChatBubble,
  ChatContainer,
  ChatDate,
  MessageContainer,
  MsgInputBox,
  SendButton,
  SendTime,
  Username,
} from './styles'
import { getLocalStorageItem } from '@/util/localStorage'
import { getChatMsg } from '@/apis/meeting'
import { type ChatMessage } from '@/type/chat'
import LoadingPage from '@/shared/LoadingPage'
import ErrorPage from '@/shared/ErrorPage'

function Chat(): JSX.Element {
  const { meetingId } = useParams()

  const queryClient = useQueryClient()
  const stompClient = useRef<CompatClient | null>(null)
  const userMessage = useRef<HTMLInputElement | null>(null)
  const [chats, setChats] = useState<ChatMessage[]>([])
  const [prevScrollHeight, setPrevScrollHeight] = useState<number | null>(null)

  const socket = new SockJS(`${import.meta.env.VITE_SOCKET_URL}`)
  const token: string = getLocalStorageItem('accessToken')
  const headers = { Authorization: `Bearer ${token}` }
  const decodedToken = jwtDecode(token)

  //= ======================================================================
  // 무한 스크롤

  // TODO
  const scrollBoxRef = useRef<HTMLDivElement>(null)

  const { data, fetchNextPage, isLoading, isError } = useInfiniteQuery({
    queryKey: ['getAllChatMessages'],
    queryFn: async ({ pageParam }) => {
      return await getChatMsg({ meetingId: Number(meetingId), pageParam })
    },
    getNextPageParam: (lastPage) => {
      if (!lastPage.isLast) return lastPage.nextPage
      return undefined
    },
    initialPageParam: 1,
  })

  const meetingStatus = data?.pages[0].meetingStatusEnum

  // TODO
  const handleFetchPages = (): void => {
    setPrevScrollHeight(scrollBoxRef.current?.scrollHeight ?? null)
    void fetchNextPage() // 어디서 발동시킬지 잘 생각
  }

  // TODO
  const handleScroll: () => void = throttle(() => {
    if (scrollBoxRef?.current === null) return
    const scrollBox = scrollBoxRef.current

    // scroll이 맨 위에 닿았을 때 다음 페이지 요청
    if (scrollBox.scrollTop === 0) {
      handleFetchPages()
    }
  }, 500)

  const chatDatas = useMemo(() => {
    let list: ChatMessage[] = []
    data != null &&
      data.pages.forEach(({ result }) => (list = [...list, ...result]))
    return list.reverse()
  }, [data])

  useEffect(() => {
    const scrollBox = scrollBoxRef.current
    scrollBox?.addEventListener('scroll', handleScroll)
    return () => {
      scrollBox?.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])
  //= ======================================================================

  useEffect(() => {
    stompClient.current = Stomp.over(socket)

    stompClient.current?.connect(headers, (): void => {
      stompClient.current?.subscribe(
        `/topic/rooms/${meetingId}/chat`,
        (message) => {
          const newMessage = JSON.parse(message.body)
          setChats((prev) => [...prev, newMessage])
        }
      )
    })

    return () => {
      if (stompClient.current !== null) {
        stompClient.current?.disconnect()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meetingId])

  // TODO: send 개선
  const sendChatMessage = (): void => {
    const chatRequest = { content: userMessage.current?.value }
    if (userMessage.current?.value === '') return

    stompClient.current?.send(
      `/app/api/meetings/${meetingId}/chat`,
      headers,
      JSON.stringify(chatRequest)
    )
    if (userMessage.current !== null) {
      userMessage.current.value = ''
    }
  }

  // Enter 눌렀을 때, 메시지 입력
  const handleKeyEnter = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      sendChatMessage()
    }
  }

  // 채팅 내역이 변경될 때마다 스크롤을 맨 아래로 이동
  const scrollToBottom = (): void => {
    const messageContainer = document.getElementById('messageContainer')
    if (messageContainer !== null) {
      messageContainer.scrollTop = messageContainer.scrollHeight
    }
  }

  useEffect(() => {
    scrollToBottom()
    void queryClient.invalidateQueries({ queryKey: ['getAllChatMessages'] })
  }, [data, chats, queryClient])

  useEffect(() => {
    if (prevScrollHeight !== null && scrollBoxRef.current !== null) {
      scrollBoxRef.current.scrollTop =
        scrollBoxRef.current.scrollHeight - prevScrollHeight
      setPrevScrollHeight(null)
    } else {
      scrollToBottom()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatDatas])

  if (isLoading) return <LoadingPage name="페이지를" />
  if (isError) return <ErrorPage />

  return (
    <ChatContainer>
      <DetailHeader meetingId={Number(meetingId)} />
      <MessageContainer id="messageContainer" ref={scrollBoxRef}>
        <BubbleContainer>
          {chatDatas.map((e: ChatMessage, index: number) => (
            <React.Fragment key={e.chatId}>
              {/* 이전 메시지와 날짜가 다르다면 날짜를 표시 */}
              <ChatDate>
                {index === 0 ||
                new Date(e.createdAt).getDate() !==
                  new Date(chatDatas[index - 1].createdAt).getDate() ? (
                  <div className="date">
                    {/* 오늘인지 확인하고 표시 */}
                    {new Date(e.createdAt).toDateString() ===
                    new Date().toDateString()
                      ? 'Today'
                      : new Date(e.createdAt).toLocaleDateString().slice(0, -1)}
                  </div>
                ) : null}
              </ChatDate>
              <BubbleBox $isMe={e.sender.memberEmail === decodedToken.sub}>
                <Username $isMe={e.sender.memberEmail === decodedToken.sub}>
                  {e.sender.memberName}
                </Username>
                <div className="msg">
                  <ChatBubble $isMe={e.sender.memberEmail === decodedToken.sub}>
                    {e.content}
                  </ChatBubble>
                  <SendTime>{e.createdAt.slice(11, 16)}</SendTime>
                </div>
              </BubbleBox>
            </React.Fragment>
          ))}
        </BubbleContainer>
      </MessageContainer>
      <MsgInputBox>
        <input
          type="text"
          ref={userMessage}
          onKeyUp={(e) => {
            handleKeyEnter(e)
          }}
          placeholder="메세지를 입력해 주세요"
          disabled={meetingStatus === 'COMPLETE'}
        />
        <SendButton onClick={sendChatMessage}>
          <img src="/assets/send.svg" alt="" />
        </SendButton>
      </MsgInputBox>
    </ChatContainer>
  )
}

export default Chat
