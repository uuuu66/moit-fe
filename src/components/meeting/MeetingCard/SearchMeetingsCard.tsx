import { memo, useRef } from 'react'
import { type GetMeeting } from '@/type/meeting'
import {
  LeftShadowBox,
  RightShadowBox,
  SearchMeetingCardLayout,
  TagBox,
  CardIconText,
  ContentsBox,
  TextBox,
  ScrollBox,
} from './styles'
import useScrollPosition from '@/hooks/useScrollPosition'

interface SearchMeetingsCardProps {
  meeting: GetMeeting
  handleCardClick: (meeting: number) => void
}

export default memo(function SearchMeetingsCard({
  meeting,
  handleCardClick,
}: SearchMeetingsCardProps): JSX.Element {
  const tagBoxRef = useRef<HTMLDivElement>(null)
  const { isScrollLeft, isScrollRight } = useScrollPosition(tagBoxRef)

  const {
    meetingId,
    meetingName,
    locationAddress,
    meetingDate,
    meetingEndTime,
    meetingStartTime,
    registeredCount,
    totalCount,
    skillList,
  } = meeting

  return (
    <SearchMeetingCardLayout
      onClick={() => {
        handleCardClick(meetingId)
      }}
    >
      <h2>{meetingName}</h2>
      <div className="card-flex-box">
        <ContentsBox>
          <TextBox>
            <CardIconText>
              <img src="/assets/time.svg" alt="time" />
              <p>{`${meetingDate} | ${meetingStartTime} - ${meetingEndTime}`}</p>
            </CardIconText>
            <div className="flex-box">
              <CardIconText>
                <img src="/assets/pin.svg" alt="pin" />
                <p>{`${locationAddress.split(' ')[0]} ${locationAddress.split(' ')[1]}`}</p>
              </CardIconText>
              <CardIconText>
                <img src="/assets/member.svg" alt="member" />
                <p>{`${registeredCount} / ${totalCount}`}</p>
              </CardIconText>
            </div>
          </TextBox>
          <TagBox style={{ maxWidth: '304px' }}>
            <LeftShadowBox $isScrollLeft={isScrollLeft} />
            <RightShadowBox $isScrollRight={isScrollRight} />
            <ScrollBox ref={tagBoxRef}>
              <div>
                {skillList.map(({ skillName, id }) => (
                  <p key={`${id}_${skillName}`}>{skillName}</p>
                ))}
              </div>
            </ScrollBox>
          </TagBox>
        </ContentsBox>
        {/* <div className="right-icon-box"> */}
        <img src="/assets/right.svg" alt="right" />
        {/* </div> */}
      </div>
    </SearchMeetingCardLayout>
  )
})
