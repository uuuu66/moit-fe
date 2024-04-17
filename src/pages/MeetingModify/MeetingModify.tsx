import { useMutation, useQuery } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import {
  CareerContainer,
  InfoContainer,
  InfoHeader,
  InfoTitle,
  InputBox,
  MemberCount,
  PriceBox,
  RegisterTitle,
  WholeContainer,
} from '../Meeting/styles'
import FindLocation from '@/components/meeting/FindLocation/FindLocation'
import CommonButton from '@/components/common/Button/CommonButton'
import { editMeeting, getMeetingDetail } from '@/apis/meeting'
import useMap from '@/hooks/useMap'
import { type EditMeetingReq } from '@/type/request'
import { type Career, careerData } from '@/constants/careerData'
import { DetailButtonContainer } from '../MeetingDetail/styles'
import { theme } from '@/constants/theme'
import MeetingTechStack from '@/components/filter/TechStack/MeetingTechStack'
import { getTechStackList } from '@/apis/filter'
import {
  DisabledDateBox,
  DisabledTimeBox,
  DisabledTimeBoxContainer,
} from './styles'

function MeetingModify(): JSX.Element {
  useMap()
  const navi = useNavigate()
  const { meetingId } = useParams()

  const { data } = useQuery({
    queryKey: ['meetingListDetail', meetingId],
    queryFn: async () => await getMeetingDetail(Number(meetingId)),
  })

  const { data: techStackList } = useQuery({
    queryKey: ['stackList'],
    queryFn: async () => await getTechStackList(),
  })

  const [info, setInfo] = useState<EditMeetingReq>({
    meetingName: '',
    budget: 0,
    contents: '',
    totalCount: 0,
    locationAddress: '',
    locationLat: 0,
    locationLng: 0,
    regionFirstName: '',
    regionSecondName: '',
    skillIds: [],
    careerIds: [],
  })

  const careerNameToId = (careerNameList: string[]): number[] => {
    const careerIds: number[] = []
    careerNameList.forEach((name) => {
      const foundCareer = careerData.find(
        (career: Career) => career.careerName === name
      )
      if (foundCareer !== undefined) {
        careerIds.push(foundCareer.careerId)
      }
    })
    return careerIds
  }
  const careerIdList = careerNameToId(data?.careerNameList ?? [])

  const skillNameToId = (skillNameList: string[]): number[] => {
    const skillIds: number[] = []
    skillNameList.forEach((name) => {
      const foundSkill = techStackList?.find(
        (skill) => skill.skillName === name
      )
      if (foundSkill !== undefined) {
        skillIds.push(foundSkill.skillId)
      }
    })
    return skillIds
  }
  const skillIdList = skillNameToId(data?.skillNameList ?? [])

  useEffect(() => {
    setInfo({
      meetingName: data?.meetingName ?? '',
      budget: data?.budget ?? 0,
      contents: data?.contents ?? '',
      totalCount: data?.totalCount ?? 0,
      locationAddress: data?.locationAddress ?? '',
      locationLat: data?.locationLat ?? 0,
      locationLng: data?.locationLng ?? 0,
      regionFirstName: '',
      regionSecondName: '',
      skillIds: skillIdList,
      careerIds: careerIdList,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  const editMutation = useMutation({
    mutationFn: async () => {
      await editMeeting(Number(meetingId), info)
    },
    onSuccess: () => {
      navi(`/meetings/${meetingId}`)
    },
    onError: (err) => {
      console.log(err)
    },
  })

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInfo((prevState) => ({
      ...prevState,
      meetingName: e.target.value,
    }))
  }
  const handleContentChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    setInfo((prevState) => ({
      ...prevState,
      contents: e.target.value,
    }))
  }

  const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const budgetValue: number = parseInt(e.target.value, 10)
    setInfo((prevState) => ({
      ...prevState,
      budget: budgetValue,
    }))
  }

  const handleMemCountUpClick = (): void => {
    setInfo((prevState) => ({
      ...prevState,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      totalCount: prevState.totalCount! + 1,
    }))
  }

  const handleMemCountDownClick = (): void => {
    setInfo((prevState) => ({
      ...prevState,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      totalCount: prevState.totalCount! - 1,
    }))
  }

  const handleTechStackClick = (selectedStacks: number[]): void => {
    setInfo((prevState) => ({
      ...prevState,
      skillIds: selectedStacks,
    }))
  }

  const handleCareerClick = (careerId: number): void => {
    setInfo((prev) => {
      if (prev.careerIds.includes(careerId)) {
        return {
          ...prev,
          careerIds: prev.careerIds.filter((item) => item !== careerId),
        }
      }
      return {
        ...prev,
        careerIds: [...prev.careerIds, careerId],
      }
    })
  }

  const handleMeetingModifySubmit = (): void => {
    editMutation.mutate()
  }

  return (
    <WholeContainer>
      <InfoHeader>
        <button
          type="button"
          onClick={() => {
            navi(-1)
          }}
        >
          &#60;
        </button>
        <h2>모임 생성하기</h2>
      </InfoHeader>
      <RegisterTitle>
        <h1>모임을 소개해 주세요!</h1>
        <span>흩어져 있던 개발자들을 불러 봐요</span>
      </RegisterTitle>
      <div>
        <InfoContainer>
          <InfoTitle>모임명을 정해 볼까요?</InfoTitle>
          <span>알아보기 쉽게 한 줄로 작성해 주세요</span>
          <InputBox>
            <label htmlFor="nameInput">모임명</label>
            <input
              type="text"
              id="nameInput"
              placeholder="ex) 강남역에서 오후 2시 모각코 구합니다"
              value={info.meetingName}
              onChange={handleNameChange}
            />
          </InputBox>
        </InfoContainer>
        <InfoContainer>
          <InfoTitle>모임을 소개해 볼까요?</InfoTitle>
          <InputBox>
            <label htmlFor="contentInput">
              간단한 모임 소개를 작성해 주세요
            </label>
            <textarea
              id="contentInput"
              value={info.contents}
              onChange={handleContentChange}
            />
          </InputBox>
        </InfoContainer>
        {/* 날짜, 시간 선택 */}
        <InfoContainer>
          <InfoTitle>언제 만날까요?</InfoTitle>
          <DisabledDateBox>
            <span className="meetingDate">모임 날짜</span>
            <div className="date">
              <span>{data?.meetingDate}</span>
              <img
                src="/assets/meetingCalendar.svg"
                alt="달력"
                style={{ width: '2rem' }}
              />
            </div>
          </DisabledDateBox>
          <DisabledTimeBoxContainer>
            <DisabledTimeBox>
              <div className="dateTitle">
                <img src="/assets/meetingClock.svg" alt="clock" />
                <span>시작 시간</span>
              </div>
              <div className="dateTime">
                <span>{data?.meetingStartTime}</span>
                <img src="/assets/meetingDownArrow.svg" alt="clock" />
              </div>
            </DisabledTimeBox>
            <DisabledTimeBox>
              <div className="dateTitle">
                <img src="/assets/meetingClock.svg" alt="clock" />
                <span>종료 시간</span>
              </div>
              <div className="dateTime">
                <span>{data?.meetingEndTime}</span>
                <img src="/assets/meetingDownArrow.svg" alt="clock" />
              </div>
            </DisabledTimeBox>
          </DisabledTimeBoxContainer>
          <div className="dateInfo">
            <span>날짜, 시간은 수정이 불가능합니다</span>
          </div>
        </InfoContainer>
        {/* 위치 찾기 */}
        <InfoContainer>
          <InfoTitle>어디서 만날까요?</InfoTitle>
          <FindLocation
            info={info}
            setInfo={setInfo}
            locationAddress={info.locationAddress}
          />
        </InfoContainer>
        <InfoContainer>
          <InfoTitle>몇 명이서 모일까요?</InfoTitle>
          <span>본인을 포함한 최소 인원을 설정해 주세요</span>
          <MemberCount>
            <button type="button" onClick={handleMemCountDownClick}>
              <img src="/assets/meetingMinus.svg" alt="minus" />
            </button>
            <div>{info.totalCount}</div>
            <button type="button" onClick={handleMemCountUpClick}>
              <img src="/assets/meetingPlus.svg" alt="plus" />
            </button>
          </MemberCount>
        </InfoContainer>
        <InfoContainer>
          <InfoTitle>참가비가 필요한가요?</InfoTitle>
          <span>부담스럽지 않은 금액이 좋아요</span>
          <PriceBox>
            <label htmlFor="price">참가 금액</label>
            <div>
              <input
                type="number"
                id="price"
                placeholder="ex)3,000"
                value={info.budget}
                onChange={handleBudgetChange}
              />
              <label htmlFor="price">원</label>
            </div>
          </PriceBox>
        </InfoContainer>
        <InfoContainer>
          <InfoTitle>모임에 필요한 기술 스택을 알려 주세요</InfoTitle>
          <MeetingTechStack
            selectedFilters={info.skillIds}
            handleSelectedFilters={handleTechStackClick}
          />
        </InfoContainer>
        <InfoContainer>
          <InfoTitle>경력을 알려 주세요</InfoTitle>
          <CareerContainer>
            {careerData.map((career: Career) => (
              <button
                type="button"
                key={career.careerId}
                onClick={() => {
                  handleCareerClick(career.careerId)
                }}
                className={
                  info.careerIds.includes(career.careerId) ? 'selected' : ''
                }
              >
                {career.careerName}
              </button>
            ))}
          </CareerContainer>
        </InfoContainer>
      </div>
      <DetailButtonContainer>
        <CommonButton
          size="large"
          handleClick={handleMeetingModifySubmit}
          style={{ backgroundColor: `${theme.color.primary100}` }}
        >
          수정하기
        </CommonButton>
      </DetailButtonContainer>
    </WholeContainer>
  )
}

export default MeetingModify
