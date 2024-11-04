import { Outlet, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { Suspense, useEffect, useState } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import Footer from '@/components/Footer/Footer'
import Header from '@/components/Header/Header'
import { getLocalStorageItem, setLocalStorageItem } from '@/util/localStorage'
import Onboarding from './Onboarding'
import { theme } from '@/constants/theme'
import Router from './Router'
import PageTransitionProvider from './PageTransitionProvider'

export default function Layout(): JSX.Element {
  const [screenHeight, setScreenHeight] = useState(window.innerHeight)
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)
  const location = useLocation()

  const isFirstStatus: boolean = getLocalStorageItem('isFirst')
  const [isFirstState, setIsFirstState] = useState<boolean>(
    isFirstStatus === null
  )

  useEffect(() => {
    const handleResize = (): void => {
      setScreenHeight(window.innerHeight)
      setScreenWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <ScreenStyles $screenHeight={screenHeight} $screenWidth={screenWidth}>
      <img
        className="background-img"
        src="/assets/website.jpg"
        alt="background"
      />
      {isFirstState ? (
        <Onboarding
          handleClick={() => {
            setLocalStorageItem('isFirst', false)
            setIsFirstState(!isFirstState)
          }}
        />
      ) : (
        <LayoutStyles $screenHeight={screenHeight}>
          <Suspense>
            <PageTransitionProvider
              transitionKey={location.pathname.split('/')[1]}
            >
              <Router pathname={location.pathname} />
            </PageTransitionProvider>
            <Footer />
            <div id="modal" />
          </Suspense>
        </LayoutStyles>
      )}
      <IntroduceBox>
        <img src="/assets/introduce.svg" alt="introduce" />
        <div>
          <span>HANGHAE99</span>
          <span>hanghae99_1903@gmail.com</span>
          <span>서비스 사용 중 문제가 있다면, 이메일로 연락부탁드립니다.</span>
        </div>
      </IntroduceBox>
    </ScreenStyles>
  )
}

const ScreenStyles = styled.div<{
  $screenHeight: number
  $screenWidth: number
}>`
  width: ${({ $screenWidth }) => `${$screenWidth}px`};
  height: ${({ $screenHeight }) => `${$screenHeight}px`};
  display: flex;
  align-items: center;
  justify-content: center;

  .background-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
  }

  @media screen and (min-width: 1235px) {
    flex-direction: row-reverse;
    gap: 27rem;
  }
`

const IntroduceBox = styled.div`
  display: none;
  div {
    display: flex;
    flex-direction: column;
    font-size: ${theme.fontSize.larger2};
    font-weight: ${theme.fontWeight.normal};
    color: ${theme.color.black40};
    margin-top: 26rem;
    :first-child {
      font-weight: ${theme.fontWeight.bold};
    }
  }
  @media screen and (min-width: 1235px) {
    display: unset;
  }
  position: relative;
`

const LayoutStyles = styled.div<{ $screenHeight: number }>`
  width: 100%;
  min-width: 360px;
  max-width: 430px;
  height: ${({ $screenHeight }) => `${$screenHeight}px`};
  max-height: 932px;
  border-radius: 20px;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 1);
  background: ${theme.color.primary10};
  position: relative;
  box-sizing: unset;
  overflow: hidden;

  @media screen and (max-width: 430px) {
    border-radius: 0;
  }
`

const ScrollBox = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`
