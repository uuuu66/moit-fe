import { useNavigate } from 'react-router-dom'
import { useMemo, useState } from 'react'
import dayjs from 'dayjs'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import CommonButton from '@/components/common/Button/CommonButton'
import {
  InfoContainer,
  InfoHeader,
  InfoTitle,
  InputBox,
  RegisterTitle,
  WholeContainer,
} from './styles'

import DateChoice from '@/components/meeting/DateChoice/DateChoice'
import TimeChoice from '@/components/meeting/TimeChoice/TimeChoice'
import FindLocation from '@/components/meeting/FindLocation/FindLocation'
import { postMeetingData } from '@/apis/meeting'
import { DetailButtonContainer } from '../MeetingDetail/styles'
import MeetingTechStack from '@/components/filter/TechStack/MeetingTechStack'
import { notify } from '@/components/Toast'
import AlertModal from '@/components/modals/AlertModal'
import { meetingKeys, userKeys } from '@/constants/queryKeys'
import { type FiltersKey } from '@/type/filter'
import { RegisterContext } from '@/context/RegisterContext'
import MeetingName from '@/components/meeting/meetingForm/MeetingName'
import MeetingContents from '@/components/meeting/meetingForm/MeetingContents'
import MeetingRecriutNum from '@/components/meeting/meetingForm/MeetingRecriutNum'
import MeetingBudget from '@/components/meeting/meetingForm/MeetingBudget'
import MeetingCareer from '@/components/meeting/meetingForm/MeetingCareer'

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
  const dateFormat = useMemo(
    () => dayjs(info.meetingDate).format('YYYY-MM-DD'),
    [info.meetingDate]
  )

  const handleTechStackClick = (
    _filterName: FiltersKey,
    selectedStacks: number[]
  ): void => {
    setInfo((prevState) => ({
      ...prevState,
      skillIds: selectedStacks,
    }))
  }

  const queryClient = useQueryClient()
  const postMutation = useMutation<any, unknown, Info>({
    mutationFn: async (newMeetingData: Info) => {
      await postMeetingData(newMeetingData)
    },
    onSuccess: () => {
      // TODO 등록 : 미팅리스트, 프로필
      void queryClient.invalidateQueries({ queryKey: meetingKeys.lists })
      void queryClient.invalidateQueries({ queryKey: userKeys.profile })
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

  const isBlank = useMemo(
    () =>
      info.meetingName.trim() === '' ||
      info.contents.trim() === '' ||
      info.meetingDate === null ||
      info.meetingStartTime === null ||
      info.meetingEndTime === null ||
      info.locationAddress === '' ||
      Number.isNaN(info.budget) ||
      info.skillIds.length === 0 ||
      info.careerIds.length === 0,
    [info]
  )

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

  const memoizedContextValue = useMemo(
    () => ({ info, setInfo }),
    [info, setInfo]
  )

  return (
    <RegisterContext.Provider value={memoizedContextValue}>
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
            <MeetingName />
          </InfoContainer>
          <InfoContainer>
            <InfoTitle>모임을 소개해 볼까요?</InfoTitle>
            <MeetingContents />
          </InfoContainer>
          {/* 날짜, 시간 선택 */}
          <InfoContainer>
            <InfoTitle>언제 만날까요?</InfoTitle>
            <InputBox>
              <span className="meetingDate">모임 날짜</span>
              <DateChoice />
            </InputBox>
            <TimeChoice />
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
            <MeetingRecriutNum />
          </InfoContainer>
          <InfoContainer>
            <InfoTitle>참가비가 필요한가요?</InfoTitle>
            <span>부담스럽지 않은 금액이 좋아요</span>
            <MeetingBudget />
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
            <MeetingCareer />
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
    </RegisterContext.Provider>
  )
}

export default RegisterMeeting
