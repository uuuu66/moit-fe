import styled from 'styled-components'

export const HomeMeetingsCardLayout = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.4);
  cursor: pointer;
`

export const TitleBox = styled.div`
  padding: 16px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${({ theme }) => theme.color.primary10};

  h3 {
    width: 186px;
    height: 54px;
    overflow: hidden;
    display: flex;
    align-items: center;
    ${({ theme }) => `
    color: ${theme.color.black70};
    font-size: ${theme.fontSize.larger2};
    font-weight: ${theme.fontWeight.bold};
    `}
  }
`

export const ContentsBox = styled.div`
  width: 100%;
  padding: 16px 20px;
  background: ${({ theme }) => theme.color.white};
  display: flex;
  flex-direction: column;
  gap: 12px;
`

export const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  .flex-box {
    display: flex;
    gap: 12px;
  }
`

export const CardIconText = styled.div`
  display: flex;
  align-items: center;

  p {
    padding-top: 2px;
    ${({ theme }) => `
    color: ${theme.color.black40};
    font-size: ${theme.fontSize.small};
    font-weight: ${theme.fontWeight.light};
    `}
  }

  img {
    height: 12px;
  }

  gap: 8px;
`

export const TagBox = styled.div`
  width: 100%;
  overflow: scroll;

  div {
    display: flex;
    width: fit-content;
    gap: 8px;
  }

  p {
    width: max-content;
    padding: 6px 10px;
    background: #aaa;
    border-radius: 25px;
    ${({ theme }) => `
    background: ${theme.color.bg2};
    color: ${theme.color.black40};
    font-size: ${theme.fontSize.smaller};
    font-weight: ${theme.fontWeight.normal};
    `}
  }
`

export const HomeSelectedMeetingCardLayout = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: ${({ theme }) => theme.color.white};
  position: relative;

  hr {
    width: 100%;
    border: 1px solid ${({ theme }) => theme.color.black10};
  }
`

export const SelectedCardTitleBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  h3 {
    width: 286px;
    min-height: 64px;
    display: flex;
    align-items: center;
    ${({ theme }) => `
    color: ${theme.color.black80};
    font-size: ${theme.fontSize.large};
    font-weight: ${theme.fontWeight.bold};
    `}
  }

  .title-flex-box {
    display: flex;
    gap: 12px;

    p {
      color: ${({ theme }) => theme.color.black60};
    }
  }
`

export const SelectedCardContentsBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;

  .contents-flex-box {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  strong {
    /* min-width: 50px; */
    margin-right: 8px;
    font-weight: ${({ theme }) => theme.fontWeight.normal};
  }
`
