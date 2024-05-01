import styled from 'styled-components'
import { theme } from '@/constants/theme'

export const MyMeetingsLayout = styled.div`
  padding: 22px 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: ${theme.color.pg1};
`

export const BookmarkedMeetingsLayout = styled(MyMeetingsLayout)`
  background: unset;
  padding-bottom: 0;
`

export const ButtonBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  .button-flex-box {
    display: flex;
    gap: 12px;

    button {
      padding: 6px 12px;
      border-radius: 20px;
      background: ${theme.color.black20};
      color: ${theme.color.black60};
      font-size: ${theme.fontSize.small};
      font-weight: ${theme.fontWeight.normal};
    }

    .tab-active-button {
      background: ${theme.color.primary100};
      color: ${theme.color.white};
    }
  }

  p {
    color: ${theme.color.black80};
    font-size: ${theme.fontSize.larger2};
    font-weight: ${theme.fontWeight.bold};
  }
`

export const ToggleButton = styled.button`
  width: 100%;
  height: 44px;
  background: ${theme.color.white};
  border: 1px solid ${theme.color.black20};
  border-radius: 8px;

  .toggle-button-text {
    color: ${theme.color.black60};
    font-size: ${theme.fontSize.small};
    font-weight: ${theme.fontWeight.normal};
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;

    img {
      width: 16px;
    }
  }
`
