import styled from 'styled-components'
import { theme } from '@/constants/theme'

const ScrollTopButtonLayout = styled.button`
  width: 40px;
  height: 40px;
  padding: 20px;
  border-radius: 25px;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.4);
  background: ${theme.color.white};
  display: flex;
  align-items: center;
  justify-content: center;
`

export default ScrollTopButtonLayout
