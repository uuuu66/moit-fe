import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import styled from 'styled-components'
import { useState } from 'react'
// import { getHours, getMinutes, isAfter, setHours, setMinutes } from 'date-fns'
import { InputBox } from '../../../pages/Meeting/styles'
import { theme } from '@/constants/theme'

interface TimeChoiceProps {
  startTime: Date | null | undefined
  endTime: Date | null | undefined
  handleStartTimeChange: (time: Date | null) => void
  handleEndTimeChange: (time: Date | null) => void
}

function TimeChoice({
  startTime,
  endTime,
  handleStartTimeChange,
  handleEndTimeChange,
}: TimeChoiceProps): JSX.Element {
  const [isSelected, setIsSelected] = useState(false)

  const onSelect = (time: Date): void => {
    handleStartTimeChange(time)
    setIsSelected(true)
  }

  // const maxEndTime = setHours(startTime, getHours(startTime) + 6)

  // // Check if the maxEndTime exceeds the current day
  // const currentHour = getHours(new Date())
  // const isMaxEndTimeAfterCurrentDay = isAfter(
  //   maxEndTime,
  //   setHours(new Date(), currentHour)
  // )

  // // Adjust max time accordingly
  // const maxTime = isMaxEndTimeAfterCurrentDay
  //   ? setHours(new Date(), currentHour)
  //   : maxEndTime

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
        <label htmlFor="datepick1">
          <input type="text" id="datepick1" style={{ display: 'none' }} />
          <StDatePicker
            selected={startTime}
            shouldCloseOnSelect
            showTimeSelect
            showTimeSelectOnly
            timeCaption="시작 시간"
            dateFormat="h시 mm분"
            onChange={onSelect}
            placeholderText="00시 00분"
          />
          <img
            src="/assets/meetingDownArrow.svg"
            alt="downArrow"
            className="arrow"
          />
        </label>
      </TimeBox>
      <TimeBox>
        <div>
          <img src="/assets/meetingClock.svg" alt="clock" />
          <span>종료 시간</span>
        </div>
        <label htmlFor="datepick1">
          <input type="text" id="datepick1" style={{ display: 'none' }} />
          <StDatePicker
            selected={endTime}
            shouldCloseOnSelect
            onChange={handleEndTimeChange}
            showTimeSelect
            showTimeSelectOnly
            timeCaption="종료 시간"
            dateFormat="h시 mm분"
            placeholderText="00시 00분"
            disabled={!isSelected}
          />
          <img
            src="/assets/meetingDownArrow.svg"
            alt="downArrow"
            className="arrow"
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
    /* background-color: wheat; */
    position: absolute;
    top: 0;
    right: 0;
  }
`

export const StDatePicker = styled(DatePicker)`
  &::placeholder {
    font-size: 1.6rem;
  }
  /* &:disabled {
    background-color: ${theme.color.black40};
  } */
`
