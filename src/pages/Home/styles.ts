import styled from 'styled-components'

const MainLayout = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: scroll;
  z-index: 0;
`

const FilterBox = styled.div`
  position: absolute;
  top: 0;
  z-index: 1;
`
export { MainLayout, FilterBox }
