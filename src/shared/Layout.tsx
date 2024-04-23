import { Outlet } from 'react-router-dom'
import styled from 'styled-components'
import { useEffect, useState } from 'react'
import Footer from '@/components/Footer/Footer'
import Header from '@/components/Header/Header'
import { getLocalStorageItem, setLocalStorageItem } from '@/util/localStorage'
import Onboarding from './Onboarding'
import { theme } from '@/constants/theme'

export default function Layout(): JSX.Element {
  const [screenHeight, setScreenHeight] = useState(window.innerHeight)

  const isFirstStatus: boolean = getLocalStorageItem('isFirst')
  const [isFirstState, setIsFirstState] = useState<boolean>(
    isFirstStatus === null
  )

  useEffect(() => {
    const handleResize = (): void => {
      setScreenHeight(window.innerHeight)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <ScreenStyles $screenHeight={screenHeight}>
      {/* <LayoutBorder> */}
      {isFirstState ? (
        <Onboarding
          handleClick={() => {
            setLocalStorageItem('isFirst', false)
            setIsFirstState(!isFirstState)
          }}
        />
      ) : (
        <LayoutStyles $screenHeight={screenHeight}>
          <ContentsStyles>
            <Header />
            <ScrollBox>
              <Outlet />
            </ScrollBox>
          </ContentsStyles>
          <Footer />
          <div id="modal" />
        </LayoutStyles>
      )}
      {/* </LayoutBorder> */}
      <IntroduceBox>
        <img src="/assets/introduce.svg" alt="" />
        <div>
          <span>HANGHAE99</span>
          <span>hanghae99_1903@gmail.com</span>
          <span>서비스 사용 중 문제가 있다면, 이메일로 연락부탁드립니다.</span>
        </div>
      </IntroduceBox>
    </ScreenStyles>
  )
}

const ScreenStyles = styled.div<{ $screenHeight: number }>`
  width: 100vw;
  height: ${({ $screenHeight }) => `${$screenHeight}px`};
  display: flex;
  align-items: center;
  background-image: url('/assets/website.jpg');
  background-size: cover;
  justify-content: center;

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
`

// const LayoutBorder = styled.div`
//   width: 100%;
//   min-width: 400px;
//   max-width: 470px;
//   padding: 20px;
//   background-color: #383737;
//   border: 1px solid #626262;
//   border-radius: 50px;
//   /* display: block; */

//   /* @media screen and (max-width: 1235px) {
//     display: none;
//   } */
// `

const LayoutStyles = styled.div<{ $screenHeight: number }>`
  width: 100%;
  min-width: 360px;
  max-width: 430px;
  height: ${({ $screenHeight }) => `${$screenHeight}px`};
  /* min-height: 780px; */
  max-height: 932px;
  border-radius: 20px;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 1);
  background: ${theme.color.primary10};
  position: relative;
  box-sizing: unset;
  overflow: hidden;
`

const ContentsStyles = styled.div`
  height: calc(100% - 66px);
`

const ScrollBox = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`
