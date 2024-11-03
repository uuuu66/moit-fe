import styled from 'styled-components'
import { theme } from '@/constants/theme'

export const HeaderContainer = styled.header<{ $isShow: boolean }>`
  width: 100%;

  background: ${theme.color.white};
  display: ${({ $isShow }) => ($isShow ? 'flex' : 'none')};
  padding: 16px;
  flex-direction: column;
  gap: 10px;
  border-bottom: 1px solid ${theme.color.bg1};
`

export const ButtonBox = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`
