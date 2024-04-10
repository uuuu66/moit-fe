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

export default function Mypage(): JSX.Element {
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
                {`${99} `}
                <span>개</span>
              </p>
            </InfoCard>
            <InfoCard>
              <h3>스터디 시간</h3>
              <p>
                {`${99} `}
                <span>시간</span>
              </p>
            </InfoCard>
            <InfoCard>
              <h3>개최한 모임</h3>
              <p>
                {`${99} `}
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
            <MeetingCard>
              <p>모임 제목</p>
              <div>
                <img src="assets/enter.svg" alt="enter" />
              </div>
            </MeetingCard>{' '}
            <MeetingCard>
              <p>모임 제목</p>
              <div>
                <img src="assets/enter.svg" alt="enter" />
              </div>
            </MeetingCard>{' '}
            <MeetingCard>
              <p>모임 제목</p>
              <div>
                <img src="assets/enter.svg" alt="enter" />
              </div>
            </MeetingCard>{' '}
            <MeetingCard>
              <p>모임 제목</p>
              <div>
                <img src="assets/enter.svg" alt="enter" />
              </div>
            </MeetingCard>{' '}
            <MeetingCard>
              <p>모임 제목</p>
              <div>
                <img src="assets/enter.svg" alt="enter" />
              </div>
            </MeetingCard>
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
