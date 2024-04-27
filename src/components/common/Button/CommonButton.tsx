import { type ReactNode } from 'react'
import { Btn, BtnSpan } from './styles'

interface ButtonProps {
  children: ReactNode
  size: 'small' | 'large'
  handleClick?: () => void
  style?: React.CSSProperties
  $type?: 'primary' | 'pink' | 'yellow' | 'green' | 'white' | 'gray'
  disabled?: boolean
}

// 추후에 onClick이벤트 추가 (현재는 타입에러 때문에 빼두었음)
function CommonButton({
  children,
  size,
  handleClick,
  style,
  disabled = false,
  $type,
}: ButtonProps): JSX.Element {
  return (
    <Btn
      type="submit"
      size={size}
      onClick={handleClick}
      style={style}
      disabled={disabled}
      $type={$type}
    >
      <BtnSpan>{children}</BtnSpan>
    </Btn>
  )
}

CommonButton.defaultProps = {
  handleClick: () => {},
  style: undefined,
  $type: undefined,
  disabled: false,
}

export default CommonButton
