import styled from 'styled-components'

export const HomeLayout = styled.div`
  width: 100%;
  height: 100%;
`

export const FilterBox = styled.div`
  height: 0;
  width: 100%;
  position: absolute;
  top: 84px;
  left: 20px;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 12px;
`

export const ResetSearchBox = styled(FilterBox)`
  margin: 0;
  top: unset;
  bottom: 120px;
  left: 0;
  justify-content: center;
`

export const UserLocationButtonBox = styled(FilterBox)`
  margin: 0;
  top: unset;
  bottom: 150px;
  left: -20px;
  justify-content: flex-end;
`
