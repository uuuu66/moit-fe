import styled from 'styled-components'
import { theme } from '@/constants/theme'

export const DetailHeaderContainer = styled.header`
  width: 100%;
  background-color: ${theme.color.pg1};
  height: 5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;

  div {
    display: flex;
    align-items: center;
  }
`

export const ChatUsers = styled.div<{ $isActive: boolean }>`
  display: ${(props) => (props.$isActive ? 'flex' : 'none !important')};
  align-items: center;
  margin-left: 0.8rem;

  h4 {
    font-size: ${theme.fontSize.medium};
    font-weight: ${theme.fontWeight.normal};
    color: ${theme.color.black60};
  }

  span {
    font-size: ${theme.fontSize.medium};
    color: ${theme.color.black40};
  }
`

export const ToggleContainer = styled.div`
  background-color: ${theme.color.primary100};
  border-radius: 2rem;
  height: 3.8rem;
  width: 15rem;
  padding: 0.3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const ToggleButton = styled.button<{ $isActive: boolean }>`
  flex: 1;
  padding: 0.6rem 1rem;
  border-radius: 2rem;
  font-size: ${theme.fontSize.medium};
  font-weight: ${theme.fontWeight.light};
  background-color: ${(props) => props.$isActive && 'white'};
  color: ${(props) =>
    props.$isActive ? theme.color.primary100 : theme.color.white};
`
export const Icon = styled.img`
  cursor: pointer;
  width: 2rem;
  height: 2rem;

  &.users {
    width: 2.4rem;
    height: 2.4rem;
  }

  &.menu {
    margin-left: 1.2rem;
  }
`
