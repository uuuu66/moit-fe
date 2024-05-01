import { useNavigate } from 'react-router-dom'
import { Fragment } from 'react/jsx-runtime'
import { CardIconText } from '../MeetingCard/styles'
import {
  BookmarkedCard,
  EmptyTextBox,
  MeetingCard,
  MeetingCardBox,
  TitleBox,
} from './styles'
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
            status,
          }) => (
            <Fragment key={meetingId}>
              {meetingsStatus === 'bookmarked' ? (
                <BookmarkedCard
                  $isProgress={status !== 'COMPLETE'}
                  key={meetingId}
                  onClick={() => {
                    navigate(`/meetings/${meetingId}`)
                  }}
                >
                  <div className="bookmark-card-box-top">
                    <span>
                      {status === 'COMPLETE' ? '모임 종료' : '모임 진행 중'}
                    </span>
                    <BookMark meetingId={meetingId} />
                  </div>
                  <div className="bookmark-card-box-bottom">
                    <TitleBox>
                      <h2>{meetingName}</h2>
                      <img src="/assets/enter.svg" alt="enter" />
                    </TitleBox>
                    <CardIconText>
                      <img src="/assets/calendar.svg" alt="calendar" />
                      <p>{`${meetingDate} | ${meetingStartTime} - ${meetingEndTime}`}</p>
                    </CardIconText>
                  </div>
                </BookmarkedCard>
              ) : (
                <MeetingCard
                  $isProgress={status !== 'COMPLETE'}
                  key={meetingId}
                  onClick={() => {
                    navigate(`/meetings/${meetingId}/chats`)
                  }}
                >
                  <span>
                    {status === 'COMPLETE' ? '모임 종료' : '모임 진행 중'}
                  </span>
                  <TitleBox>
                    <h2>{meetingName}</h2>
                    <img src="/assets/enter.svg" alt="enter" />
                  </TitleBox>
                  <hr />
                  <CardIconText>
                    <img src="/assets/calendar.svg" alt="calendar" />
                    <p>{`${meetingDate} | ${meetingStartTime} - ${meetingEndTime}`}</p>
                  </CardIconText>
                </MeetingCard>
              )}
            </Fragment>
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
