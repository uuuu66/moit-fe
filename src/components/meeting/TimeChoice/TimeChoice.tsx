/* eslint-disable jsx-a11y/label-has-associated-control */
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import styled from 'styled-components'
import { useState } from 'react'
import { addMinutes, isToday, setHours, setMinutes } from 'date-fns'
import { ko } from 'date-fns/locale'
import { InputBox } from '../../../pages/Meeting/styles'
import { theme } from '@/constants/theme'

interface TimeChoiceProps {
  startTime: Date | null | undefined
  endTime: Date | null | undefined
  handleStartTimeChange: (time: Date | null) => void
  handleEndTimeChange: (time: Date | null) => void
  meetingDate: Date | null | undefined
}

function TimeChoice({
  startTime,
  endTime,
  handleStartTimeChange,
  handleEndTimeChange,
  meetingDate,
}: TimeChoiceProps): JSX.Element {
  const [isSelected, setIsSelected] = useState(false)
  const [isStartDatePickerOpen, setIsStartDatePickerOpen] = useState(false)
  const [isEndDatePickerOpen, setIsEndDatePickerOpen] = useState(false)

  const onSelect = (time: Date): void => {
    handleEndTimeChange(null)
    handleStartTimeChange(time)
    setIsSelected(true)
  }

  const currentDate = new Date()

  let minTime

  if (startTime != null && meetingDate != null && isToday(meetingDate)) {
    // 오늘이면 현재 시간 30분 후부터
    minTime = addMinutes(currentDate, 30)
  } else if (meetingDate != null && isToday(meetingDate)) {
    // 오늘이지만 시작 시간은 선택하지 않은 경우
    minTime = currentDate
  } else {
    // 오늘이 아닌 경우 00:00부터
    minTime = setHours(setMinutes(new Date(), 0), 0)
  }

  const minEndTime =
    startTime != null ? addMinutes(new Date(startTime), 30) : new Date()

  const maxTime = setHours(setMinutes(new Date(), 30), 23)

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        gap: '1rem',
        marginTop: '1rem',
        width: '100%',
      }}
    >
      <TimeBox>
        <div>
          <img src="/assets/meetingClock.svg" alt="clock" />
          <span>시작 시간</span>
        </div>
        <label style={{ display: 'flex', justifyContent: 'space-between' }}>
          <StDatePicker
            locale={ko}
            selected={startTime}
            shouldCloseOnSelect
            showTimeSelect
            showTimeSelectOnly
            timeCaption="시작 시간"
            dateFormat="H시 mm분"
            onChange={onSelect}
            placeholderText="00시 00분"
            onClickOutside={() => {
              setIsStartDatePickerOpen(false)
            }}
            onFocus={() => {
              setIsStartDatePickerOpen(true)
            }}
            open={isStartDatePickerOpen}
            minTime={minTime}
            maxTime={maxTime}
          />
          <img
            src="/assets/meetingDownArrow.svg"
            alt="downArrow"
            className={`arrow ${isStartDatePickerOpen ? 'open' : ''}`}
          />
        </label>
      </TimeBox>
      <TimeBox>
        <div>
          <img src="/assets/meetingClock.svg" alt="clock" />
          <span>종료 시간</span>
        </div>
        <label style={{ display: 'flex', justifyContent: 'space-between' }}>
          <StDatePicker
            locale={ko}
            selected={endTime}
            shouldCloseOnSelect
            onChange={handleEndTimeChange}
            showTimeSelect
            showTimeSelectOnly
            timeCaption="종료 시간"
            dateFormat="HH시 mm분"
            placeholderText="00시 00분"
            disabled={!isSelected}
            minTime={minEndTime}
            maxTime={maxTime}
            onClickOutside={() => {
              setIsEndDatePickerOpen(false)
            }}
            onFocus={() => {
              setIsEndDatePickerOpen(true)
            }}
            open={isEndDatePickerOpen}
          />
          <img
            src="/assets/meetingDownArrow.svg"
            alt="downArrow"
            className={`arrow ${isEndDatePickerOpen ? 'open' : ''}`}
          />
        </label>
        {/* <span>시작 시간을 선택해 주세요</span> */}
      </TimeBox>
    </div>
  )
}

export default TimeChoice

export const TimeBox = styled(InputBox)`
  width: 48%;
  div {
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }
  span {
    font-size: 12px;
    color: gray;
  }
  label {
    color: black;
    position: relative;
    /* z-index: 1; */
  }
  .arrow {
    cursor: pointer;
    transition: transform 0.3s ease-in-out;
  }
  .arrow.open {
    transform: rotate(180deg);
  }
`

export const StDatePicker = styled(DatePicker)`
  width: 100%;
  &::placeholder {
    font-size: 1.6rem;
  }
  /* &:disabled {
    background-color: ${theme.color.black40};
  } */
`
