import styled from 'styled-components'

interface ButtonProps {
  size?: 'small' | 'large'
}

export const Btn = styled.button<ButtonProps>`
  width: ${(props) => (props.size === 'small' ? '245px' : '350px')};
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ theme }) => `
  color: ${theme.color.white};
  background-color: ${theme.color.black100};
  `};
  border-radius: 40px;
  padding: 16px 0;
`
export const BtnSpan = styled.span`
  font-size: ${({ theme }) => theme.fontSize.medium};
  font-weight: 600;
`
