import {
  CardIconText,
  ContentsBox,
  HomeMeetingsCardLayout,
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
          <div>
            {tags.map(({ name, id }) => (
              <p key={`${id}_${name}`}>{name}</p>
            ))}
          </div>
        </TagBox>
      </ContentsBox>
    </HomeMeetingsCardLayout>
  )
}
