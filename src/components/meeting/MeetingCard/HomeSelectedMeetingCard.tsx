import { useRef } from 'react'
import { type SkillList } from '@/type/meeting'
import {
  CardIconText,
  HomeSelectedMeetingCardLayout,
  LeftShadowBox,
  RightShadowBox,
  ScrollBox,
  SelectedCardCButtonBox,
  SelectedCardContentsBox,
  SelectedCardTitleBox,
  TagBox,
} from './styles'
import CommonButton from '@/components/common/Button/CommonButton'
import useScrollPosition from '@/hooks/useScrollPosition'
import BookMark from '../Bookmark/BookMark'

interface HomeSelectedMeetingCardProps {
  meetingId: number
  title: string
  date: string
  time: string
  address: string
  memberCount: string
  careerList: string
  tags: SkillList[]
  handleCardClick: () => void
}

export default function HomeSelectedMeetingCard({
  meetingId,
  title,
  date,
  time,
  address,
  memberCount,
  careerList,
  tags,
  handleCardClick,
}: HomeSelectedMeetingCardProps): JSX.Element {
  const scrollBoxRef = useRef<HTMLDivElement>(null)
  const { isScrollLeft, isScrollRight } = useScrollPosition(scrollBoxRef)
  return (
    <HomeSelectedMeetingCardLayout>
      <SelectedCardTitleBox>
        <h3>{title}</h3>
        <div className="title-flex-box">
          <CardIconText>
            <img src="/assets/pin.svg" alt="pin" />
            <p>{address}</p>
          </CardIconText>
          <CardIconText>
            <img src="/assets/member.svg" alt="member" />
            <p>{memberCount}</p>
          </CardIconText>
        </div>
      </SelectedCardTitleBox>
      <hr />
      <SelectedCardContentsBox>
        <div className="contents-flex-box">
          <CardIconText>
            <img src="/assets/time.svg" alt="time" />
            <p>
              <strong>진행일시</strong>
              {`${date} | ${time}`}
            </p>
          </CardIconText>
          <CardIconText>
            <img src="/assets/career.svg" alt="career" />
            <p>
              <strong>경력</strong>
              {careerList}
            </p>
          </CardIconText>
          <TagBox>
            <LeftShadowBox $isScrollLeft={isScrollLeft} />
            <RightShadowBox $isScrollRight={isScrollRight} />
            <ScrollBox ref={scrollBoxRef}>
              <div>
                {tags.map(({ id, skillName }) => (
                  <p key={`${id}_${skillName}`}>{skillName}</p>
                ))}
              </div>
            </ScrollBox>
          </TagBox>
        </div>
      </SelectedCardContentsBox>
      <hr />
      <SelectedCardCButtonBox>
        <BookMark meetingId={meetingId} />
        <CommonButton
          size="large"
          $type="primary"
          style={{ width: '100%' }}
          handleClick={handleCardClick}
        >
          모임 상세보기
        </CommonButton>
      </SelectedCardCButtonBox>
    </HomeSelectedMeetingCardLayout>
  )
}
