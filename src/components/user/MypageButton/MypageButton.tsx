import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getLocalStorageItem } from '@/util/localStorage'
import { ModalBtn } from '@/components/filter/FilterFrame/styles'
import LoginModal from '@/components/modals/LoginModal'

export default function MypageButton(): JSX.Element {
  const [onLoginModal, setOnLoginModal] = useState(false)
  const navigate = useNavigate()
  const handleClickButton = (): void => {
    const token: string = getLocalStorageItem('accessToken')
    if (token != null && token.length !== 0) {
      navigate('/mypage')
    } else {
      setOnLoginModal(true)
    }
  }

  return (
    <>
      <ModalBtn type="button" onClick={handleClickButton}>
        마이페이지
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
