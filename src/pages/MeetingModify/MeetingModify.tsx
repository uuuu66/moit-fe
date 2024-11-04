import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
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
import { type EditMeetingReq } from '@/type/request'
import { type Career, careerData } from '@/constants/careerData'
import { DetailButtonContainer } from '../MeetingDetail/styles'
import MeetingTechStack from '@/components/filter/TechStack/MeetingTechStack'
import { getTechStackList } from '@/apis/filter'
import {
  DisabledDateBox,
  DisabledTimeBox,
  DisabledTimeBoxContainer,
} from './styles'

import { notify } from '@/components/Toast'
import { filterKeys, meetingKeys } from '@/constants/queryKeys'
import { type FiltersKey } from '@/type/filter'
import { UserContext } from '@/shared/AuthProvider'

function MeetingModify(): JSX.Element {
  const navi = useNavigate()
  const userInfo = useContext(UserContext)
  const { meetingId } = useParams()
  const queryClient = useQueryClient()

  const { data, isLoading, isError } = useQuery({
    queryKey: meetingKeys.detail(meetingId),
    queryFn: async () => await getMeetingDetail(Number(meetingId)),
  })

  const { data: techStackList } = useQuery({
    queryKey: filterKeys.stackList,
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
      // TODO 수정 : (미팅리스트), (미팅상세)
      void queryClient.refetchQueries({ queryKey: meetingKeys.all })
      notify({
        type: 'default',
        text: '모임 수정이 완료되었습니다.',
      })
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
    const inputValue = e.target.value
    if (inputValue.includes('-')) {
      return
    }
    let budgetValue: number = parseInt(inputValue, 10)
    if (budgetValue > 1000000) {
      budgetValue = 1000000
    }
    setInfo((prevState) => ({
      ...prevState,
      budget: budgetValue,
    }))
  }

  const handleMemCountUpClick = (): void => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    if (info.totalCount! < 10) {
      setInfo((prevState) => ({
        ...prevState,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        totalCount: prevState.totalCount! + 1,
      }))
    }
  }

  const handleMemCountDownClick = (): void => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    if (info.totalCount! > 2) {
      setInfo((prevState) => ({
        ...prevState,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        totalCount: prevState.totalCount! - 1,
      }))
    }
  }

  const handleTechStackClick = (
    _filterName: FiltersKey,
    selectedStacks: number[]
  ): void => {
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

  const isBlank =
    info.meetingName?.trim() === '' ||
    info.contents?.trim() === '' ||
    info.locationAddress === '' ||
    Number.isNaN(info.budget) ||
    info.skillIds.length === 0 ||
    info.careerIds.length === 0

  const handleMeetingModifySubmit = (): void => {
    if (isBlank) {
      notify({
        type: 'warning',
        text: '빈 칸을 채워주세요',
      })
      return
    }
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
          <img src="/assets/meetingLeftArrow.svg" alt="go back" />
        </button>
        <h2>모임 수정하기</h2>
        <div />
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
              maxLength={34}
            />
          </InputBox>
          <span className="check">{info.meetingName?.length}/34</span>
        </InfoContainer>
        <InfoContainer>
          <InfoTitle>모임을 소개해 볼까요?</InfoTitle>
          <InputBox>
            <textarea
              id="contentInput"
              value={info.contents}
              onChange={handleContentChange}
              maxLength={300}
              placeholder="간단한 모임 소개를 작성해 주세요"
            />
          </InputBox>
          <span className="check">{info.contents?.length}/300</span>
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
                onKeyPress={(e) => {
                  const regex = /^[0-9\b]+$/
                  if (!regex.test(e.key)) {
                    e.preventDefault()
                  }
                }}
                onWheel={(e) => {
                  ;(e.target as HTMLInputElement).blur()
                }}
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
        {isBlank ? (
          <CommonButton size="large" disabled>
            수정하기
          </CommonButton>
        ) : (
          <CommonButton
            size="large"
            $type="primary"
            handleClick={handleMeetingModifySubmit}
          >
            수정하기
          </CommonButton>
        )}
      </DetailButtonContainer>
    </WholeContainer>
  )
}

export default MeetingModify
