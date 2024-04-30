import { useState } from 'react'
import { getLocalStorageItem } from '@/util/localStorage'
import LoginModal from '@/components/modals/LoginModal'
import CommonButton from '@/components/common/Button/CommonButton'
import AlertModal from '@/components/modals/AlertModal'

interface JoinMeetingButtonProps {
  handleJoinMeeting: () => void
}

export default function JoinMeetingButton({
  handleJoinMeeting,
}: JoinMeetingButtonProps): JSX.Element {
  const [onLoginModal, setOnLoginModal] = useState(false)
  const [onJoinModal, setOnJoinModal] = useState(false)
  const handleClickButton = (): void => {
    const token: string = getLocalStorageItem('accessToken')
    if (token != null && token.length !== 0) {
      handleJoinMeeting()
    } else {
      setOnLoginModal(true)
    }
  }

  return (
    <>
      <CommonButton
        size="large"
        $type="primary"
        handleClick={() => {
          setOnJoinModal(!onJoinModal)
        }}
      >
        모임 참여하기
      </CommonButton>
      {onLoginModal && (
        <LoginModal
          handleCloseModal={() => {
            setOnLoginModal(false)
          }}
        />
      )}
      {onJoinModal && (
        <AlertModal
          message="참여"
          firstSubMessage="모임에 참여하시면"
          secondSubMessage="채팅방으로 이동합니다"
          onClose={() => {
            setOnJoinModal(!onJoinModal)
          }}
          handleClick={handleClickButton}
          buttonName="참여하기"
        />
      )}
    </>
  )
}
