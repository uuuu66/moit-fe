import styled from 'styled-components'

export const HomeMeetingsPanelLayout = styled.div`
  width: 100%;
  border-radius: 20px 20px 0 0;
  box-shadow: 0 -1px 4px -2px rgba(0, 0, 0, 0.8);
  background-color: ${({ theme }) => theme.color.bg2};
  position: absolute;
  bottom: 66px;
  z-index: 2;
`
export const ToggleBox = styled.button`
  width: 100%;
  height: 70px;
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

export const SelectedCardToggleBox = styled(ToggleBox)`
  height: unset;
  background: ${({ theme }) => theme.color.white};

  hr {
    width: 56px;
    background: ${({ theme }) => theme.color.black20};
    border: none;
  }
`

export const MeetingsBackground = styled.div`
  height: 100vh;
  width: 100%;
  position: absolute;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
`
export const MeetingsBox = styled.div<{ $isSmall: boolean }>`
  height: fit-content;
  max-height: ${({ $isSmall }) => ($isSmall ? '424px' : '544px')};
  overflow: scroll;
  width: 100%;
  padding: 16px 20px;
  background: ${({ theme }) => theme.color.bg3};
  position: relative;

  &::-webkit-scrollbar {
    display: none;
  }
`

export const CardBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`
