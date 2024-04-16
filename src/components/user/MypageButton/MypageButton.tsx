import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getLocalStorageItem } from '@/util/localStorage'
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
      <button type="button" onClick={handleClickButton}>
        <img src="/assets/mypage.svg" alt="mypage" />
      </button>
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
