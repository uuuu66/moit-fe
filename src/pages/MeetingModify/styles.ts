import styled from 'styled-components'
import { InputBox } from '../Meeting/styles'
import { theme } from '@/constants/theme'

export const DisabledDateBox = styled(InputBox)`
  background-color: ${theme.color.bg2};
  color: ${theme.color.black80};

  .date {
    display: flex;
    align-items: center;
    justify-content: space-between;

    span {
      font-size: ${theme.fontSize.medium};
      font-weight: ${theme.fontWeight.bold};
    }
  }
`

export const DisabledTimeBoxContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
`

export const DisabledTimeBox = styled(DisabledDateBox)`
  flex: 1;
  background-color: ${theme.color.bg2};

  .dateTitle {
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }
  .dateTime {
    display: flex;
    align-items: center;
    justify-content: space-between;

    span {
      font-size: ${theme.fontSize.medium};
      font-weight: ${theme.fontWeight.bold};
    }
  }
`
