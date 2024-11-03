/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import styled from 'styled-components'

const FlexDiv = styled.div<{
  justifyContent?: string
  alignItem?: string
  gap?: number
  flexDirection?: string
}>`
  display: flex;
  justify-content: ${({ justifyContent }) => justifyContent ?? 'flex-start'};
  align-items: ${({ alignItem }) => alignItem ?? 'center'};
  gap: ${({ gap }) => `${!gap && gap !== 0 ? 0 : gap}px`};
  flex-direction: ${({ flexDirection }) => flexDirection ?? 'row'};
`
export default FlexDiv
