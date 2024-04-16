import styled from 'styled-components'

export const HeaderContainer = styled.header<{ $isShow: boolean }>`
  height: 56px;
  width: 100%;
  background: ${({ theme }) => theme.color.white};
  display: ${({ $isShow }) => ($isShow ? 'flex' : 'none')};
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
`
export const ButtonBox = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`
