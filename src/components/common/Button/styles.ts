import styled from 'styled-components'

interface ButtonProps {
  size?: 'small' | 'large'
}

export const Btn = styled.button<ButtonProps>`
  width: ${(props) => (props.size === 'small' ? '15.3125rem' : '21.875rem')};
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #000000;
  color: #ffffff;
  border-radius: 5rem;
  padding: 1rem 0;
`
export const BtnSpan = styled.span`
  font-size: 1rem;
  font-weight: 600;
`
