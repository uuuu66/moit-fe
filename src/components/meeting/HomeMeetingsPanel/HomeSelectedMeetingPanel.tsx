import { useNavigate } from 'react-router-dom'
import { type GetMeeting } from '@/type/meeting'
import {
  HomeMeetingsPanelLayout,
  MeetingsBackground,
  SelectedCardToggleBox,
} from './styles'
import HomeSelectedMeetingCard from '../MeetingCard/HomeSelectedMeetingCard'

interface HomeSelectedMeetingPanelProps {
  meeting: GetMeeting
  handleClosePanel: () => void
}

export default function HomeSelectedMeetingPanel({
  meeting,
  handleClosePanel,
}: HomeSelectedMeetingPanelProps): JSX.Element {
  const navigate = useNavigate()
  const {
    meetingId,
    meetingName,
    registeredCount,
    totalCount,
    locationAddress,
    meetingDate,
    meetingStartTime,
    meetingEndTime,
    skillList,
    careerList,
  } = meeting

  return (
    <HomeMeetingsPanelLayout>
      <SelectedCardToggleBox onClick={handleClosePanel}>
        <hr />
      </SelectedCardToggleBox>
      <MeetingsBackground onClick={handleClosePanel} />
      <HomeSelectedMeetingCard
        meetingId={meetingId}
        title={meetingName}
        date={meetingDate}
        time={`${meetingStartTime} - ${meetingEndTime}`}
        address={`${locationAddress.split(' ')[0]} ${locationAddress.split(' ')[1]}`}
        memberCount={`${registeredCount} / ${totalCount}`}
        careerList={careerList.map(({ careerName }) => careerName).join(', ')}
        tags={skillList}
        handleCardClick={() => {
          navigate(`/meetings/${meetingId}`)
        }}
      />
    </HomeMeetingsPanelLayout>
  )
}
