import styled from 'styled-components'

export const MeetingCardBox = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
`

export const MeetingCard = styled.div<{ $isProgress: boolean }>`
  padding: 20px;
  margin: 2px;
  border-radius: 8px;
  background: ${({ theme }) => theme.color.white};
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  cursor: pointer;
  gap: 10px;

  &:hover {
    border: ${({ theme }) => `1px solid ${theme.color.primary100}`};
  }

  span {
    ${({ theme, $isProgress }) => `
    color: ${$isProgress ? theme.color.primary100 : theme.color.black40};
    font-size: ${theme.fontSize.smaller};
    font-weight: ${theme.fontWeight.normal};
    `}
  }

  hr {
    width: 100%;
    margin: 0;
    border: none;
    border-bottom: ${({ theme }) => `1px dotted ${theme.color.black40}`};
  }
`

export const TitleBox = styled.div`
  min-height: 36px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  h2 {
    ${({ theme }) => `
    color: ${theme.color.black80};
    font-size: ${theme.fontSize.medium};
    font-weight: ${theme.fontWeight.bold};
    `}
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
    ${({ theme }) => `
    color: ${theme.color.black40};
    font-size: ${theme.fontSize.medium};
    font-weight: ${theme.fontWeight.normal};
    `}
  }
`
