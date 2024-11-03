import { type PropsWithChildren } from 'react'
import styled from 'styled-components'
import { theme } from '@/constants/theme'

interface Props extends PropsWithChildren {
  bgColor?: string
  color?: string
}
export default function Tag(props: Props): JSX.Element {
  const { bgColor, color, children } = props
  return (
    <TagContainer $bgColor={bgColor} $color={color}>
      {children}
    </TagContainer>
  )
}

const TagContainer = styled.div<{ $bgColor?: string; $color?: string }>`
  background-color: ${({ $bgColor }) => $bgColor ?? theme.color.bg4};
  color: ${({ $color }) => $color ?? theme.color.white};
  border-radius: 12px;
  padding: 3px 8px;
`
