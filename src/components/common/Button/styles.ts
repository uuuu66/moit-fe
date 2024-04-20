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
  background-color: ${theme.color.primary100};
  `};
  border-radius: 40px;
  padding: 16px 0;

  &:disabled {
    ${({ theme }) => `
      background-color: ${theme.color.black20};
      color: ${theme.color.black40}; 
      cursor: not-allowed;
    `};
  }
`
export const BtnSpan = styled.span`
  font-size: ${({ theme }) => theme.fontSize.medium};
  font-weight: 600;
`
