import { useLocation, useNavigate } from 'react-router-dom'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import {
  ChatUsers,
  DetailHeaderContainer,
  Icon,
  ToggleButton,
  ToggleContainer,
} from './styles'
import { deleteMeeting, getMeetingDetail } from '@/apis/meeting'
import { MenuButton, MenuContainer } from '@/pages/Chat/styles'
import { getLocalStorageItem } from '@/util/localStorage'

interface DetailHeaderProps {
  meetingId: number
}

function DetailHeader({ meetingId }: DetailHeaderProps): JSX.Element {
  const navi = useNavigate()
  const location = useLocation()

  const [isOpen, setIsOpen] = useState(false)

  const { data } = useQuery({
    queryKey: ['chatroom'],
    queryFn: async () => await getMeetingDetail(Number(meetingId)),
  })

  const deleteMutation = useMutation({
    mutationFn: async () => {
      await deleteMeeting(Number(meetingId))
    },
    onSuccess: () => {
      navi('/')
    },
    onError: (error) => {
      console.log('error', error)
    },
  })

  const handleHomeClick = (): void => {
    navi(`/meetings/${meetingId}`)
  }
  const handleChatClick = (): void => {
    navi(`/meetings/${meetingId}/chats`)
  }

  const deleteMeetingClick = (): void => {
    deleteMutation.mutate()
  }

  const token: string = getLocalStorageItem('accessToken')
  const decodedToken = token != null ? jwtDecode(token) : ''

  return (
    <DetailHeaderContainer>
      <div>
        <button
          type="button"
          onClick={() => {
            navi(-1)
          }}
          aria-label="go back"
        >
          <Icon src="/assets/arrowLeft.svg" alt="" />
        </button>
        <ChatUsers
          $isActive={location.pathname === `/meetings/${meetingId}/chats`}
        >
          <h4>그룹 채팅</h4>
          <Icon src="/assets/users.svg" className="users" />
          <span>{data?.registeredCount}</span>
        </ChatUsers>
      </div>
      <div>
        <ToggleContainer>
          <ToggleButton
            type="button"
            onClick={handleHomeClick}
            $isActive={location.pathname === `/meetings/${meetingId}`}
          >
            home
          </ToggleButton>
          <ToggleButton
            type="button"
            onClick={handleChatClick}
            $isActive={location.pathname === `/meetings/${meetingId}/chats`}
          >
            chat
          </ToggleButton>
        </ToggleContainer>
        {decodedToken.sub === data?.creatorEmail ? (
          <MenuButton
            type="button"
            aria-label="menu"
            onClick={() => {
              setIsOpen(!isOpen)
            }}
          >
            <Icon src="/assets/menu.svg" alt="" className="menu" />
          </MenuButton>
        ) : (
          <MenuButton
            type="button"
            aria-label="menu"
            onClick={() => {
              window.alert('개발 중인 기능입니다!')
            }}
          >
            <Icon src="/assets/menu.svg" alt="" className="menu" />
          </MenuButton>
        )}
      </div>
      {isOpen && decodedToken.sub === data?.creatorEmail && (
        <MenuContainer>
          <div>
            <span>수정하기</span>
            <button
              type="button"
              aria-label="edit"
              onClick={() => {
                navi(`/meetings/${meetingId}/modify`)
              }}
            >
              <img src="/assets/edit.svg" alt="edit" />
            </button>
          </div>
          <div>
            <span>삭제하기</span>
            <button
              type="button"
              aria-label="delete"
              onClick={deleteMeetingClick}
            >
              <img src="/assets/delete.svg" alt="delete" />
            </button>
          </div>
        </MenuContainer>
      )}
    </DetailHeaderContainer>
  )
}

export default DetailHeader
