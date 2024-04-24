import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { ButtonBox, MyMeetingsLayout } from './styles'
import { type MyMeetingsStatus } from '@/type/meeting'
import { meetingKeys } from '@/constants/queryKeys'
import { getMyMeetings } from '@/apis/user'
import { type MyMeeting } from '@/type/user'
import MypageMeetingList from '../MypageMeetingList/MypageMeetingList'

export default function MyMeetings(): JSX.Element {
  const [tab, setTab] = useState<MyMeetingsStatus>('progress')
  const [onTotalOpen, setOnTotalOpen] = useState(false)

  const { data: meetings } = useQuery({
    queryKey: meetingKeys.myMeetings(tab),
    queryFn: async () => await getMyMeetings(tab),
  })

  const getCurrentMeetings = (): MyMeeting[] => {
    if (meetings == null || meetings?.length === 0) return []
    return onTotalOpen ? meetings : meetings.slice(0, 2)
  }

  const isProgress = tab === 'progress'
  const emptyText = (): string => {
    if (tab === 'progress') return '참여 중인'
    if (tab === 'complete') return '참여 완료한'
    if (tab === 'held') return '개최한'
    return ''
  }

  return (
    <MyMeetingsLayout>
      <ButtonBox>
        <div className="button-flex-box">
          <button
            className={isProgress ? 'tab-active-button' : ''}
            type="button"
            onClick={() => {
              setTab('progress')
            }}
          >
            참여 중인 모임
          </button>
          <button
            className={tab !== 'progress' ? 'tab-active-button' : ''}
            type="button"
            onClick={() => {
              setTab('complete')
            }}
          >
            참여 완료 모임
          </button>
        </div>
        <button
          type="button"
          onClick={() => {
            setOnTotalOpen(!onTotalOpen)
          }}
        >
          {meetings != null && meetings.length > 2 && (
            <span>{onTotalOpen ? '목록 접기' : '더보기'}</span>
          )}
        </button>
      </ButtonBox>
      <MypageMeetingList
        meetings={getCurrentMeetings()}
        meetingsStatus={tab}
        emptyText={emptyText()}
      />
    </MyMeetingsLayout>
  )
}
