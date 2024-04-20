import { useState } from 'react'
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

interface HomeMeetingsCardProps {
  title: string
  date: string
  time: string
  address: string
  memberCount: string
  tags: Array<{ name: string; id: number }>
  handleCardClick: () => void
}

export default function HomeMeetingsCard({
  title,
  date,
  time,
  address,
  memberCount,
  tags,
  handleCardClick,
}: HomeMeetingsCardProps): JSX.Element {
  const [isScrollLeft, setIsScrollLeft] = useState(true)
  const [isScrollRight, setIsScrollRight] = useState(false)

  const handleScroll = (e: React.UIEvent<HTMLElement>): void => {
    const boxWidth = e.currentTarget.clientWidth
    const { scrollWidth } = e.currentTarget
    const scrollPosition = e.currentTarget.scrollLeft

    if (isScrollLeft && scrollPosition > 1) {
      setIsScrollLeft(false)
    }
    if (!isScrollLeft && scrollPosition <= 1) {
      setIsScrollLeft(true)
    }
    if (!isScrollRight && boxWidth + scrollPosition + 1 >= scrollWidth) {
      setIsScrollRight(true)
    }
    if (isScrollRight && boxWidth + scrollPosition + 1 < scrollWidth) {
      setIsScrollRight(false)
    }
  }

  return (
    <HomeMeetingsCardLayout onClick={handleCardClick}>
      <TitleBox>
        <h3>{title}</h3>
        <img src="/assets/right.svg" alt="right" />
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
          <ScrollBox onScroll={handleScroll}>
            <div className="tag-flex-box" onScroll={handleScroll}>
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
