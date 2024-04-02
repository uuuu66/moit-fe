import styled from 'styled-components'
import { type Meeting } from '@/type/meeting'

interface MainMeetingCardProps {
  meeting: Meeting
}

export default function MainMeetingCard({
  meeting,
}: MainMeetingCardProps): JSX.Element {
  const { meetingName, address, skills, date, startTime, endTime } = meeting
  return (
    <MainMeetingCardLayout>
      <SubContentsBox>
        <DateBox>
          <p>{date}</p>
          <p>{`${startTime} - ${endTime}`}</p>
        </DateBox>
      </SubContentsBox>
      <ContentsBox>
        <TextBox>
          <h2>{meetingName}</h2>
          <p>{address}</p>
        </TextBox>
        <TagBox>
          {skills.map((skill) => (
            <p key={skill}>
              <span>#</span>
              {skill}
            </p>
          ))}
        </TagBox>
      </ContentsBox>
    </MainMeetingCardLayout>
  )
}

const MainMeetingCardLayout = styled.div`
  width: 259px;
  height: 286px;
  background: #ddd;
  border-radius: 32px;
  padding: 22px 23.5px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`
const SubContentsBox = styled.div`
  font-size: 12px;
  display: flex;
  justify-content: space-between;

  p {
    padding: 2px 0;
    height: 18px;
  }
`

const DateBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

const ContentsBox = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  max-width: 180px;
  word-break: keep-all;

  h2 {
    line-height: 1.7;
    font-size: 1rem;
    font-weight: 700;
  }

  p {
    font-size: 14px;
  }
`
const TagBox = styled.div`
  max-height: 60px;
  display: flex;
  gap: 6px;
  flex-wrap: wrap;

  p {
    padding: 6px 12px;
    height: 26px;
    display: flex;
    align-items: center;
    border: 1px solid #7a7a7a;
    border-radius: 25px;

    font-size: 12px;
  }

  span {
    padding-top: 2px;
  }
`
