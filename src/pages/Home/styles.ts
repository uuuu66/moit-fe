import styled from 'styled-components'
import { ModalBtn } from '@/components/filter/FilterFrame/styles'

export const HomeLayout = styled.div`
  width: 100%;
  height: 100%;
`

export const FilterBox = styled.div`
  height: 0;
  position: absolute;
  top: 84px;
  z-index: 2;
  width: 100%;

  .scroll-box {
    width: 100%;
    padding: 0 20px 2px;
    overflow: scroll;

    &::-webkit-scrollbar {
      display: none;
    }

    display: inline-flex;
    white-space: nowrap;
    gap: 12px;
  }
`

export const ResetSearchBox = styled.div`
  width: 100%;
  height: 0;
  position: absolute;
  z-index: 2;
  bottom: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
`
export const ResetSearchButton = styled(ModalBtn)`
  padding: 8px 24px;
  gap: 12px;
  line-height: 1.5;
  ${({ theme }) => `
  background:${theme.color.primary100};
  color: ${theme.color.white};
  border: 1px solid ${theme.color.white};
  box-shadow: 0 1px 4px 0 ${theme.color.primary100};
  
  &:hover {
    background-color: ${theme.color.hoverPrimary100};
    transition: 0.1s ease-in-out
  }
`}
`

export const UserLocationButtonBox = styled(ResetSearchBox)`
  bottom: 180px;
  justify-content: flex-end;
  padding-right: 16px;

  div {
    width: 56px;
    height: 56px;
    border-radius: 40px;
    background: #fff;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 4px;
  }
`
