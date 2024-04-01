import { Link } from 'react-router-dom'
import styled from 'styled-components'

export default function LoginModal(): JSX.Element {
  const KAKAO_OAUTH = {
    url: 'https://kauth.kakao.com/oauth/authorize',
    client_id: '45a8aaa9d47a9b068b97b4c1f49a6630',
    redirect_uri: 'http://localhost:5173/login/kakao',
    response_type: 'code',
  }

  const kakaoLoginURL = `${KAKAO_OAUTH.url}?client_id=${KAKAO_OAUTH.client_id}&redirect_uri=${KAKAO_OAUTH.redirect_uri}&response_type=${KAKAO_OAUTH.response_type}`

  return (
    <LoginModalLayout>
      <Link to={kakaoLoginURL}>
        <LoginButton>카카오로 시작하기</LoginButton>
      </Link>
      <LoginButton>네이버로 시작하기</LoginButton>
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
