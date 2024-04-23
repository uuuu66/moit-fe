import { useEffect, useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
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
  const navi = useNavigate()
  const [queries] = useSearchParams()
  const isPanelOpen = queries.get('list') === 'true' ?? false
  return (
    <HomeMeetingsPanelLayout>
      <ToggleBox
        onClick={() => {
          // setOnListOpen(!onListOpen)
          !isPanelOpen ? navi(`/?list=true`) : navi(`/?list=false`)
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
              // setOnListOpen(!onListOpen)
              navi(`/?list=false`)
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
