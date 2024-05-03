import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { getMyMeetings } from '@/apis/user'
import { meetingKeys } from '@/constants/queryKeys'
import { type MyMeeting } from '@/type/user'
import { BookmarkedMeetingsLayout, ButtonBox, ToggleButton } from './styles'
import MypageMeetingList from '../MypageMeetingList/MypageMeetingList'

export default function BookmarkedMeetings(): JSX.Element {
  const [onTotalOpen, setOnTotalOpen] = useState(false)

  const { data: meetings } = useQuery({
    queryKey: meetingKeys.myMeetings('bookmarked'),
    queryFn: async () => await getMyMeetings('bookmarked'),
  })

  const getCurrentMeetings = (): MyMeeting[] => {
    if (meetings == null || meetings?.length === 0) return []
    return onTotalOpen ? meetings : meetings.slice(0, 2)
  }

  return (
    <BookmarkedMeetingsLayout>
      <ButtonBox>
        <p>북마크한 모임</p>
      </ButtonBox>
      <MypageMeetingList
        meetings={getCurrentMeetings()}
        meetingsStatus="bookmarked"
        emptyText="북마크한"
      />
      {meetings != null && meetings.length > 2 && (
        <ToggleButton
          type="button"
          onClick={() => {
            setOnTotalOpen(!onTotalOpen)
          }}
        >
          <div className="toggle-button-text">
            <span>{onTotalOpen ? '접기' : '더보기'}</span>
            <img
              src={`/assets/${onTotalOpen ? 'up' : 'down'}.svg`}
              alt="toggle"
            />
          </div>
        </ToggleButton>
      )}
    </BookmarkedMeetingsLayout>
  )
}
