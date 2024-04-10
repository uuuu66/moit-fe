import { useQuery } from '@tanstack/react-query'
import Footer from '@/components/Footer/Footer'
import {
  ContentsBox,
  ImageBox,
  InfoCard,
  InfoCardBox,
  MeetingCard,
  MeetingCardBox,
  MeetingsBox,
  MypageLayout,
  ProfileBox,
} from './styles'
import { userKeys } from '@/constants/queryKeys'
import { getProfile } from '@/apis/user'

export default function Mypage(): JSX.Element {
  const { data: profileInfo } = useQuery({
    queryKey: userKeys.profile,
    queryFn: async () => await getProfile(),
  })

  if (profileInfo == null) return <div>로딩중</div>

  const { enterMeeting, studyTime, heldMeeting } = profileInfo

  return (
    <MypageLayout>
      <ContentsBox>
        <h2>MY PAGE</h2>
        <ProfileBox>
          <ImageBox>
            <img src="assets/logo.svg" alt="profile" />
          </ImageBox>
          <InfoCardBox>
            <InfoCard>
              <h3>참여한 모임</h3>
              <p>
                {`${enterMeeting} `}
                <span>개</span>
              </p>
            </InfoCard>
            <InfoCard>
              <h3>스터디 시간</h3>
              <p>
                {`${Number(studyTime.split(':')[0])} `}
                <span>시간</span>
              </p>
            </InfoCard>
            <InfoCard>
              <h3>개최한 모임</h3>
              <p>
                {`${heldMeeting} `}
                <span>개</span>
              </p>
            </InfoCard>
          </InfoCardBox>
        </ProfileBox>
        <MeetingsBox>
          <h3>참여 중인 모임</h3>
          <MeetingCardBox>
            <MeetingCard>
              <p>모임 제목</p>
              <div>
                <img src="assets/enter.svg" alt="enter" />
              </div>
            </MeetingCard>
          </MeetingCardBox>
        </MeetingsBox>
      </ContentsBox>
      <Footer />
    </MypageLayout>
  )
}
