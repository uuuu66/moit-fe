import SockJS from 'sockjs-client/dist/sockjs'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Stomp, type CompatClient } from '@stomp/stompjs'
import { useParams } from 'react-router-dom'
import { getLocalStorageItem } from '@/util/localStorage'
import {
  BubbleContainer,
  ChatContainer,
  MessageContainer,
  MsgInputBox,
  SendButton,
} from '@/pages/Chat/styles'
import { type ChatMessage } from '@/type/chat'
import DetailHeader from '@/components/DetailHeader/DetailHeader'
import PrevChats from '@/components/chat/PrevChats/PrevChats'
import ChatsList from '@/components/chat/ChatsList/ChatsList'

export default function Chat(): JSX.Element {
  const { meetingId } = useParams()
  const [onConnect, setOnConnect] = useState(false)
  const [chats, setChats] = useState<ChatMessage[]>([])
  const stompRef = useRef<CompatClient | null>(null)
  const scrollBoxRef = useRef<HTMLDivElement>(null)
  const userMessage = useRef<HTMLInputElement | null>(null)

  const token: string = getLocalStorageItem('accessToken')
  const headers = useMemo(() => ({ Authorization: `Bearer ${token}` }), [token])

  // 페이지 진입, 새 메세지 도착 시 스크롤 최하단으로 이동
  useEffect(() => {
    if (scrollBoxRef.current !== null) {
      scrollBoxRef.current.scrollTop = scrollBoxRef.current.scrollHeight
    }
  }, [chats, onConnect])

  // 마운트/언마운트 시 웹소켓 연결/해제
  useEffect(() => {
    if (meetingId != null) {
      const roomConnect = (): void => {
        const socket = new SockJS(`${import.meta.env.VITE_SOCKET_URL}`)
        stompRef.current = Stomp.over(socket)
        stompRef.current.connect(headers, () => {
          setOnConnect(true)
        })
      }

      roomConnect()
    }
    return () => {
      if (stompRef.current !== null) {
        stompRef.current.disconnect()
      }
    }
  }, [meetingId, headers])

  // 구독
  useEffect(() => {
    if (onConnect) {
      stompRef.current?.subscribe(`/topic/rooms/${meetingId}/chat`, (res) => {
        const msg = JSON.parse(res.body)
        setChats((prev) => [...prev, msg])
      })
    }
  }, [onConnect, meetingId])

  // 메세지 전송
  const sendChatMessage = (): void => {
    const chatRequest = { content: userMessage.current?.value }
    if (userMessage.current?.value === '') return

    stompRef.current?.send(
      `/app/api/meetings/${meetingId}/chat`,
      headers,
      JSON.stringify(chatRequest)
    )
    if (userMessage.current !== null) {
      userMessage.current.value = ''
    }
  }

  // 전송버튼 엔터키 인식
  const handleKeyEnter = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      sendChatMessage()
    }
  }

  return (
    <ChatContainer>
      <DetailHeader meetingId={Number(meetingId)} />
      <MessageContainer id="messageContainer" ref={scrollBoxRef}>
        <BubbleContainer>
          <PrevChats scrollBox={scrollBoxRef.current} />
          <ChatsList chats={chats} />
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
          maxLength={10000}
        />
        <SendButton onClick={sendChatMessage}>
          <img src="/assets/send.svg" alt="" />
        </SendButton>
      </MsgInputBox>
    </ChatContainer>
  )
}
