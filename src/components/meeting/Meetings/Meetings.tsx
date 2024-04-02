import { type Meeting } from '@/type/meeting'
import MainMeetingCard from '@/components/meeting/MainMeetingCard/MainMeetingCard'
import { MeetingsLayout, ScrollBox } from './styles'

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
