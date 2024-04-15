import React, { useEffect, useMemo, useRef, useState } from 'react'
import SockJS from 'sockjs-client/dist/sockjs'
import { Stomp, type IMessage, type CompatClient } from '@stomp/stompjs'
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
  MessageContainer,
  MsgInputBox,
  SendButton,
  Username,
} from './styles'
import { getLocalStorageItem } from '@/util/localStorage'
import { getChatMsg } from '@/apis/meeting'
import { type ChatMessage } from '@/type/chat'

function Chat(): JSX.Element {
  const { meetingId } = useParams()

  const queryClient = useQueryClient()
  const stompClient = useRef<CompatClient | null>(null)

  const [chatMessage, setChatMessage] = useState('')
  const [chats, setChats] = useState<ChatMessage[]>([])
  const [prevScrollHeight, setPrevScrollHeight] = useState<number | null>(null)

  const socket = new SockJS(`${import.meta.env.VITE_SOCKET_URL}`)
  const token: string = getLocalStorageItem('accessToken')
  const headers = { Authorization: `Bearer ${token}` }
  const decodedToken = jwtDecode(token)

  //= ======================================================================
  // 무한 스크롤
  const scrollBoxRef = useRef<HTMLDivElement>(null)

  const { data, fetchNextPage } = useInfiniteQuery({
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

  const handleFetchPages = (): void => {
    setPrevScrollHeight(scrollBoxRef.current?.scrollHeight ?? null)
    void fetchNextPage()
  }

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
        (message: IMessage) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          const newMessage: ChatMessage = JSON.parse(message.body)
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
    const chatRequest = { content: chatMessage }
    if (chatMessage === '') return
    stompClient.current?.send(
      `/app/api/meetings/${meetingId}/chat`,
      headers,
      JSON.stringify(chatRequest)
    )
    setChatMessage('')
    void queryClient.invalidateQueries({ queryKey: ['getAllChatMessages'] })
  }

  // Enter 눌렀을 때, 메시지 입력
  const handleKeyEnter = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      e.preventDefault()
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chats, data])

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

  return (
    <ChatContainer>
      <DetailHeader meetingId={Number(meetingId)} />
      <MessageContainer id="messageContainer" ref={scrollBoxRef}>
        <BubbleContainer>
          {chatDatas.map((e: ChatMessage) => (
            <BubbleBox
              key={e.chatId}
              $isMe={e.sender.memberEmail === decodedToken.sub}
            >
              <Username $isMe={e.sender.memberEmail === decodedToken.sub}>
                {e.sender.memberName}
              </Username>
              <div className="msg">
                <ChatBubble $isMe={e.sender.memberEmail === decodedToken.sub}>
                  {e.content}
                </ChatBubble>
                {e.createdAt.slice(11, 16)}
              </div>
            </BubbleBox>
          ))}
        </BubbleContainer>
      </MessageContainer>
      <MsgInputBox>
        <input
          type="text"
          value={chatMessage}
          onChange={(e) => {
            setChatMessage(e.target.value)
          }}
          onKeyUp={(e) => {
            handleKeyEnter(e)
          }}
          placeholder="Type your message..."
        />
        <SendButton onClick={sendChatMessage}>Send</SendButton>
      </MsgInputBox>
    </ChatContainer>
  )
}

export default Chat
