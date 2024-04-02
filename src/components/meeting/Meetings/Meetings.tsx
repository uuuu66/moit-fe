import styled from 'styled-components'
import { type Meeting } from '@/type/meeting'
import MainMeetingCard from '../MainMeetingCard/MainMeetingCard'

interface MeetingsProps {
  meetings: Meeting[]
}

export default function Meetings({ meetings }: MeetingsProps): JSX.Element {
  return (
    <MeetingsLayout>
      {meetings.map((meeting) => (
        <MainMeetingCard
          meeting={meeting}
          key={`${meeting.meetingId}_${meeting.meetingName}`}
        />
      ))}
    </MeetingsLayout>
  )
}

const MeetingsLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`
