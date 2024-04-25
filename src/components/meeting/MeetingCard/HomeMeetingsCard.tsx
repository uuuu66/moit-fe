import { useRef } from 'react'
import {
  CardIconText,
  ContentsBox,
  HomeMeetingsCardLayout,
  LeftShadowBox,
  RightShadowBox,
  ScrollBox,
  TagBox,
  TextBox,
  TitleBox,
} from './styles'
import useScrollPosition from '@/hooks/useScrollPosition'
import BookMark from '../Bookmark/BookMark'

interface HomeMeetingsCardProps {
  meetingId: number
  title: string
  date: string
  time: string
  address: string
  memberCount: string
  tags: Array<{ name: string; id: number }>
  bookmarked: boolean
  handleCardClick: () => void
}

export default function HomeMeetingsCard({
  meetingId,
  title,
  date,
  time,
  address,
  memberCount,
  tags,
  bookmarked,
  handleCardClick,
}: HomeMeetingsCardProps): JSX.Element {
  const scrollBoxRef = useRef<HTMLDivElement>(null)
  const { isScrollLeft, isScrollRight } = useScrollPosition(scrollBoxRef)

  return (
    <HomeMeetingsCardLayout onClick={handleCardClick}>
      <TitleBox>
        <div className="title-text-box">
          <h3>{title}</h3>
        </div>
        <div className="title-button-box">
          <BookMark meetingId={meetingId} bookmarked={bookmarked} />
          <div className="title-img-box">
            <img src="/assets/right.svg" alt="right" />
          </div>
        </div>
      </TitleBox>
      <ContentsBox>
        <TextBox>
          <CardIconText>
            <img src="/assets/time.svg" alt="time" />
            <p>{`${date} | ${time}`}</p>
          </CardIconText>
          <div className="flex-box">
            <CardIconText>
              <img src="/assets/pin.svg" alt="pin" />
              <p>{address}</p>
            </CardIconText>
            <CardIconText>
              <img src="/assets/member.svg" alt="member" />
              <p>{memberCount}</p>
            </CardIconText>
          </div>
        </TextBox>
        <TagBox>
          <LeftShadowBox $isScrollLeft={isScrollLeft} />
          <RightShadowBox $isScrollRight={isScrollRight} />
          <ScrollBox ref={scrollBoxRef}>
            <div>
              {tags.map(({ name, id }) => (
                <p key={`${id}_${name}`}>{name}</p>
              ))}
            </div>
          </ScrollBox>
        </TagBox>
      </ContentsBox>
    </HomeMeetingsCardLayout>
  )
}
