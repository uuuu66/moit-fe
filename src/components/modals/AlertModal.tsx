import styled from 'styled-components'
import ModalPortal from './ModalPortal'
import { Background } from '../filter/FilterFrame/styles'
import CommonButton from '../common/Button/CommonButton'
import { theme } from '@/constants/theme'

interface AlertModalProps {
  onClose: () => void
  handleClick: () => void
  message: string
}

// 사용할 땐 오픈여부를 묻는 함수와 함께 사용해야 함, 더 좋은 방법있으면 수정 예정!
function AlertModal({
  onClose,
  handleClick,
  message,
}: AlertModalProps): JSX.Element {
  return (
    <ModalPortal>
      <AlertBackground onClick={onClose}>
        <Content>
          <div>{message}</div>
          <div className="buttonBox">
            <CommonButton
              size="small"
              handleClick={onClose}
              style={{
                width: '12rem',
                color: `${theme.color.black50}`,
                backgroundColor: `${theme.color.black20}`,
              }}
            >
              닫기
            </CommonButton>
            <CommonButton
              size="small"
              handleClick={handleClick}
              style={{ width: '12rem' }}
            >
              확인
            </CommonButton>
          </div>
        </Content>
      </AlertBackground>
    </ModalPortal>
  )
}

export default AlertModal

export const AlertBackground = styled(Background)`
  display: flex;
  justify-content: center;
  align-items: center;
`
export const Content = styled.div`
  width: 36rem;
  height: 20rem;
  font-size: ${theme.fontSize.larger};
  border-radius: 2rem;
  background-color: ${theme.color.white};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3rem;

  .buttonBox {
    display: flex;
    gap: 2rem;
  }
`
