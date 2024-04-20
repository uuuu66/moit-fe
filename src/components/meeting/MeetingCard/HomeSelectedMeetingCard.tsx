import { type SkillList } from '@/type/meeting'
import {
  CardIconText,
  HomeSelectedMeetingCardLayout,
  ScrollBox,
  SelectedCardContentsBox,
  SelectedCardTitleBox,
} from './styles'
import CommonButton from '@/components/common/Button/CommonButton'
import { theme } from '@/constants/theme'

interface HomeSelectedMeetingCardProps {
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
  title,
  date,
  time,
  address,
  memberCount,
  careerList,
  tags,
  handleCardClick,
}: HomeSelectedMeetingCardProps): JSX.Element {
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
      <SelectedCardContentsBox onClick={handleCardClick}>
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
          <ScrollBox>
            <div>
              {tags.map(({ id, skillName }) => (
                <p key={`${id}_${skillName}`}>{skillName}</p>
              ))}
            </div>
          </ScrollBox>
        </div>
        <img src="/assets/right.svg" alt="right" />
      </SelectedCardContentsBox>
      <hr />
      <CommonButton
        size="large"
        style={{ width: '100%', background: theme.color.primary100 }}
        handleClick={handleCardClick}
      >
        바로 참여하기
      </CommonButton>
    </HomeSelectedMeetingCardLayout>
  )
}
