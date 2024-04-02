import { type ReactNode } from 'react'
import { Btn, BtnSpan } from './styles'

interface ButtonProps {
  children: ReactNode
  size: 'small' | 'large'
}

// 추후에 onClick이벤트 추가 (현재는 타입에러 때문에 빼두었음)
function CommonButton({ children, size }: ButtonProps): JSX.Element {
  return (
    <Btn type="submit" size={size}>
      <BtnSpan>{children}</BtnSpan>
    </Btn>
  )
}

export default CommonButton
