import styled from 'styled-components'

export const TabBarContainer = styled.footer`
  width: 24.375rem;
  background-color: #d9d9d9;
  height: 4.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 3rem;
  position: fixed;
  bottom: 0;
  left: 0;
`
export const NavBtn = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.375rem;

  div {
    width: 1.5rem;
    height: 1.5rem;
    background-color: #e9e9e9;
    border-radius: 50%;
  }
  span {
    font-size: 0.875rem;
  }
`
