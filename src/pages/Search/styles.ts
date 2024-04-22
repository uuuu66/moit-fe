import styled from 'styled-components'

export const SearchLayout = styled.div`
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.color.white};
  display: flex;
  flex-direction: column;
`

export const SearchBox = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  .input-flex-box {
    display: flex;
    gap: 8px;
  }
`

export const InputBox = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.color.bg2};
  display: flex;
  padding: 14px 20px;
  border-radius: 8px;
  gap: 8px;

  input {
    width: 100%;
    font-size: ${({ theme }) => theme.fontSize.small};
  }
`

export const ToggleBox = styled.div`
  border-radius: 8px;
  background: ${({ theme }) => theme.color.pg1};
  overflow: hidden;

  h1 {
    ${({ theme }) => `
    color: ${theme.color.black80};
    font-size: ${theme.fontSize.larger};
    font-weight: ${theme.fontWeight.bold};
    `}
  }

  img {
    width: 18px;
    margin-right: 8px;
  }
`

export const ToggleButton = styled.button<{ $isPointer: boolean }>`
  width: 100%;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: ${({ $isPointer }) => ($isPointer ? 'pointer' : 'default')};
`

export const RecentTagBox = styled.div`
  padding: 16px 20px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  height: 116px;
  overflow: auto;

  &::-webkit-scrollbar {
    display: none;
  }

  button {
    height: 32px;
    padding: 6px 12px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    white-space: nowrap;
    ${({ theme }) => `
    background: ${theme.color.primary20};
    color: ${theme.color.primary100};
    font-size: ${theme.fontSize.small};
    font-weight: ${theme.fontWeight.normal};
    `}
  }
`

export const EmptyTextBox = styled.div`
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

export const CardBox = styled.div`
  height: 100%;
  padding: 20px;
  background: ${({ theme }) => theme.color.pg1};
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`
