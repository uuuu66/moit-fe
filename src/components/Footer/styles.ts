import styled from 'styled-components'

export const FooterLayout = styled.div`
  width: 100%;
  height: 66px;
  z-index: 3;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-around;
  ${({ theme }) => `
  border-top: 1px solid ${theme.color.black20};
  background: ${theme.color.white};
  `}
`

export const ButtonBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`
