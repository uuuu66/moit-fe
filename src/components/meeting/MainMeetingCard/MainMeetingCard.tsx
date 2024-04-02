import { type Meeting } from '@/type/meeting'
import {
  ContentsBox,
  DateBox,
  MainMeetingCardLayout,
  SubContentsBox,
  TagBox,
  TextBox,
} from './styles'

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
