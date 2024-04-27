import { useLocation, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import {
  ChatUsers,
  DetailHeaderContainer,
  Icon,
  ToggleButton,
  ToggleContainer,
} from './styles'
import { getMeetingDetail } from '@/apis/meeting'
import { getLocalStorageItem } from '@/util/localStorage'
import LoginModal from '../modals/LoginModal'
import { notify } from '../Toast'

interface DetailHeaderProps {
  meetingId: number
}

function DetailHeader({ meetingId }: DetailHeaderProps): JSX.Element {
  const navi = useNavigate()
  const location = useLocation()

  const [onLoginModal, setOnLoginModal] = useState(false)

  const { data } = useQuery({
    queryKey: ['chatroom'],
    queryFn: async () => await getMeetingDetail(Number(meetingId)),
  })

  const handleHomeClick = (): void => {
    navi(`/meetings/${meetingId}`, { replace: true })
  }

  const handleChatClick = (): void => {
    if (token !== null && token.length !== 0) {
      if (!(data?.join ?? false)) {
        notify({
          type: 'warning',
          text: '채팅에 참여하려면 [ 모임 참여하기 ] 버튼을 먼저 눌러주세요',
        })
        return
      }
      navi(`/meetings/${meetingId}/chats`, { replace: true })
    } else {
      setOnLoginModal(true)
    }
  }

  const goback = (): void => {
    if (location.pathname.includes('chats')) {
      navi(`/meetings/${meetingId}`, { replace: true })
    } else if (location.pathname === `/meetings/${meetingId}`) {
      navi(-1)
    }
  }

  const token: string = getLocalStorageItem('accessToken')

  return (
    <DetailHeaderContainer>
      <div>
        <button type="button" onClick={goback} aria-label="go back">
          <Icon src="/assets/arrowLeft.svg" alt="" />
        </button>
        <ChatUsers $isActive={location.pathname.includes('chats')}>
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
            $isActive={location.pathname.includes('chats')}
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
      </div>
    </DetailHeaderContainer>
  )
}

export default DetailHeader
