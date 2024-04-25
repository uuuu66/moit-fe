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

  .title-text-box {
    width: 200px;
    height: 54px;
    overflow: hidden;
    display: flex;
    align-items: center;
  }

  h3 {
    white-space: normal;
    word-break: keep-all;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    ${({ theme }) => `
    color: ${theme.color.black70};
    font-size: ${theme.fontSize.larger2};
    font-weight: ${theme.fontWeight.bold};
    `}
  }

  .title-button-box {
    display: flex;
    gap: 12px;
  }

  .title-img-box {
    width: 38px;
    height: 38px;
    border-radius: 30px;
    background: ${({ theme }) => theme.color.white};
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      height: 16px;
    }
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
  display: inline-flex;
  white-space: nowrap;
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
  position: relative;
  overflow: hidden;
`

export const LeftShadowBox = styled.div<{ $isScrollLeft: boolean }>`
  display: ${({ $isScrollLeft }) => ($isScrollLeft ? 'none' : 'unset')};
  position: absolute;
  top: 0;
  left: -10px;
  width: 10px;
  height: 32px;
  box-shadow: 0 0 16px 24px rgba(255, 255, 255, 0.9);
`

export const RightShadowBox = styled.div<{ $isScrollRight: boolean }>`
  display: ${({ $isScrollRight }) => ($isScrollRight ? 'none' : 'unset')};
  position: absolute;
  top: 0;
  right: -10px;
  width: 10px;
  height: 32px;
  box-shadow: 0 0 16px 24px rgba(255, 255, 255, 0.9);
`

export const ScrollBox = styled.div`
  width: 100%;
  overflow: scroll;

  &::-webkit-scrollbar {
    display: none;
  }

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
    width: 100%;
    max-width: 360px;
    overflow: auto;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  strong {
    margin-right: 8px;
    font-weight: ${({ theme }) => theme.fontWeight.normal};
  }
`

export const SearchMeetingCardLayout = styled.div`
  border-radius: 12px;
  background: ${({ theme }) => theme.color.white};
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  justify-content: center;

  cursor: pointer;

  &:hover {
    border: ${({ theme }) => `1px solid ${theme.color.primary100}`};
  }

  .card-flex-box {
    padding-right: 24px;
    width: 100%;
    border-radius: 12px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: space-between;
    img {
      width: 16px;
      height: 16px;
    }
  }

  h2 {
    padding: 16px 16px 0;
    ${({ theme }) => `
    color: ${theme.color.primary100};
    font-size: ${theme.fontSize.medium};
    font-weight: ${theme.fontWeight.bold};
    `}
  }

  .right-icon-box {
    /* width: fit-content;
    background-color: red;
    height: 100%;
    display: inline-flex;
    align-items: center; */
  }
`
