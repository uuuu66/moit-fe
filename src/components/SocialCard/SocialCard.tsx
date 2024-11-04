import { type AllHTMLAttributes } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import FlexDiv from '../common/FlexDiv/FlexDiv'
import { type GetMeeting } from '@/type/meeting'
import Dummy from '../../../public/assets/dummy.jpeg'
import { theme } from '@/constants/theme'
import Tag from '../common/Tag/Tag'

interface Props extends AllHTMLAttributes<HTMLDivElement> {
  meetingData: Partial<GetMeeting>
}

export default function SocialCard(props: Props): JSX.Element {
  const { meetingData } = props
  const navigate = useNavigate()
  const handleClickCard = (): void => {
    navigate(`/meetings/${meetingData.meetingId}`)
  }
  return (
    <CardContainer onClick={handleClickCard}>
      <img src={Dummy} alt="dummy" />
      <FlexDiv flexDirection="column" gap={2} alignItem="flex-start">
        <span className="title">{meetingData.meetingName}</span>
        <FlexDiv gap={2}>
          <Tag bgColor={theme.color.black10} color={theme.color.black80}>
            소셜링
          </Tag>
          <Tag bgColor={theme.color.black10} color={theme.color.black80}>
            번개
          </Tag>
        </FlexDiv>

        <span className="space">{meetingData.locationAddress}</span>
        <FlexDiv gap={1}>
          <span className="time">{meetingData.meetingStartTime}</span>
          <span className="time">-</span>
          <span className="time">{meetingData.meetingEndTime}</span>
        </FlexDiv>

        <FlexDiv gap={4}>
          <span className="capacity">모집인원</span>
          <FlexDiv gap={1}>
            <span className="capacity">{meetingData.registeredCount}</span>
            <span className="capacity">/</span>
            <span className="capacity">{meetingData.totalCount}</span>
          </FlexDiv>
        </FlexDiv>
      </FlexDiv>
    </CardContainer>
  )
}
const CardContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 12px 24px;
  background-color: ${theme.color.white};
  border-radius: 0px;
  justify-content: space-around;
  align-items: center;
  gap: 12px;
  overflow-x: hidden;
  cursor: pointer;
  img {
    border-radius: 8px;
    object-fit: contain;

    height: 120px;
    min-height: 120px;
    max-height: 120px;
    aspect-ratio: 1/1;
  }
  span.title {
    width: 208px;
    font-size: medium;
    font-weight: 700;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: ${theme.color.black70};
  }
  span.category {
    font-weight: 500;
  }
  span.space {
    font-size: small;
    color: ${theme.color.black50};
  }
  span.time {
    font-size: small;
    color: ${theme.color.black40};
  }
  span.capacity {
    font-size: small;
    color: ${theme.color.black30};
  }
`
