import { type ButtonHTMLAttributes } from 'react'
import styled from 'styled-components'
import { theme } from '@/constants/theme'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  selectedBgColor?: string
  selectedColor?: string
  isSelected?: boolean
}

// 추후에 onClick이벤트 추가 (현재는 타입에러 때문에 빼두었음)
function TagFilter({
  children,
  selectedColor,
  selectedBgColor,
  isSelected = false,
  ...props
}: ButtonProps): JSX.Element {
  return (
    <TagContainer {...props} type="button">
      <SelectedBackground
        $selectedBgColor={selectedBgColor}
        $isSelected={isSelected}
      />
      <BtnSpan $isSelected={isSelected} $selectedColor={selectedColor}>
        {children}
      </BtnSpan>
    </TagContainer>
  )
}

const TagContainer = styled.button`
  position: relative;
  overflow: hidden;

  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px 12px;

  min-width: 56px;
  background-color: ${theme.color.bg2};
  border-radius: 12px;
`
const SelectedBackground = styled.div<{
  $selectedBgColor?: string

  $isSelected: boolean
}>`
  position: absolute;
  width: 100%;
  height: 100%;
  /* opacity: ${({ $isSelected }) => ($isSelected ? '1' : '0')}; */
  transform: ${({ $isSelected }) =>
    $isSelected ? 'translateY(0px)' : 'translateY(100%)'};
  will-change: transform;
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  background-color: ${({ $selectedBgColor }) => $selectedBgColor};
`
const BtnSpan = styled.span<{
  $isSelected: boolean
  $selectedColor?: string
}>`
  position: relative;
  z-index: 3;
  font-size: ${theme.fontSize.smaller};
  color: ${({ $isSelected, $selectedColor }) =>
    `${$isSelected ? $selectedColor : theme.color.black80}`};
  min-width: 32px;
  will-change: color;
  transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
`
export default TagFilter
