import { Outlet } from 'react-router-dom'
import styled from 'styled-components'
import { useEffect, useState } from 'react'
import Footer from '@/components/Footer/Footer'
import Header from '@/components/Header/Header'
import { getLocalStorageItem, setLocalStorageItem } from '@/util/localStorage'
import Onboarding from './Onboarding'

export default function Layout(): JSX.Element {
  const [screenHeight, setScreenHeight] = useState(0)

  useEffect(() => {
    setScreenHeight(window.innerHeight)
  }, [])

  const isFirstStatus: boolean = getLocalStorageItem('isFirst')
  const [isFirstState, setIsFirstState] = useState<boolean>(
    isFirstStatus === null
  )

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
      <TextBox>
        <h1>폰트 테스트 500</h1>
        <h3>폰트 테스트 500</h3>
        <h4>폰트 테스트 600</h4>
        <h5>폰트 테스트 700</h5>
      </TextBox>
    </ScreenStyles>
  )
}

const ScreenStyles = styled.div<{ $screenHeight: number }>`
  width: 100vw;
  height: ${({ $screenHeight }) => `${$screenHeight}px`};
  display: flex;
  align-items: center;
  justify-content: center;

  @media screen and (min-width: 995px) {
    flex-direction: row-reverse;
    gap: 4rem;
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

  @media screen and (min-width: 995px) {
    display: unset;
    border: 1px solid #000;
    width: 500px;
    height: 500px;
  }
`
const LayoutStyles = styled.div<{ $screenHeight: number }>`
  width: 100%;
  min-width: 360px;
  max-width: 430px;
  height: ${({ $screenHeight }) => `${$screenHeight}px`};
  max-height: 932px;
  border: 1px solid #000;
  background: white;
  position: relative;
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
