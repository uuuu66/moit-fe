import styled from 'styled-components'
import { type Meeting } from '@/type/meeting'

interface MainMeetingCardProps {
  meeting: Meeting
}

export default function MainMeetingCard({
  meeting,
}: MainMeetingCardProps): JSX.Element {
  const {
    meetingName,
    address,
    registeredCount,
    totalCount,
    skills,
    date,
    startTime,
    endTime,
    locationLat,
  } = meeting
  return <div>MainMeetingCard</div>
}
