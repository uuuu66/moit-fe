import styled from 'styled-components'
import { theme } from '@/constants/theme'

export const SearchLayout = styled.div`
  width: 100%;
  height: 100%;
  background: ${theme.color.white};
  display: flex;
  flex-direction: column;
`

export const SearchBox = styled.div`
  padding: 20px;
  padding-bottom: 0;
  display: flex;
  flex-direction: column;
  gap: 20px;

  .input-flex-box {
    display: flex;
    gap: 8px;
  }
`

export const InputBox = styled.div`
  width: 100%;
  background-color: ${theme.color.bg2};
  display: flex;
  padding: 14px 20px;
  border-radius: 8px;
  gap: 8px;

  input {
    width: 100%;
    font-size: ${theme.fontSize.small};
  }
`

export const ToggleBox = styled.div`
  border-radius: 8px;
  background: ${theme.color.pg1};
  overflow: hidden;

  h1 {
    color: ${theme.color.black80};
    font-size: ${theme.fontSize.larger};
    font-weight: ${theme.fontWeight.bold};
  }

  img {
    width: 18px;
    margin-right: 8px;
  }
`

export const ToggleButton = styled.button<{ $isPointer: boolean }>`
  width: 100%;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: ${({ $isPointer }) => ($isPointer ? 'pointer' : 'default')};
`

export const RecentTagBox = styled.div`
  padding: 16px 20px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  height: 116px;
  overflow: auto;

  &::-webkit-scrollbar {
    display: none;
  }

  button {
    height: 32px;
    padding: 6px 12px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    white-space: nowrap;
    background: ${theme.color.primary20};
    color: ${theme.color.primary100};
    font-size: ${theme.fontSize.small};
    font-weight: ${theme.fontWeight.normal};

    &:hover {
      background: ${theme.color.bg4};
      border: 1px solid ${theme.color.primary100};
      transition: 0.1s ease-in-out;
    }
  }
`

export const EmptyTextBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 14px;

  img {
    width: 42px;
  }

  p {
    color: ${theme.color.black40};
    font-size: ${theme.fontSize.medium};
    font-weight: ${theme.fontWeight.normal};
  }
`

export const PopularMeetingsBox = styled.div`
  padding: 20px;
  padding-right: 0;
  background: ${theme.color.white};
  display: flex;
  flex-direction: column;
  gap: 20px;
  h1 {
    color: ${theme.color.black80};
    font-size: ${theme.fontSize.larger};
    font-weight: ${theme.fontWeight.bold};
  }

  img {
    width: 18px;
    margin-right: 8px;
  }
`

export const PopularMeetingCardBox = styled.div`
  overflow: auto;

  &::-webkit-scrollbar {
    display: none;
  }

  .popular-card-flex-box {
    display: inline-flex;
    white-space: nowrap;
    gap: 20px;
    padding-right: 20px;
  }
`

export const PopularMeetingCard = styled.div`
  width: 218px;
  padding: 20px;
  border-radius: 20px;
  background-color: ${theme.color.primary100};
  background-image: url('/assets/logoBackground.svg');
  background-position: top 0 right 0;
  background-repeat: no-repeat;
  display: inline-flex;
  flex-direction: column;
  gap: 16px;
  white-space: nowrap;

  span {
    width: 36px;
    height: 36px;
    border-radius: 50px;
    background: ${theme.color.primary60};
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${theme.color.white};
    font-size: ${theme.fontSize.larger2};
    font-weight: ${theme.fontWeight.bold};
  }

  h2 {
    height: 72px;
    overflow: hidden;
    white-space: normal;
    word-break: keep-all;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    color: ${theme.color.white};
    font-size: ${theme.fontSize.medium};
    font-weight: ${theme.fontWeight.bold};
  }

  button {
    width: 100%;
    height: 40px;
    border-radius: 12px;
    background: ${theme.color.primary30};
    color: ${theme.color.primary100};

    &:hover {
      background: ${theme.color.primary70};
      transition: 0.1s ease-in-out;
    }
  }
`

export const PopularCardTextBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  .card-icon-text {
    display: flex;
    align-items: flex-start;
    color: ${theme.color.white};
    font-size: ${theme.fontSize.small};
    line-height: 1;
    img {
      width: 14px;
      height: 14px;
    }

    div {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
  }
`

export const CardBox = styled.div`
  height: 100%;
  min-height: 160px;
  padding: 20px;
  margin-top: 20px;
  background: ${theme.color.white};
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow: auto;

  &::-webkit-scrollbar {
    display: none;
  }

  .scroll-top-button-box {
    width: 100%;
    height: 0;
    position: sticky;
    top: 600px;
    z-index: 2;
    display: flex;
    justify-content: flex-end;

    @media screen and (max-height: 900px) {
      top: calc(100px + 40vh);
    }
  }
`
