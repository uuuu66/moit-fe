import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import styled from 'styled-components'
import { theme } from '@/constants/theme'

interface Props {
  meetingDate: Date | null | undefined
  handleDateChange: (date: Date) => void
}

function DateChoice({ meetingDate, handleDateChange }: Props): JSX.Element {
  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label style={{ display: 'flex', justifyContent: 'space-between' }}>
      <StDatePicker
        dateFormat="yyyy년 MM월 dd일"
        selected={meetingDate}
        shouldCloseOnSelect
        onChange={(date: Date) => {
          handleDateChange(date)
        }}
        minDate={new Date()}
        placeholderText="YY-MM-DD"
      />
      <img
        src="/assets/meetingCalendar.svg"
        alt="달력"
        style={{ width: '2rem' }}
      />
    </label>
  )
}

export default DateChoice

export const Box = styled.div`
  background-color: #e9e9e9;
  padding: 20px 10px;
  border-radius: 0.5rem;
  display: flex;
  justify-content: space-between;
`
export const StDatePicker = styled(DatePicker)`
  width: 100%;
  font-size: ${theme.fontSize.medium};
  &::placeholder {
    font-weight: ${theme.fontWeight.normal};
  }
`
