import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import styled from 'styled-components'
import { memo, useCallback, useMemo } from 'react'
import { addMonths } from '@/util/dateFns'
import { theme } from '@/constants/theme'
import useRegisterContext from '@/hooks/useRegisterContext'

function DateChoice(): JSX.Element {
  const { info, setInfo } = useRegisterContext()

  const handleDateChange = useCallback(
    (date: Date): void => {
      setInfo((prevState) => ({
        ...prevState,
        meetingDate: date,
        meetingStartTime: null,
        meetingEndTime: null,
      }))
    },
    [setInfo]
  )

  const minDate = useMemo(() => new Date(), [])
  const maxDate = useMemo(() => addMonths(new Date(), 2), [])

  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label style={{ display: 'flex', justifyContent: 'space-between' }}>
      <StDatePicker
        dateFormat="yyyy년 MM월 dd일"
        selected={info.meetingDate}
        shouldCloseOnSelect
        onChange={handleDateChange}
        minDate={minDate}
        maxDate={maxDate}
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

export default memo(DateChoice)

export const StDatePicker = styled(DatePicker)`
  width: 100%;
  font-size: ${theme.fontSize.medium};
  &::placeholder {
    font-weight: ${theme.fontWeight.normal};
  }
`
