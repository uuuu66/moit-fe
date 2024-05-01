import styled from 'styled-components'
import { theme } from '@/constants/theme'

export const MeetingCardBox = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const MeetingCard = styled.div<{ $isProgress: boolean }>`
  padding: 20px;
  margin: 2px;
  border: 1px solid transparent;
  border-radius: 8px;
  background: ${theme.color.white};
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  cursor: pointer;
  gap: 10px;

  &:hover {
    border: 1px solid ${theme.color.primary100};
  }

  span {
    color: ${({ $isProgress }) =>
      $isProgress ? theme.color.primary100 : theme.color.black40};
    font-size: ${theme.fontSize.smaller};
    font-weight: ${theme.fontWeight.normal};
  }

  hr {
    width: 100%;
    margin: 0;
    border: none;
    border-bottom: 1px dotted ${theme.color.black40};
  }
`

export const BookmarkedCard = styled.div<{ $isProgress: boolean }>`
  border-radius: 16px;
  background: ${theme.color.white};
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.4);
  cursor: pointer;

  .bookmark-card-box-top {
    padding: 12px 20px;
    width: 100%;
    border-bottom: none;
    background: ${theme.color.primary100};
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 16px 16px 0 0;
  }

  .bookmark-card-box-bottom {
    padding: 16px 20px 20px;
    border: 1px solid transparent;
    border-top: none;
    border-radius: 0 0 16px 16px;
  }

  span {
    color: ${theme.color.white};
    font-size: ${theme.fontSize.smaller};
    font-weight: ${theme.fontWeight.normal};
  }

  &:hover {
    .bookmark-card-box-bottom {
      padding: 16px 20px 20px;
      border: 1px solid ${theme.color.primary100};
      border-top: none;
    }
  }
`

export const TitleBox = styled.div`
  min-height: 36px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  h2 {
    color: ${theme.color.black80};
    font-size: ${theme.fontSize.medium};
    font-weight: ${theme.fontWeight.bold};
  }
`

export const EmptyTextBox = styled.div`
  padding: 0 20px;
  width: 100%;
  height: 142px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 14px;

  img {
    width: 42px;
  }

  p {
    color: ${theme.color.black40};
    font-size: ${theme.fontSize.medium};
    font-weight: ${theme.fontWeight.normal};
  }
`
