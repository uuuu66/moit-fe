import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { type GetMeeting } from '@/type/meeting'
import {
  CardBox,
  HomeMeetingsPanelLayout,
  MeetingsBackground,
  MeetingsBox,
  ToggleBox,
} from './styles'
import HomeMeetingsCard from '../MeetingCard/HomeMeetingsCard'
import useScrollEnd from '@/hooks/useScrollEnd'

interface HomeMeetingsPanelProps {
  meetings: GetMeeting[]
  handleScrollEnd: () => void
}

export default function HomeMeetingsPanel({
  meetings,
  handleScrollEnd,
}: HomeMeetingsPanelProps): JSX.Element {
  const [onListOpen, setOnListOpen] = useState(false)
  const scrollBoxRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  const { handleScroll } = useScrollEnd()

  useEffect(() => {
    const scrollBox = scrollBoxRef?.current
    const handleScrollEvent = (): void => {
      handleScroll(scrollBox, handleScrollEnd)
    }
    scrollBox?.addEventListener('scroll', handleScrollEvent)
    return () => {
      scrollBox?.removeEventListener('scroll', handleScrollEvent)
    }
  }, [onListOpen, handleScroll, handleScrollEnd])

  return (
    <HomeMeetingsPanelLayout>
      <ToggleBox
        onClick={() => {
          setOnListOpen(!onListOpen)
        }}
      >
        <hr />
        <div>
          <span>👨‍💻</span>
          <p>내 주위 모각코</p>
        </div>
      </ToggleBox>
      {onListOpen && (
        <>
          <MeetingsBackground
            onClick={() => {
              setOnListOpen(!onListOpen)
            }}
          />
          <MeetingsBox ref={scrollBoxRef}>
            <CardBox>
              {meetings.map(
                ({
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
                }) => (
                  <HomeMeetingsCard
                    key={meetingId}
                    title={meetingName}
                    date={meetingDate}
                    time={`${meetingStartTime} - ${meetingEndTime}`}
                    address={`${locationAddress.split(' ')[0]} ${locationAddress.split(' ')[1]}`}
                    memberCount={`${registeredCount} / ${totalCount}`}
                    tags={[
                      ...careerList.map(({ careerName, id }) => ({
                        name: careerName,
                        id,
                      })),
                      ...skillList.map(({ skillName, id }) => ({
                        name: skillName,
                        id,
                      })),
                    ]}
                    handleCardClick={() => {
                      navigate(`/meetings/${meetingId}`)
                    }}
                  />
                )
              )}
            </CardBox>
          </MeetingsBox>
        </>
      )}
    </HomeMeetingsPanelLayout>
  )
}
