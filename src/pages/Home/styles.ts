import styled from 'styled-components'

export const HomeLayout = styled.div`
  width: 100%;
  height: 100%;
`

export const FilterBox = styled.div`
  width: 100%;
  height: 0;
  position: absolute;
  top: 84px;
  padding: 0 20px;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 12px;
`

export const ResetSearchBox = styled(FilterBox)`
  margin: 0;
  top: unset;
  bottom: 120px;
  justify-content: center;
`

export const UserLocationButtonBox = styled(FilterBox)`
  top: unset;
  bottom: 150px;
  justify-content: flex-end;
`
