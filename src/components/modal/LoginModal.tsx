import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { KAKAO_OAUTH, NAVER_OAUTH } from '../../constants/auth'

export default function LoginModal(): JSX.Element {
  const kakaoLoginURL = `${KAKAO_OAUTH.url}?client_id=${KAKAO_OAUTH.client_id}&redirect_uri=${KAKAO_OAUTH.redirect_uri}&response_type=${KAKAO_OAUTH.response_type}`

  const naverLoginURL = `${NAVER_OAUTH.url}?response_type=${NAVER_OAUTH.response_type}&client_id=${NAVER_OAUTH.client_id}&state=test&redirect_uri=${NAVER_OAUTH.redirect_uri}`

  return (
    <LoginModalLayout>
      <Link to={kakaoLoginURL}>
        <LoginButton>카카오로 시작하기</LoginButton>
      </Link>
      <Link to={naverLoginURL}>
        <LoginButton>네이버로 시작하기</LoginButton>
      </Link>
    </LoginModalLayout>
  )
}

const LoginModalLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 350px;
`

const LoginButton = styled.button`
  width: 100%;
  height: 49px;
  background: #333;
  color: #fff;
  border-radius: 8px;
`
