import { useQuery } from '@tanstack/react-query'
import { jwtDecode } from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
import {
  ImageBox,
  InfoCard,
  InfoCardBox,
  MypageLayout,
  NavBox,
  ProfileBox,
  LogoutBox,
  SectionLine,
} from './styles'
import { userKeys } from '@/constants/queryKeys'
import { getProfile, logout } from '@/apis/user'
import { getLocalStorageItem } from '@/util/localStorage'

import LoadingPage from '../../shared/LoadingPage'
import ErrorPage from '@/shared/ErrorPage'
import MyMeetings from '@/components/meeting/MyMeetings/MyMeetings'
import BookmarkedMeetings from '@/components/meeting/MyMeetings/BookmarkedMeetings'

export default function Mypage(): JSX.Element {
  const navigate = useNavigate()

  const { data: profileInfo, isError } = useQuery({
    queryKey: userKeys.profile,
    queryFn: async () => await getProfile(),
  })

  if (profileInfo == null) return <LoadingPage name="페이지를" />

  const token: string = getLocalStorageItem('accessToken')
  const { enterMeeting, studyTime, heldMeeting } = profileInfo

  if (isError) return <ErrorPage />

  return (
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
          <p>{jwtDecode(token).sub}</p>
        </div>
        <InfoCardBox>
          <InfoCard>
            <h2>참여한 모임</h2>
            <p>
              {`${enterMeeting} `}
              <span>개</span>
            </p>
          </InfoCard>
          <InfoCard>
            <h2>스터디 시간</h2>
            <p>
              {`${Number(studyTime.split(':')[0])} `}
              <span>시간</span>
            </p>
          </InfoCard>
          <InfoCard>
            <h2>개최한 모임</h2>
            <p>
              {`${heldMeeting} `}
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
        onClick={(): void => {
          logout()
            .catch(() => {})
            .finally(() => {
              navigate('/')
              window.alert('로그아웃이 완료되었습니다.')
            })
        }}
      >
        <div className="logout-flex-box">
          <img src="/assets/logout.svg" alt="logout" />
          <p>로그아웃</p>
        </div>
        <img src="/assets/right.svg" alt="right" />
      </LogoutBox>
    </MypageLayout>
  )
}
