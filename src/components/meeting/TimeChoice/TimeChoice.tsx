import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import styled from 'styled-components'
import { InputBox } from '../../../pages/Meeting/styles'

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
  // const [startTime, setStartTime] = useState(null)
  // const [endTime, setEndTime] = useState(null)
  // const [isSelected, setIsSelected] = useState(false)

  // const onSelectStartTime = (time) => {
  //   console.log('time', time)
  //   setStartTime(time)
  //   // handleStartTimeChange(time)
  //   setIsSelected(true)
  //   setEndTime(null)
  // }

  // const onSelectEndTime = (time) => {
  //   setEndTime(time)
  //   // handleEndTimeChange(time)
  // }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        gap: '1rem',
        marginTop: '1rem',
      }}
    >
      <TimeBox>
        <div>
          <img src="/assets/meetingClock.svg" alt="clock" />
          <span>시작 시간</span>
        </div>
        <label
          htmlFor="datepick1"
          style={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <input type="text" id="datepick1" style={{ display: 'none' }} />
          <StDatePicker
            selected={startTime}
            shouldCloseOnSelect
            showTimeSelect
            showTimeSelectOnly
            timeCaption="시작 시간"
            dateFormat="h시 mm분"
            onChange={handleStartTimeChange}
            placeholderText="00시 00분"
          />
          <img src="/assets/meetingDownArrow.svg" alt="downArrow" />
        </label>
      </TimeBox>
      <TimeBox>
        <div>
          <img src="/assets/meetingClock.svg" alt="clock" />
          <span>종료 시간</span>
        </div>
        <label
          htmlFor="datepick1"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <input type="text" id="datepick1" style={{ display: 'none' }} />
          <StDatePicker
            selected={endTime}
            shouldCloseOnSelect
            onChange={handleEndTimeChange}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={30}
            timeCaption="종료 시간"
            dateFormat="h시 mm분"
            placeholderText="00시 00분"
          />
          <img src="/assets/meetingDownArrow.svg" alt="downArrow" />
        </label>
      </TimeBox>
    </div>
  )
}

export default TimeChoice

export const TimeBox = styled(InputBox)`
  width: 100%;
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
  }
`

export const StDatePicker = styled(DatePicker)`
  /* display: flex;
  flex-direction: column; */
  &::placeholder {
    font-size: 1.6rem;
  }
`
