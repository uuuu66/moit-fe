import { Outlet } from 'react-router-dom'
import styled from 'styled-components'
import Footer from '@/components/Footer/Footer'
import Header from '@/components/Header/Header'

export default function Layout(): JSX.Element {
  return (
    <ScreenStyles>
      <LayoutStyles>
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

const ScreenStyles = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  @media screen and (min-width: 430px) {
    display: flex;
    flex-direction: row-reverse;
    gap: 4rem;
  }
`

const TextBox = styled.div`
  @media screen and (max-width: 994px) {
    display: none;
  }
  border: 1px solid #000;
  width: 500px;
  height: 500px;
`
const LayoutStyles = styled.div`
  width: 100%;
  min-width: 360px;
  max-width: 430px;
  height: 100%;
  min-height: 780px;
  max-height: 932px;
  border: 1px solid #000;
  background: white;
  position: relative;
`

const ContentsStyles = styled.div`
  height: calc(100% - 80px);
`

const ScrollBox = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`
