import { useEffect, useState } from 'react'
import LoginModal from '@/components/modals/LoginModal'
import { getLocalStorageItem } from '@/util/localStorage'
import { logout } from '@/apis/user'

export default function LoginButton(): JSX.Element {
  const [onLoginModal, setOnLoginModal] = useState(false)
  const [isLogin, setIsLogin] = useState(false)
  const token: string = getLocalStorageItem('accessToken')

  useEffect(() => {
    if (token !== null && token.length !== 0) {
      setIsLogin(true)
    }
  }, [token])

  const handleClickButton = (): void => {
    if (isLogin) {
      logout()
        .catch(() => {})
        .finally(() => {
          setIsLogin(false)
        })
    } else {
      setOnLoginModal(true)
    }
  }

  return (
    <>
      <button type="button" onClick={handleClickButton}>
        {isLogin ? '로그아웃' : '로그인'}
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
