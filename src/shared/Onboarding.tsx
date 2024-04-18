import styled from 'styled-components'
import CommonButton from '@/components/common/Button/CommonButton'
import { theme } from '@/constants/theme'

function Onboarding({ handleClick }: { handleClick: () => void }): JSX.Element {
  return (
    <OnboardingContainer>
      <div>
        <span>흩어져 있는</span>
        <span>개발자들을 모아봐요!</span>
      </div>
      <img src="/assets/onboarding.svg" style={{ width: '26rem' }} alt="" />
      <p>
        <span>MOIT을 알차게 사용하려면</span>
        <span>위치 및 알림 설정이 필요합니다</span>
      </p>
      <CommonButton
        size="large"
        handleClick={handleClick}
        style={{ backgroundColor: `${theme.color.primary100}` }}
      >
        시작하기
      </CommonButton>
    </OnboardingContainer>
  )
}

export default Onboarding

export const OnboardingContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4rem;

  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 2.8rem;
    font-weight: ${theme.fontWeight.bold};
  }
  p {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: ${theme.fontSize.medium};
    font-weight: ${theme.fontWeight.light};
    color: ${theme.color.black40};
    margin-bottom: 7rem;
  }
`
