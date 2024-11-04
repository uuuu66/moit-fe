import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { Suspense, useContext, useState } from 'react'
import {
  ImageBox,
  InfoCard,
  InfoCardBox,
  MypageLayout,
  NavBox,
  ProfileBox,
  LogoutBox,
  SectionLine,
  UnregisterBox,
} from './styles'
import { userKeys } from '@/constants/queryKeys'
import { deleteUnregister, getProfile, logout } from '@/apis/user'
import MyMeetings from '@/components/meeting/MyMeetings/MyMeetings'
import BookmarkedMeetings from '@/components/meeting/MyMeetings/BookmarkedMeetings'

import { notify } from '@/components/Toast'
import AuthAlertModal from '@/components/modals/AuthAlertModal'
import { UserContext } from '@/shared/AuthProvider'
import { Profile } from '@/type/user'

export default function Mypage(): JSX.Element {
  const [onLogoutModal, setOnLogoutModal] = useState(false)
  const [onUnregisterModal, setOnUnregisterModal] = useState(false)
  const navigate = useNavigate()
  const userInfo = useContext(UserContext)

  const { data: profileInfo } = useQuery({
    queryKey: userKeys.profile,
    queryFn: async () => await getProfile(),
  })

  return (
    <Suspense
      fallback={
        <MypageLayout>
          <NavBox>
            <button
              type="button"
              onClick={() => {
                navigate(-1)
              }}
            >
              <img src="/assets/left.svg" alt="left" />
            </button>
            <h2>MY PAGE</h2>
          </NavBox>
        </MypageLayout>
      }
    >
      <MypageLayout>
        <NavBox>
          <button
            type="button"
            onClick={() => {
              navigate(-1)
            }}
          >
            <img src="/assets/left.svg" alt="left" />
          </button>
          <h2>MY PAGE</h2>
        </NavBox>
        <ProfileBox>
          <div className="profile-flex-box">
            <ImageBox>
              <img src="/assets/logo.svg" alt="profile" />
            </ImageBox>
            <p>{userInfo?.email}</p>
          </div>
          <InfoCardBox>
            <InfoCard>
              <h2>참여한 모임</h2>
              <p>
                {`${profileInfo?.enterMeeting ?? ''} `}
                <span>개</span>
              </p>
            </InfoCard>
            <InfoCard>
              <h2>스터디 시간</h2>
              <p>
                {`${Number((profileInfo?.studyTime ?? ':').split(':')[0])} `}
                <span>시간</span>
              </p>
            </InfoCard>
            <InfoCard>
              <h2>개최한 모임</h2>
              <p>
                {`${profileInfo?.heldMeeting ?? ''} `}
                <span>개</span>
              </p>
            </InfoCard>
          </InfoCardBox>
        </ProfileBox>
        <div>
          <MyMeetings />
          <BookmarkedMeetings />
        </div>
        <SectionLine />
        <LogoutBox
          onClick={() => {
            setOnLogoutModal(!onLogoutModal)
          }}
        >
          <div className="logout-flex-box">
            <img src="/assets/logout.svg" alt="logout" />
            <p>로그아웃</p>
          </div>
          <img src="/assets/right.svg" alt="right" />
        </LogoutBox>
        <UnregisterBox>
          <button
            type="button"
            onClick={() => {
              setOnUnregisterModal(!onUnregisterModal)
            }}
          >
            탈퇴하기
          </button>
        </UnregisterBox>
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
                  navigate('/')
                  notify({
                    type: 'default',
                    text: '로그아웃 되었습니다.',
                  })
                })
            }}
            buttonName="로그아웃"
          />
        )}
        {onUnregisterModal && (
          <AuthAlertModal
            message="탈퇴"
            firstSubMessage="회원탈퇴 시 모든 정보가"
            secondSubMessage="즉시 삭제 되며, 복구되지 않습니다"
            onClose={() => {
              setOnUnregisterModal(!onUnregisterModal)
            }}
            handleClick={(): void => {
              deleteUnregister()
                .catch(() => {})
                .finally(() => {
                  navigate('/')
                  notify({
                    type: 'default',
                    text: '회원 탈퇴 되었습니다.',
                  })
                })
            }}
            buttonName="탈퇴"
          />
        )}
      </MypageLayout>
    </Suspense>
  )
}
