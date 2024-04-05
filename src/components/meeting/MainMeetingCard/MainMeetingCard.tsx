import { type GetMeetingType } from '@/type/meeting'
import {
  ContentsBox,
  DateBox,
  MainMeetingCardLayout,
  SubContentsBox,
  TagBox,
  TextBox,
} from './styles'

interface MainMeetingCardProps {
  meeting: GetMeetingType
}

export default function MainMeetingCard({
  meeting,
}: MainMeetingCardProps): JSX.Element {
  const { meetingName, skillList } = meeting
  return (
    <MainMeetingCardLayout>
      <SubContentsBox>
        <DateBox>
          {/* <p>{date}</p>
          <p>{`${startTime} - ${endTime}`}</p> */}
        </DateBox>
      </SubContentsBox>
      <ContentsBox>
        <TextBox>
          <h2>{meetingName}</h2>
          {/* <p>{address}</p> */}
        </TextBox>
        <TagBox>
          {skillList.map(({ id, skillName }) => (
            <p key={id}>
              <span>#</span>
              {skillName}
            </p>
          ))}
        </TagBox>
      </ContentsBox>
    </MainMeetingCardLayout>
  )
}
