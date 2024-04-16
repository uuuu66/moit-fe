import styled from 'styled-components'

export const ModalBtn = styled.button`
  padding: 8px 16px;
  border-radius: 40px;
  display: flex;
  align-items: center;
  gap: 4px;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.4);
  ${({ theme }) => `
  background: ${theme.color.white};
  font-size: ${theme.fontSize.small};
  color: ${theme.color.black50};
    `}
`

export const Background = styled.div`
  width: 100%;
  min-width: 360px;
  max-width: 430px;
  height: 932px;
  background: rgba(0, 0, 0, 0.3);
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: 99;
`

export const FilterContainer = styled.div<{ $isHigherPB: boolean }>`
  width: 100%;
  position: absolute;
  bottom: 0px;
  left: 0;
  border-radius: 20px 20px 0 0;
  background-color: ${({ theme }) => theme.color.white};

  ul {
    padding-bottom: ${({ $isHigherPB }) => ($isHigherPB ? '144px' : '84px')};
    overflow-y: auto;
    max-height: 532px; // TODO : 여기 손 봐야됨
    li {
      cursor: pointer;
      &:hover {
        background-color: ${({ theme }) => theme.color.primary10};
      }

      button {
        width: 100%;
        padding: 18px 20px;
        display: flex;
        justify-content: space-between;
        ${({ theme }) => `
        color: ${theme.color.black30};
        font-size: ${theme.fontSize.medium};
        fontWeight: ${theme.fontWeight.light};
        `}

        span {
          min-height: 24px;
        }

        .selected {
          color: ${({ theme }) => theme.color.primary100};
        }
      }
    }
  }

  hr {
    margin: 15px auto 8px;
    width: 80px;
    height: 5px;
    border-radius: 8px;
    background: ${({ theme }) => theme.color.black70};
  }
`

export const FilterTitle = styled.h2`
  margin: 16px 20px;
  ${({ theme }) => `
  color: ${theme.color.black70};  
  font-size: ${theme.fontSize.larger};
  font-weight: ${theme.fontWeight.bold};
  `}
`
export const BottomBox = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  ${({ theme }) => `
  border-top: 1px solid ${theme.color.black20};
  background-color: ${theme.color.white};
  `}
`

export const SelectedTagBox = styled.div`
  width: 100%;
  padding: 12px 10px;
  display: inline-flex;
  white-space: nowrap;
  align-items: center;
  gap: 12px;
  overflow-x: auto;

  div {
    border-radius: 40px;
    padding: 6px 12px;
    display: flex;
    align-items: center;
    gap: 4px;
    ${({ theme }) => `
    background: ${theme.color.black10};
    color: ${theme.color.black70};
    font-size: ${theme.fontSize.medium};
    font-weight: ${theme.fontWeight.normal};
    `}
  }

  button {
    width: 18px;
    height: 18px;
    display: inline-flex;
    align-items: center;
    justify-content: center;

    img {
      width: 8px;
    }
  }
`

export const BottomBoxNav = styled.div`
  width: 100%;
  padding: 16px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .reset-button {
    margin: 0 20px;
    display: inline-flex;
    white-space: nowrap;
    align-items: center;
    justify-content: center;
    gap: 12px;

    p {
      ${({ theme }) => `
      color: ${theme.color.black30};
      font-size: ${theme.fontSize.medium};
    `};
    }
  }
`

export const SearchInputBox = styled.div`
  width: 100%;
  padding: 10px 20px;

  input {
    border-radius: 40px;
    padding: 12px 16px;
    box-sizing: border-box;
    width: 100%;
    ${({ theme }) => `
    color: ${theme.color.black40};
    font-size: ${theme.fontSize.small};
    background: ${theme.color.black10};
    `}
  }
`
export const ListBox = styled.div`
  display: flex;
`

export const SelectedStack = styled.div`
  width: 24.375rem;
  background-color: white;
  display: flex;
  align-items: center;
  gap: 0.2rem;
  margin-bottom: 1rem;
  margin-left: 1.25rem;
  overflow-x: auto;

  div {
    background-color: lightblue;
    border-radius: 2.5rem;
    padding: 0.375rem 0.75rem;
  }
`
