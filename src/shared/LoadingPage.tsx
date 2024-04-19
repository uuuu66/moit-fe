import styled from 'styled-components'
import { theme } from '@/constants/theme'

interface LoadingPageProps {
  name: string
  isFade?: boolean
}
function LoadingPage({ name, isFade }: LoadingPageProps): JSX.Element {
  return (
    <Container $isFade={!!(isFade ?? false)}>
      <img src="/assets/logo.svg" alt="logo" />
      <div className="change">{name}</div>
      <div>불러오는 중...</div>
      <p>
        <span>잠시만 기다려 주세요!</span>
        <span>이 작업은 몇 초정도 걸릴 수 있습니다</span>
      </p>
    </Container>
  )
}

LoadingPage.defaultProps = {
  isFade: false,
}

export default LoadingPage

export const Container = styled.div<{ $isFade: boolean }>`
  width: 100%;
  bottom: 0;
  position: absolute;
  z-index: 99;
  height: 100%;
  background: linear-gradient(
    rgba(102, 122, 228, 0.15) 5%,
    ${({ $isFade }) => ($isFade ? 'rgba(255, 255, 255, 0.6)' : '#fff')} 30%
  );
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  img {
    width: 12.6rem;
    height: 11.2rem;
    margin-bottom: 4.8rem;
  }
  .change {
    color: ${theme.color.primary100};
  }
  div {
    font-size: 2.8rem;
    font-weight: 700;
  }
  p {
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: ${theme.fontSize.medium};
    font-weight: ${theme.fontWeight.light};
    color: ${theme.color.black40};
  }
`
