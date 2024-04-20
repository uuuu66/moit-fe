import { Outlet } from 'react-router-dom'
import styled from 'styled-components'
import { useEffect, useState } from 'react'
import Footer from '@/components/Footer/Footer'
import Header from '@/components/Header/Header'
import { getLocalStorageItem, setLocalStorageItem } from '@/util/localStorage'
import Onboarding from './Onboarding'

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
      {isFirstState ? (
        <Onboarding
          handleClick={() => {
            setLocalStorageItem('isFirst', false)
            setIsFirstState(!isFirstState)
          }}
        />
      ) : (
        // <div
        //   style={{
        //     padding: '20px',
        //     backgroundColor: '#383737',
        //     border: '1px solid #626262',
        //     borderRadius: '20px',
        //   }}
        // >
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
        // </div>
      )}
      <TextBox>
        <img src="/assets/introduce.svg" alt="" />
      </TextBox>
    </ScreenStyles>
  )
}

const ScreenStyles = styled.div<{ $screenHeight: number }>`
  width: 100vw;
  height: ${({ $screenHeight }) => `${$screenHeight}px`};
  display: flex;
  align-items: center;
  /* background-image: url('/assets/mainBackground.svg'); */
  /* background-image: url('/assets/website.svg'); */
  background-image: url('/assets/website.jpg');
  /* background-image: url('/assets/logo.svg'); */
  background-size: cover;
  justify-content: center;

  @media screen and (min-width: 1235px) {
    flex-direction: row-reverse;
    gap: 27rem;
  }
`

const TextBox = styled.div`
  display: none;
  h1 {
    font-size: 24px;
    font-weight: 500;
    font-family: serif;
  }
  h3 {
    font-size: 24px;
    font-weight: 500;
  }
  h4 {
    font-size: 24px;
    font-weight: 600;
  }
  h5 {
    font-size: 24px;
    font-weight: 700;
  }

  @media screen and (min-width: 1235px) {
    display: unset;
    /* width: 500px;
    height: 500px; */
  }
`
const LayoutStyles = styled.div<{ $screenHeight: number }>`
  width: 100%;
  min-width: 360px;
  max-width: 430px;
  height: ${({ $screenHeight }) => `${$screenHeight}px`};
  min-height: 780px;
  max-height: 932px;
  border-radius: 20px;
  background: #383737;
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
