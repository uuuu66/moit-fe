import styled from 'styled-components'
import { type Meeting } from '@/type/meeting'
import MainMeetingCard from '@/components/meeting/MainMeetingCard/MainMeetingCard'

interface MeetingsProps {
  meetings: Meeting[]
}

export default function Meetings({ meetings }: MeetingsProps): JSX.Element {
  return (
    <MeetingsLayout>
      <ScrollBox>
        {meetings.map((meeting) => (
          <MainMeetingCard
            meeting={meeting}
            key={`${meeting.meetingId}_${meeting.meetingName}`}
          />
        ))}
      </ScrollBox>
    </MeetingsLayout>
  )
}

const MeetingsLayout = styled.div`
  position: absolute;
  bottom: 0;
  z-index: 1;
  width: 100%;
  overflow: scroll;
  padding: 0 20px 38px;
`

const ScrollBox = styled.div`
  display: flex;
  gap: 20px;
  width: fit-content;
`
