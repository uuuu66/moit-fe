import { Outlet } from 'react-router-dom'
import styled from 'styled-components'

export default function Layout(): JSX.Element {
  return (
    <LayoutStyles>
      <Outlet />
    </LayoutStyles>
  )
}

const LayoutStyles = styled.div`
  width: 390px;
  min-height: 844px;
`
