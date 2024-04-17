import styled from 'styled-components'
import { InfoTitle } from '../Meeting/styles'
import { theme } from '@/constants/theme'
import { ChatContainer } from '../Chat/styles'

export const DetailWholeContainer = styled(ChatContainer)`
  font-size: ${theme.fontSize.medium};
`

export const DetailInfoContainer = styled(DetailWholeContainer)`
  background-color: ${theme.color.pg1};
  height: 100%;
  overflow-y: auto;
  margin-top: 1rem;
  padding-bottom: 4rem;
`

export const Box = styled.div`
  width: 92%;
  display: flex;
  flex-direction: column;
  padding: 2.8rem 2rem;
  gap: 2rem;
  border-radius: 2rem;
  margin: 1rem 0;
  background-color: ${theme.color.primary90};
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

  h1 {
    font-size: ${theme.fontSize.large};
    font-weight: ${theme.fontWeight.bold};
    color: ${theme.color.white};
  }

  .userInfo {
    display: flex;
    align-items: center;
    gap: 1rem;
    color: ${theme.color.white};
  }

  .imgIcon {
    width: 40px;
    height: 40px;
    background-color: #e9e9e9;
    border-radius: 0.5rem;
  }

  .tagbox {
    background-color: ${theme.color.primary100};
    border-radius: 0.8rem;
    padding: 1rem;
    margin-top: 0.5rem;
    display: flex;
    flex-wrap: wrap;
    gap: 1.2rem;
  }
`

export const Box1 = styled(Box)`
  background-color: ${theme.color.white};
  gap: 1.2rem;

  p {
    font-size: ${theme.fontSize.small};
    color: ${theme.color.black60};
  }
`

export const BasicInfoBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;

  .info {
    width: 100%;
    display: flex;
    justify-content: space-between;
    gap: 0.25rem;
    color: ${theme.color.black70};

    :first-child {
      font-size: 14px;
      font-weight: 400;
      color: ${theme.color.black60};
    }

    span {
      font-weight: 600;
    }
  }
`
export const CareerTag = styled.span`
  font-size: 1.2rem;
  font-weight: ${theme.fontWeight.light};
  background-color: ${theme.color.primary30};
  color: ${theme.color.primary100};
  border-radius: 5rem;
  padding: 0.6rem 1cap;
`

export const DetailInfoTitle = styled(InfoTitle)`
  color: ${theme.color.black80};
  font-weight: ${theme.fontWeight.bold};
`

export const DetailButtonContainer = styled.div`
  width: 100%;
  border-top: 1px solid ${theme.color.line2};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.6rem 0;
`
