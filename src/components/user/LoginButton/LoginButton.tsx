import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import LoginModal from '@/components/modals/LoginModal'
import { getLocalStorageItem } from '@/util/localStorage'
import { logout } from '@/apis/user'
import { notify } from '@/components/Toast'
import AuthAlertModal from '@/components/modals/AuthAlertModal'

export default function LoginButton(): JSX.Element {
  const [onLoginModal, setOnLoginModal] = useState(false)
  const [onLogoutModal, setOnLogoutModal] = useState(false)
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
      setOnLogoutModal(!onLogoutModal)
    } else {
      setOnLoginModal(true)
    }
  }

  return (
    <>
      <button type="button" onClick={handleClickButton}>
        {isLogin ? (
          <AuthText>로그아웃</AuthText>
        ) : (
          <AuthText $authStatus="login">로그인</AuthText>
        )}
      </button>
      {onLoginModal && (
        <LoginModal
          handleCloseModal={() => {
            setOnLoginModal(false)
          }}
        />
      )}
      {onLogoutModal && (
        <AuthAlertModal
          message="로그아웃"
          firstSubMessage="이전과 동일한 계정으로 인증하면,"
          secondSubMessage="같은 계정으로 이어서 이용 가능합니다"
          onClose={() => {
            setOnLogoutModal(!onLogoutModal)
          }}
          handleClick={(): void => {
            logout()
              .catch(() => {})
              .finally(() => {
                setIsLogin(false)
                notify({
                  type: 'default',
                  text: '로그아웃 되었습니다.',
                })
              })
          }}
          buttonName="로그아웃"
        />
      )}
    </>
  )
}

const AuthText = styled.span<{ $authStatus?: string }>`
  font-size: 1.4rem;
  color: ${(props) => (props.$authStatus === 'login' ? '#667AE4' : '#626262')};
`
