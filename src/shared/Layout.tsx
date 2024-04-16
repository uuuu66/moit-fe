import { Outlet } from 'react-router-dom'
import styled from 'styled-components'
import { useEffect, useState } from 'react'
import Footer from '@/components/Footer/Footer'
import Header from '@/components/Header/Header'

export default function Layout(): JSX.Element {
  const [screenHeight, setScreenHeight] = useState(0)

  useEffect(() => {
    setScreenHeight(window.innerHeight)
  }, [])

  return (
    <ScreenStyles $screenHeight={screenHeight}>
      <LayoutStyles $screenHeight={screenHeight}>
        <ContentsStyles>
          <Header />
          <ScrollBox>
            <Outlet />
          </ScrollBox>
        </ContentsStyles>
        <Footer />
      </LayoutStyles>
      <TextBox>소개글</TextBox>
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
  /* min-height: 780px; */
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
