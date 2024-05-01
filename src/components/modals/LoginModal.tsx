import { Link, useLocation } from 'react-router-dom'
import { Background } from '../filter/FilterFrame/styles'
import ModalPortal from './ModalPortal'
import { KAKAO_OAUTH, NAVER_OAUTH } from '@/constants/auth'
import {
  ButtonBox,
  CloseBox,
  ContentsBox,
  LoginModalLayout,
} from '../meeting/AddMeetingButton/styles'
import CommonButton from '../common/Button/CommonButton'

interface LoginModalProps {
  handleCloseModal: () => void
}

export default function LoginModal({
  handleCloseModal,
}: LoginModalProps): JSX.Element {
  const { pathname } = useLocation()
  const kakaoLoginURL = `${KAKAO_OAUTH.url}?client_id=${KAKAO_OAUTH.client_id}&redirect_uri=${KAKAO_OAUTH.redirect_uri}&response_type=${KAKAO_OAUTH.response_type}`

  const naverLoginURL = `${NAVER_OAUTH.url}?response_type=${NAVER_OAUTH.response_type}&client_id=${NAVER_OAUTH.client_id}&state=test&redirect_uri=${NAVER_OAUTH.redirect_uri}`

  return (
    <ModalPortal>
      <Background
        onClick={(e) => {
          e.stopPropagation()
          handleCloseModal()
        }}
      >
        <LoginModalLayout
          onClick={(e) => {
            e.stopPropagation()
          }}
        >
          <CloseBox>
            <button type="button" onClick={handleCloseModal}>
              <img src="/assets/cancel.svg" alt="cancel" />
            </button>
          </CloseBox>
          <ContentsBox>
            <img src="/assets/logo.svg" alt="logo" />
            <h2>MOIT에 참가하려면 로그인 해주세요</h2>
            <div>
              <p>5초면 가입 완료!</p>
              <p>더 편하고 빠르게 MOIT과 만나봐요</p>
            </div>
          </ContentsBox>
          <ButtonBox>
            <Link to={kakaoLoginURL} style={{ textDecoration: 'none' }}>
              <CommonButton
                size="large"
                $type="yellow"
                handleClick={() => {
                  sessionStorage.setItem('loginPage', pathname)
                }}
              >
                카카오로 시작하기
              </CommonButton>
            </Link>
            <Link to={naverLoginURL} style={{ textDecoration: 'none' }}>
              <CommonButton
                size="large"
                $type="green"
                handleClick={() => {
                  sessionStorage.setItem('loginPage', pathname)
                }}
              >
                네이버로 시작하기
              </CommonButton>
            </Link>
          </ButtonBox>
          <hr />
        </LoginModalLayout>
      </Background>
    </ModalPortal>
  )
}
