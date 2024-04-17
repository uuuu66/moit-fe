import styled from 'styled-components'

export const HomeMeetingsPanelLayout = styled.div`
  position: absolute;
  bottom: 66px;
  width: 100%;
  z-index: 2;
`

export const ToggleBox = styled.button`
  width: 100%;
  height: 7rem;
  border-radius: 20px 20px 0 0;
  background: ${({ theme }) => theme.color.bg3};
  position: relative;
  z-index: 3;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  hr {
    width: 80px;
    height: 5px;
    border-radius: 8px;
    background: ${({ theme }) => theme.color.black70};
  }

  div {
    width: 100%;
    height: 48px;
    padding: 0 20px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 6px;

    ${({ theme }) => `
    color: ${theme.color.black80};
    font-size: ${theme.fontSize.larger};
    font-weight: ${theme.fontWeight.bold};
    line-height: 1;
    `}
  }
`

export const MeetingsBackground = styled.div`
  height: 100vh;
  width: 100%;
  position: absolute;
  bottom: 0;
`
export const MeetingsBox = styled.div`
  height: fit-content;
  max-height: 37.5rem;
  overflow: scroll;
  width: 100%;
  padding: 16px 20px;
  background: ${({ theme }) => theme.color.bg3};
  position: relative;
`

export const CardBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`
