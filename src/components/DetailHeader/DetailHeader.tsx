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
import LoginModal from '../modals/LoginModal'
import { notify } from '../Toast'
import 'react-toastify/dist/ReactToastify.css'
import AlertModal from '../modals/AlertModal'

interface DetailHeaderProps {
  meetingId: number
}

function DetailHeader({ meetingId }: DetailHeaderProps): JSX.Element {
  const navi = useNavigate()
  const location = useLocation()

  const [isOpen, setIsOpen] = useState(false)
  const [onLoginModal, setOnLoginModal] = useState(false)
  const [onDeleteModal, setOnDeleteModal] = useState(false)

  const { data } = useQuery({
    queryKey: ['chatroom'],
    queryFn: async () => await getMeetingDetail(Number(meetingId)),
  })

  const deleteMutation = useMutation({
    mutationFn: async () => {
      await deleteMeeting(Number(meetingId))
    },
    onSuccess: () => {
      notify({
        type: 'default',
        text: '모임이 삭제 되었습니다.',
      })
      navi('/')
    },
    onError: (error) => {
      console.log('error', error)
    },
  })

  const handleHomeClick = (): void => {
    navi(`/meetings/${meetingId}`, { replace: true })
  }

  const handleChatClick = (): void => {
    if (token !== null && token.length !== 0) {
      if (!(data?.join ?? false)) {
        window.alert('채팅에 참여하려면 모임 참여하기 버튼을 먼저 눌러주세요')
        return
      }
      navi(`/meetings/${meetingId}/chats`, { replace: true })
    } else {
      setOnLoginModal(true)
    }
  }

  const deleteMeetingClick = (): void => {
    deleteMutation.mutate()
  }

  const goback = (): void => {
    if (location.pathname === `/meetings/${meetingId}/chats`) {
      navi(`/meetings/${meetingId}`, { replace: true })
    } else if (location.pathname === `/meetings/${meetingId}`) {
      navi(-1)
    }
  }

  const token: string = getLocalStorageItem('accessToken')
  const decodedToken = token != null ? jwtDecode(token) : ''

  return (
    <DetailHeaderContainer>
      <div>
        <button type="button" onClick={goback} aria-label="go back">
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
          {onLoginModal && (
            <LoginModal
              handleCloseModal={() => {
                setOnLoginModal(false)
              }}
            />
          )}
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
              onClick={() => {
                setOnDeleteModal(!onDeleteModal)
              }}
            >
              <img src="/assets/delete.svg" alt="delete" />
            </button>
          </div>
          {onDeleteModal && (
            <AlertModal
              message="삭제"
              firstSubMessage="모임을 삭제하면"
              secondSubMessage="관련 데이터가 모두 지워집니다."
              onClose={() => {
                setOnDeleteModal(!onDeleteModal)
              }}
              handleClick={deleteMeetingClick}
              buttonName="삭제하기"
            />
          )}
        </MenuContainer>
      )}
    </DetailHeaderContainer>
  )
}

export default DetailHeader
