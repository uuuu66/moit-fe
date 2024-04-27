import styled from 'styled-components'
import ModalPortal from './ModalPortal'
import { Background } from '../filter/FilterFrame/styles'
import CommonButton from '../common/Button/CommonButton'
import { theme } from '@/constants/theme'

export interface AlertModalProps {
  onClose: () => void
  handleClick: () => void
  message: string
  firstSubMessage?: string
  secondSubMessage?: string
  buttonName: string
}

// 사용할 땐 오픈여부를 묻는 함수와 함께 사용해야 함, 더 좋은 방법있으면 수정 예정!
function AlertModal({
  onClose,
  handleClick,
  message,
  firstSubMessage,
  secondSubMessage,
  buttonName,
}: AlertModalProps): JSX.Element {
  return (
    <ModalPortal>
      <AlertBackground onClick={onClose}>
        <Content>
          <div className="mainInfo">
            <span>모임을</span>
            <div>
              <span className="emphasis">{message}</span>
              <span>하시겠습니까?</span>
            </div>
          </div>
          <div className="subContainer">
            <span className="sub">{firstSubMessage}</span>
            <span className="sub">{secondSubMessage}</span>
          </div>
          <div className="buttonBox">
            <CommonButton
              size="small"
              $type="gray"
              handleClick={onClose}
              style={{
                width: '15rem',
                color: `${theme.color.black40}`,
                borderRadius: '8px',
              }}
            >
              취소
            </CommonButton>
            <CommonButton
              size="small"
              $type="primary"
              handleClick={handleClick}
              style={{
                width: '15rem',
                borderRadius: '8px',
              }}
            >
              {buttonName}
            </CommonButton>
          </div>
        </Content>
      </AlertBackground>
    </ModalPortal>
  )
}

AlertModal.defaultProps = {
  firstSubMessage: undefined,
  secondSubMessage: undefined,
}

export default AlertModal

export const AlertBackground = styled(Background)`
  display: flex;
  justify-content: center;
  align-items: center;
`
export const Content = styled.div`
  width: 34.6rem;
  padding: 2.8rem 0;
  font-size: ${theme.fontSize.large};
  font-weight: ${theme.fontWeight.normal};
  border-radius: 12px;
  background-color: ${theme.color.white};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;

  img {
    padding: 1rem 0;
  }
  .buttonBox {
    display: flex;
    gap: 1.2rem;
  }
  .subContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0;
    color: red;
  }
  .sub {
    font-size: ${theme.fontSize.medium};
    font-weight: ${theme.fontWeight.light};
    color: ${theme.color.black40};
  }
  .mainInfo {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .emphasis {
    color: ${theme.color.primary100};
    font-size: ${theme.fontSize.large};
    font-weight: ${theme.fontWeight.normal};
  }
`
