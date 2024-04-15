import styled from 'styled-components'

export const HomeLayout = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`

export const MapBox = styled.div`
  height: 100%;
  width: 100%;
  overflow: hidden;
`
export const FilterBox = styled.div`
  height: 0;
  width: 100%;
  position: absolute;
  top: 6rem;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 2rem;
`

export const ResetSearchBox = styled(FilterBox)`
  top: unset;
  bottom: 8rem;
  justify-content: center;
`

export const UserLocationButtonBox = styled(FilterBox)`
  top: unset;
  bottom: 10rem;
  justify-content: flex-end;
`
