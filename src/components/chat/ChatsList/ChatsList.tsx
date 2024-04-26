import { jwtDecode } from 'jwt-decode'
import {
  BubbleBox,
  ChatBubble,
  ChatDate,
  SendTime,
  Username,
} from '@/pages/Chat/styles'
import { type ChatMessage } from '@/type/chat'
import { getLocalStorageItem } from '@/util/localStorage'

interface ChatsListProps {
  chats: ChatMessage[]
}

export default function ChatsList({ chats }: ChatsListProps): JSX.Element {
  const token: string = getLocalStorageItem('accessToken')
  const decodedToken = jwtDecode(token)

  return (
    <>
      {chats.map((e: ChatMessage, index: number) => (
        <div className="message-padding-box" key={e.chatId}>
          {/* 이전 메시지와 날짜가 다르다면 날짜를 표시 */}
          <ChatDate>
            {index === 0 ||
            new Date(e.createdAt).getDate() !==
              new Date(chats[index - 1].createdAt).getDate() ? (
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
        </div>
      ))}
    </>
  )
}
