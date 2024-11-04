import styled, { keyframes } from 'styled-components'
import { theme } from '@/constants/theme'

export const HomeLayout = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-start;
  overflow-y: hidden;
`

export const FilterBox = styled.div`
  height: 12px;
  z-index: 2;

  position: absolute;
  background-color: red;
  top: 8px;
  left: 16px;
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
export const CardContainer = styled.section<{ $isOpen: boolean }>`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 106px;
  left: 0;
  height: calc(100% - 106px);
  background-color: ${theme.color.white};
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  z-index: 3;
  transition: transform 0.5s cubic-bezier(0.19, 1, 0.22, 1);
  will-change: transform;
  .toggle-button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 40px;
  }
  hr {
    width: 80px;
    height: 5px;
    border-radius: 8px;
    background: ${theme.color.black70};
  }
  .list {
    display: flex;
    flex-direction: column;
    overflow: auto;
    padding-top: 48px;
    justify-content: flex-start;
    align-items: center;
  }
`
export const ResetSearchBox = styled.div`
  width: 100%;
  height: 40px;
  position: absolute;
  z-index: 4;
  bottom: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: red;
`
const viewMapButtonFadeIn = keyframes`
from {
  /* transform: translateY(300px); */
  opacity: 0;

}
to{
  /* transform: translateY(0px); */

  z-index: 3;
}
`
export const ViewMapButton = styled.button`
  position: absolute;

  bottom: 20px;
  z-index: 4;
  border-radius: 16px;
  background-color: ${theme.color.bg4};
  color: ${theme.color.pink3};
  padding: 8px 8px;
  display: flex;
  flex-wrap: nowrap;
  white-space: pre;
  animation-name: ${viewMapButtonFadeIn};
  animation-duration: 0.5s;
  margin-right: 20px;
`
export const InfiniteScrollTrigger = styled.div`
  height: 160px;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 254, 254, 0.7973564425770308) 45%,
    rgba(240, 240, 240, 0.2) 100%
  );
  width: 100%;
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
