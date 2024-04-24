import { useNavigate } from 'react-router-dom'
import { CardIconText } from '../MeetingCard/styles'
import { EmptyTextBox, MeetingCard, MeetingCardBox, TitleBox } from './styles'
import { type MyMeeting } from '@/type/user'
import BookMark from '../Bookmark/BookMark'
import { type MyMeetingsStatus } from '@/type/meeting'

interface MypageMeetingListProps {
  meetings: MyMeeting[]
  meetingsStatus: MyMeetingsStatus
  emptyText: string
}

export default function MypageMeetingList({
  meetings,
  meetingsStatus,
  emptyText,
}: MypageMeetingListProps): JSX.Element {
  const navigate = useNavigate()

  const isProgress = meetingsStatus === 'progress'

  return (
    <MeetingCardBox>
      {meetings.length !== 0 ? (
        meetings.map(
          ({
            meetingId,
            meetingName,
            meetingDate,
            meetingStartTime,
            meetingEndTime,
          }) => (
            <MeetingCard
              $isProgress={isProgress}
              key={meetingId}
              onClick={() => {
                navigate(`/meetings/${meetingId}/chats`)
              }}
            >
              <span>{isProgress ? '참여중' : '참여 완료'}</span>
              <TitleBox>
                <h2>{meetingName}</h2>
                {meetingsStatus === 'bookmarked' ? (
                  <BookMark meetingId={meetingId} />
                ) : (
                  <img src="/assets/enter.svg" alt="enter" />
                )}
              </TitleBox>
              <hr />
              <CardIconText>
                <img src="/assets/calendar.svg" alt="calendar" />
                <p>{`${meetingDate} | ${meetingStartTime} - ${meetingEndTime}`}</p>
              </CardIconText>
            </MeetingCard>
          )
        )
      ) : (
        <EmptyTextBox>
          <img src="/assets/warning.svg" alt="warning" />
          <p>{`${emptyText} 모임이 없습니다.`}</p>
        </EmptyTextBox>
      )}
    </MeetingCardBox>
  )
}
