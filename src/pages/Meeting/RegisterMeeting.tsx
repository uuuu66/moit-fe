import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import dayjs from 'dayjs'
import CommonButton from '@/components/common/Button/CommonButton'
import {
  AccountContainer,
  CareerContainer,
  InfoContainer,
  InfoHeader,
  InfoTitle,
  InputBox,
  MemberCount,
  MemberCountBtn,
  PriceBox,
  RegisterTitle,
  WholeContainer,
} from './styles'
import TechStack from '@/components/common/TechStack/TechStack'
import DateChoice from './DateChoice'
import TimeChoice from './TimeChoice'
import FindLocation from './FindLocation'
import { careerData } from '@/constants/careerData'

function RegisterMeeting(): JSX.Element {
  const navi = useNavigate()
  const [info, setInfo] = useState({
    meetingName: '',
    meetingDate: '',
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
  const datee = dayjs(info.meetingDate).format('YYYY-MM-DD')
  const starttime = dayjs(info.meetingStartTime).format()
  console.log('starttime', starttime)
  console.log('datee', datee)
  console.log('info', info)

  const handleNameChange = (e) => {
    setInfo((prevState) => ({
      ...prevState,
      meetingName: e.target.value,
    }))
  }
  const handleContentChange = (e) => {
    setInfo((prevState) => ({
      ...prevState,
      contents: e.target.value,
    }))
  }

  const handleDateChange = (date) => {
    setInfo((prevState) => ({
      ...prevState,
      meetingDate: date,
    }))
  }

  const handleStartTimeChange = (time) => {
    console.log('time111111', time)
    setInfo((prevState) => ({
      ...prevState,
      meetingStartTime: time,
    }))
  }

  const handleEndTimeChange = (time) => {
    setInfo((prevState) => ({
      ...prevState,
      meetingEndTime: time,
    }))
  }

  const handleBudgetChange = (e) => {
    setInfo((prevState) => ({
      ...prevState,
      budget: parseInt(e.target.value),
    }))
  }

  const handleMemCountUpClick = () => {
    setInfo((prevState) => ({
      ...prevState,
      totalCount: prevState.totalCount + 1,
    }))
  }

  const handleMemCountDownClick = () => {
    setInfo((prevState) => ({
      ...prevState,
      totalCount: prevState.totalCount - 1,
    }))
  }

  const handleSkillIdsChange = (selectedSkills) => {
    setInfo((prevState) => ({
      ...prevState,
      skillIds: selectedSkills,
    }))
  }

  const handleCareerClick = (careerId) => {
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
        <h1>
          <span>모임을</span>
          <span>소개해 주세요!</span>
        </h1>
        <span>흩어져 있던 개발자들을 불러 봐요</span>
      </RegisterTitle>
      <div>
        <InfoContainer>
          <InfoTitle>모임 이름을 정해 주세요</InfoTitle>
          <InputBox>
            <label htmlFor="nameInput">한 줄로 작성해 주세요</label>
            <input
              type="text"
              id="nameInput"
              placeholder="ex) 같이 리액트 공부해요"
              value={info.meetingName}
              onChange={handleNameChange}
            />
          </InputBox>
        </InfoContainer>
        <InfoContainer>
          <InfoTitle>모임 내용을 작성해 주세요</InfoTitle>
          <InputBox>
            <label htmlFor="contentInput">설명해 주세요</label>
            <input
              type="text"
              id="contentInput"
              placeholder="ex) 뭐할래?"
              value={info.contents}
              onChange={handleContentChange}
            />
          </InputBox>
        </InfoContainer>
        {/* 날짜, 시간 선택 */}
        <InfoContainer>
          <InfoTitle>언제 만날까요?</InfoTitle>
          <InputBox>
            <span>모임 날짜</span>
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
          {/* <input
            className="where"
            type="text"
            placeholder="모임 장소 이름이나 주소를 검색해 보세요"
          /> */}
        </InfoContainer>
        <InfoContainer>
          <InfoTitle>몇 명이서 모일까요?</InfoTitle>
          <span>본인을 포함한 최소 인원을 설정해 주세요</span>
          <MemberCount>
            <MemberCountBtn type="button" onClick={handleMemCountDownClick}>
              -
            </MemberCountBtn>
            <div>{info.totalCount}</div>
            <MemberCountBtn type="button" onClick={handleMemCountUpClick}>
              +
            </MemberCountBtn>
          </MemberCount>
        </InfoContainer>
        <AccountContainer>
          <div>
            <h3>참가비가 필요한가요?</h3>
            <span>부담스럽지 않은 금액이 좋아요</span>
          </div>
          <PriceBox>
            <input
              type="number"
              id="price"
              placeholder="ex) 3,000"
              value={info.budget}
              onChange={handleBudgetChange}
            />
            <label htmlFor="price">원</label>
          </PriceBox>
        </AccountContainer>
        <InfoContainer>
          <InfoTitle>모임에 필요한 기술 스택을 알려 주세요</InfoTitle>
          <TechStack />
        </InfoContainer>
        <InfoContainer>
          <InfoTitle>경력을 알려 주세요</InfoTitle>
          <CareerContainer>
            {careerData.map((career) => (
              <button
                type="button"
                key={career.careerId}
                onClick={() => {
                  handleCareerClick(career.careerId)
                }}
              >
                {career.careerName}
              </button>
            ))}
          </CareerContainer>
        </InfoContainer>
      </div>
      {/* 타입에 맞게 잘 가져와지나 확인 */}
      <div>
        <div>MeetingName : {info.meetingName}</div>
        <div>Contents : {info.contents}</div>
        <div>MeetingDate : {datee || ''}</div>
        <div>
          MeetingStartTime :
          {info.meetingStartTime ? info.meetingStartTime.toISOString() : ''}
        </div>
        <div>
          MeetingEndTime :{' '}
          {info.meetingEndTime ? info.meetingEndTime.toISOString() : ''}
        </div>
        <div>MeetingBudget : {info.budget}</div>
        <div>TotalCount : {info.totalCount}</div>
        <div>locationAddress : {info.locationAddress}</div>
        <div>locationLat : {info.locationLat}</div>
        <div>locationLng : {info.locationLng}</div>
        <div>regionFirstName : {info.regionFirstName}</div>
        <div>regionSecondName : {info.regionSecondName}</div>
        <div>
          MeetingSkillIds :{' '}
          {info.careerIds.map((i) => (
            <div>
              <span>{i}</span>
            </div>
          ))}
        </div>
      </div>
      <CommonButton size="large">생성하기</CommonButton>
    </WholeContainer>
  )
}

export default RegisterMeeting
