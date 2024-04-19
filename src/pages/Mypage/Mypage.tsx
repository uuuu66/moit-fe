import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import { useState } from 'react'
import {
  ButtonBox,
  ImageBox,
  InfoCard,
  InfoCardBox,
  MeetingCard,
  MeetingCardBox,
  MeetingsBox,
  MypageLayout,
  NavBox,
  ProfileBox,
  TitleBox,
  EmptyTextBox,
  LogoutBox,
} from './styles'
import { userKeys } from '@/constants/queryKeys'
import { getMyMeetings, getProfile, logout } from '@/apis/user'
import { getLocalStorageItem } from '@/util/localStorage'
import { type MyMeeting } from '@/type/user'
import { CardIconText } from '@/components/meeting/MeetingCard/styles'
import LoadingPage from '../../shared/LoadingPage'
import ErrorPage from '@/shared/ErrorPage'

export default function Mypage(): JSX.Element {
  const [onTotalOpen, setOnTotalOpen] = useState(false)
  const navigate = useNavigate()

  const { data: profileInfo, isError } = useQuery({
    queryKey: userKeys.profile,
    queryFn: async () => await getProfile(),
  })

  const { data: meetings } = useQuery({
    queryKey: userKeys.myMeetings,
    queryFn: async () => await getMyMeetings(),
  })

  if (profileInfo == null) return <LoadingPage name="페이지를" />

  const getCurrentMeetings = (): MyMeeting[] => {
    if (meetings == null || meetings?.length === 0) return []
    return onTotalOpen ? meetings : meetings.slice(0, 2)
  }
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
      <MeetingsBox>
        <ButtonBox>
          <div className="button-flex-box">
            <button type="button">참여 중인 모임</button>
          </div>
          <button
            type="button"
            onClick={() => {
              setOnTotalOpen(!onTotalOpen)
            }}
          >
            {meetings != null && meetings.length > 2 && (
              <span>{onTotalOpen ? '목록 접기' : '모두보기'}</span>
            )}
          </button>
        </ButtonBox>
        <MeetingCardBox>
          {getCurrentMeetings().length !== 0 ? (
            getCurrentMeetings().map(({ meetingId, meetingName }) => (
              <MeetingCard
                key={meetingId}
                onClick={() => {
                  navigate(`/meetings/${meetingId}/chats`)
                }}
              >
                <TitleBox>
                  <h2>{meetingName}</h2>
                  <img src="/assets/enter.svg" alt="enter" />
                </TitleBox>
                <CardIconText>
                  <img src="/assets/calendar.svg" alt="calendar" />
                  <p>데이터 받아서 수정 필요</p>
                </CardIconText>
              </MeetingCard>
            ))
          ) : (
            <EmptyTextBox>
              <img src="/assets/warning.svg" alt="warning" />
              <p>참여 중인 모임이 없습니다</p>
            </EmptyTextBox>
          )}
        </MeetingCardBox>
      </MeetingsBox>
      <LogoutBox
        onClick={(): void => {
          logout()
            .catch(() => {})
            .finally(() => {
              navigate('/')
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
