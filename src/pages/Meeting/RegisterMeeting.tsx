import { useNavigate } from 'react-router-dom'
import React, { useState } from 'react'
import dayjs from 'dayjs'
import { useMutation } from '@tanstack/react-query'
import CommonButton from '@/components/common/Button/CommonButton'
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
} from './styles'

import DateChoice from '@/components/meeting/DateChoice/DateChoice'
import TimeChoice from '@/components/meeting/TimeChoice/TimeChoice'
import FindLocation from '@/components/meeting/FindLocation/FindLocation'
import { careerData, type Career } from '@/constants/careerData'
import { postMeetingData } from '@/apis/meeting'
import { DetailButtonContainer } from '../MeetingDetail/styles'
import MeetingTechStack from '@/components/filter/TechStack/MeetingTechStack'
import { notify } from '@/components/Toast'
import AlertModal from '@/components/modals/AlertModal'

export interface Info {
  meetingName: string
  meetingDate: Date | null | undefined
  meetingStartTime: Date | null | undefined
  meetingEndTime: Date | null | undefined
  budget: number
  contents: string
  totalCount: number
  locationAddress: string | undefined
  locationLat: number | undefined
  locationLng: number | undefined
  regionFirstName: string | undefined
  regionSecondName: string | undefined
  skillIds: number[]
  careerIds: number[]
}

function RegisterMeeting(): JSX.Element {
  const navi = useNavigate()
  const [info, setInfo] = useState<Info>({
    meetingName: '',
    meetingDate: null,
    meetingStartTime: null,
    meetingEndTime: null,
    budget: 0,
    contents: '',
    totalCount: 2,
    locationAddress: '',
    locationLat: 0,
    locationLng: 0,
    regionFirstName: '',
    regionSecondName: '',
    skillIds: [],
    careerIds: [],
  })
  const [onRegisterModal, setOnRegisterModal] = useState(false)
  const dateFormat = dayjs(info.meetingDate).format('YYYY-MM-DD')

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

  const handleDateChange = (date: Date): void => {
    setInfo((prevState) => ({
      ...prevState,
      meetingDate: date,
      meetingStartTime: null,
      meetingEndTime: null,
    }))
  }

  const handleStartTimeChange = (time: Date | null): void => {
    setInfo((prevState) => ({
      ...prevState,
      meetingStartTime: time,
    }))
  }

  const handleEndTimeChange = (time: Date | null): void => {
    setInfo((prevState) => ({
      ...prevState,
      meetingEndTime: time,
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
    if (info.totalCount < 10) {
      setInfo((prevState) => ({
        ...prevState,
        totalCount: prevState.totalCount + 1,
      }))
    }
  }

  const handleMemCountDownClick = (): void => {
    if (info.totalCount > 2) {
      setInfo((prevState) => ({
        ...prevState,
        totalCount: prevState.totalCount - 1,
      }))
    }
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

  const postMutation = useMutation<any, unknown, Info>({
    mutationFn: async (newMeetingData: Info) => {
      await postMeetingData(newMeetingData)
    },
    onSuccess: () => {
      notify({
        type: 'default',
        text: '모임 등록이 완료되었습니다.',
      })
      navi('/')
    },
    onError: (error) => {
      notify({
        type: 'error',
        text: '등록에 실패하였습니다',
      })
      console.log('error', error)
    },
  })

  const isBlank =
    info.meetingName.trim() === '' ||
    info.contents.trim() === '' ||
    info.meetingDate === null ||
    info.meetingStartTime === null ||
    info.meetingEndTime === null ||
    info.locationAddress === '' ||
    Number.isNaN(info.budget) ||
    info.skillIds.length === 0 ||
    info.careerIds.length === 0

  const handleMeetingSubmit = (): void => {
    if (isBlank) {
      notify({
        type: 'warning',
        text: '빈 칸을 채워주세요',
      })
      return
    }
    const newMeetingData = {
      meetingName: info.meetingName,
      meetingDate: dateFormat as unknown as Date,
      meetingStartTime: info.meetingStartTime,
      meetingEndTime: info.meetingEndTime,
      budget: info.budget,
      contents: info.contents,
      totalCount: info.totalCount,
      locationAddress: info.locationAddress,
      locationLat: info.locationLat,
      locationLng: info.locationLng,
      regionFirstName: info.regionFirstName,
      regionSecondName: info.regionSecondName,
      skillIds: info.skillIds,
      careerIds: info.careerIds,
    }
    postMutation.mutate(newMeetingData)
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
        <h2>모임 생성하기</h2>
        <div />
      </InfoHeader>
      <RegisterTitle>
        <h1>모임을 소개해 주세요!</h1>
        <span>흩어져 있던 개발자들을 불러 봐요</span>
      </RegisterTitle>
      <div className="info">
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
          <span className="check">{info.meetingName.length}/34</span>
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
          <span className="check">{info.contents.length}/300</span>
        </InfoContainer>
        {/* 날짜, 시간 선택 */}
        <InfoContainer>
          <InfoTitle>언제 만날까요?</InfoTitle>
          <InputBox>
            <span className="meetingDate">모임 날짜</span>
            <DateChoice
              meetingDate={info.meetingDate}
              handleDateChange={handleDateChange}
            />
          </InputBox>
          <TimeChoice
            startTime={info.meetingStartTime}
            endTime={info.meetingEndTime}
            handleStartTimeChange={handleStartTimeChange}
            handleEndTimeChange={handleEndTimeChange}
            meetingDate={info.meetingDate}
          />
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
            생성하기
          </CommonButton>
        ) : (
          <CommonButton
            size="large"
            $type="primary"
            handleClick={() => {
              setOnRegisterModal(!onRegisterModal)
            }}
          >
            생성하기
          </CommonButton>
        )}
        {onRegisterModal && (
          <AlertModal
            message="등록"
            onClose={() => {
              setOnRegisterModal(!onRegisterModal)
            }}
            handleClick={handleMeetingSubmit}
            buttonName="등록하기"
          />
        )}
      </DetailButtonContainer>
    </WholeContainer>
  )
}

export default RegisterMeeting
