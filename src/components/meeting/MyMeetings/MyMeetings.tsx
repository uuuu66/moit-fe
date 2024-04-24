import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { ButtonBox, MyMeetingsLayout } from './styles'
import { type MyMeetingsStatus } from '@/type/meeting'
import { meetingKeys } from '@/constants/queryKeys'
import { getMyMeetings } from '@/apis/user'
import { type MyMeeting } from '@/type/user'
import MypageMeetingList from '../MypageMeetingList/MypageMeetingList'

interface StatusDisplayName {
  status: MyMeetingsStatus
  name: string
}

const STATUS_DISPLAYNAME: StatusDisplayName[] = [
  { status: 'progress', name: '참여 중' },
  { status: 'complete', name: '참여 완료' },
  { status: 'held', name: '개최한' },
]

export default function MyMeetings(): JSX.Element {
  const [tab, setTab] = useState<StatusDisplayName>({
    status: 'progress',
    name: '참여 중인',
  })
  const [onTotalOpen, setOnTotalOpen] = useState(false)

  const { data: meetings } = useQuery({
    queryKey: meetingKeys.myMeetings(tab.status),
    queryFn: async () => await getMyMeetings(tab.status),
  })

  const getCurrentMeetings = (): MyMeeting[] => {
    if (meetings == null || meetings?.length === 0) return []
    return onTotalOpen ? meetings : meetings.slice(0, 2)
  }

  return (
    <MyMeetingsLayout>
      <ButtonBox>
        <div className="button-flex-box">
          {STATUS_DISPLAYNAME.map(({ status, name }) => (
            <button
              key={status}
              className={tab.status === status ? 'tab-active-button' : ''}
              type="button"
              onClick={() => {
                setTab({ status, name })
              }}
            >
              {`${name} 모임`}
            </button>
          ))}
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
        meetingsStatus={tab.status}
        emptyText={tab.name}
      />
    </MyMeetingsLayout>
  )
}
