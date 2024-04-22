import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import LoginModal from '@/components/modals/LoginModal'
import { getLocalStorageItem } from '@/util/localStorage'
import { logout } from '@/apis/user'

export default function LoginButton(): JSX.Element {
  const [onLoginModal, setOnLoginModal] = useState(false)
  const [isLogin, setIsLogin] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const token: string = getLocalStorageItem('accessToken')
    if (token !== null && token.length !== 0) {
      setIsLogin(true)
    } else {
      setIsLogin(false)
    }
  }, [pathname])

  const handleClickButton = (): void => {
    if (isLogin) {
      logout()
        .catch(() => {})
        .finally(() => {
          setIsLogin(false)
          window.alert('로그아웃이 완료되었습니다.')
        })
    } else {
      setOnLoginModal(true)
    }
  }

  return (
    <>
      <button type="button" onClick={handleClickButton}>
        {isLogin ? (
          <img
            src="/assets/logout.svg"
            alt="/logout"
            style={{ width: '28px' }}
          />
        ) : (
          <img src="/assets/login.svg" alt="/login" />
        )}
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
