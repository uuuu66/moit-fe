import { useState } from 'react'
import { ModalBtn } from '@/components/filter/FilterFrame/styles'
import { getLocalStorageItem } from '@/util/localStorage'
import LoginModal from '@/components/modals/LoginModal'

interface AddMeetingButtonProps {
  children: string
  handleClickButton: () => void
}

export default function AddMeetingButton({
  children,
  handleClickButton,
}: AddMeetingButtonProps): JSX.Element {
  const [onLoginModal, setOnLoginModal] = useState(false)
  const handleCreate = (): void => {
    const token: string = getLocalStorageItem('accessToken')
    if (token != null && token.length !== 0) {
      handleClickButton()
    }
    setOnLoginModal(true)
  }

  return (
    <>
      <ModalBtn type="button" onClick={handleCreate}>
        {children}
      </ModalBtn>
      {onLoginModal && (
        <LoginModal
          handleCloseModal={() => {
            setOnLoginModal(false)
          }}
        />
      )}
    </>
  )
}
