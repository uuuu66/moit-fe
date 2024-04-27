import styled, { css } from 'styled-components'

interface ButtonProps {
  size?: 'small' | 'large'
  $type?: 'primary' | 'pink' | 'yellow' | 'green' | 'white' | 'gray'
}

export const Btn = styled.button<ButtonProps>`
  width: ${(props) => (props.size === 'small' ? '245px' : '350px')};
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.color.white};
  background-color: ${({ theme }) => theme.color.primary100};
  border-radius: 40px;
  padding: 16px 0;

  ${({ theme }) => css`
    &:hover {
      background-color: ${theme.color.hoverPrimary100};
      transition: 0.1s ease-in-out;
    }
  `}

  ${({ $type, theme }) => {
    switch ($type) {
      case 'primary':
        return css`
          background-color: ${theme.color.primary100};

          &:hover {
            background-color: ${theme.color.hoverPrimary100};
            transition: 0.1s ease-in-out;
          }
        `
      case 'pink':
        return css`
          background-color: ${theme.color.pink};

          &:hover {
            background-color: ${theme.color.hoverPink};
            transition: 0.1s ease-in-out;
          }
        `
      case 'white':
        return css`
          background-color: ${theme.color.white};
          color: ${theme.color.primary100};
          border: 1px solid ${theme.color.primary100};

          &:hover {
            background-color: ${theme.color.hoverWhite};
            transition: 0.1s ease-in-out;
          }
        `
      case 'yellow':
        return css`
          background-color: ${theme.color.yellow};
          color: ${theme.color.black80};
          width: 100%;

          &:hover {
            background-color: ${theme.color.hoverYellow};
            transition: 0.1s ease-in-out;
          }
        `
      case 'green':
        return css`
          background-color: ${theme.color.green};
          width: 100%;

          &:hover {
            background-color: ${theme.color.hoverGreen};
            transition: 0.1s ease-in-out;
          }
        `
      case 'gray':
        return css`
          background-color: ${theme.color.black20};
          width: 15rem;
          color: ${theme.color.black40};
          border-radius: 8px;
          &:hover {
            background-color: ${theme.color.hoverGray};
            transition: 0.1s ease-in-out;
          }
        `

      default:
        return ''
    }
  }}

  &:disabled {
    ${({ theme }) => css`
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
