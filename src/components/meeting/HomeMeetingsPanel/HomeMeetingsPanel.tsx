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
import useScreenSize from '@/hooks/useScreenSize'

interface HomeMeetingsPanelProps {
  meetings: GetMeeting[]
  handleScrollEnd: () => void
}

export default function HomeMeetingsPanel({
  meetings,
  handleScrollEnd,
}: HomeMeetingsPanelProps): JSX.Element {
  const [isPanelOpen, setIsPanelOpen] = useState(false)
  const scrollBoxRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()
  const { screenHeight } = useScreenSize()
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
  }, [handleScroll, handleScrollEnd])

  useEffect(() => {
    const storageScrollPosition = sessionStorage.getItem('scrollPosition')

    const scrollBox = scrollBoxRef.current
    if (storageScrollPosition !== null) {
      setIsPanelOpen(true)
    }
    if (scrollBox !== null && storageScrollPosition !== null) {
      scrollBox.scrollTo({ top: Number(storageScrollPosition) })
      sessionStorage.removeItem('scrollPosition')
    }
  }, [isPanelOpen])

  const handleCardClick = (meetingId: number): void => {
    navigate(`/meetings/${meetingId}
      `)
    const scrollBox = scrollBoxRef.current
    if (scrollBox !== null) {
      sessionStorage.setItem('scrollPosition', String(scrollBox.scrollTop))
    }
  }

  return (
    <HomeMeetingsPanelLayout>
      <ToggleBox
        onClick={() => {
          setIsPanelOpen(!isPanelOpen)
        }}
      >
        <hr />
        <div>
          <span>👨‍💻</span>
          <p>내 주위 모각코</p>
        </div>
      </ToggleBox>
      {isPanelOpen && (
        <>
          <MeetingsBackground
            onClick={() => {
              setIsPanelOpen(!isPanelOpen)
            }}
          />
          <MeetingsBox $isSmall={screenHeight < 800} ref={scrollBoxRef}>
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
                    meetingId={meetingId}
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
                      handleCardClick(meetingId)
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
