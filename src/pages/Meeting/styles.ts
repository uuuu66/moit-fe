import styled from 'styled-components'
import { theme } from '@/constants/theme'

export const WholeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: ${theme.fontSize.medium};
  background-color: ${theme.color.bg3};
  color: ${theme.color.primary100};

  .info {
    width: 100%;
  }
`

export const InfoHeader = styled.header`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18.5px 20px;

  button {
    text-align: left;
    font-size: large;
    height: 20px;
  }
  h2 {
    font-size: ${theme.fontSize.medium};
    color: ${theme.color.black60};
  }
  div {
    width: 3rem;
  }
`

export const RegisterTitle = styled.div`
  width: 100%;
  padding: 1rem 2rem;

  h1 {
    font-size: ${theme.fontSize.large};
    font-weight: ${theme.fontWeight.bold};
    padding-bottom: 0.8rem;
    color: ${theme.color.black80};
  }
  span {
    font-size: ${theme.fontSize.medium};
    color: ${theme.color.black40};
  }
`

export const InputBox = styled.div`
  background-color: ${theme.color.white};
  display: flex;
  flex-direction: column;
  padding: 1.6rem 2rem;
  margin-top: 2rem;
  border: 1px solid ${theme.color.line2};
  border-radius: 0.8rem;
  gap: 0.4rem;

  &:focus-within {
    border-color: ${theme.color.primary100};
  }
  label {
    font-size: 1.2rem;
    color: ${theme.color.black40};
  }
  input {
    &::placeholder {
      color: ${theme.color.black40};
    }
  }
  textarea {
    height: 14rem;
    &::placeholder {
      color: ${theme.color.black40};
    }
  }
`

export const InfoContainer = styled.div`
  margin: 4rem 2rem;
  display: flex;
  flex-direction: column;

  span {
    font-size: ${theme.fontSize.small};
    color: ${theme.color.black40};
  }
  .meetingDate {
    font-size: 1.2rem;
    color: ${theme.color.black40};
  }
  .dateInfo {
    width: 100%;
    text-align: right;
    margin-top: 0.8rem;
    span {
      color: ${theme.color.warn};
      font-weight: ${theme.fontWeight.normal};
    }
  }
  .check {
    width: 100%;
    text-align: right;
    margin-top: 0.8rem;
  }
`

export const PriceBox = styled(InputBox)`
  div {
    display: flex;
    align-items: center;
    justify-content: flex-end;

    label {
      font-size: ${theme.fontSize.medium};
      color: ${theme.color.primary100};
    }
  }
  input {
    width: 100%;
    text-align: right;
    padding-right: 0.5rem;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox  */
  /* input[type='number'] {
    -moz-appearance: textfield;
  } */
`

export const NameInfoContainer = styled.div`
  padding: 0 2rem;
`

export const InfoTitle = styled.h1`
  /* margin: 1rem 0; */
  font-size: ${theme.fontSize.larger};
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.color.primary100};
`

export const MemberCount = styled.div`
  margin: 3rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4.2rem;

  div {
    font-size: 4rem;
    font-weight: 800;
    color: ${theme.color.primary100};
  }
`

export const CareerContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 2rem;

  button {
    font-size: 14px;
    color: ${theme.color.black40};
    background-color: ${theme.color.bg2};
    padding: 1rem;
    border-radius: 4rem;
    box-shadow: rgba(99, 99, 99, 0.1) 0px 2px 4px 0px;
  }
  .selected {
    color: ${theme.color.white};
    background-color: ${theme.color.primary100};
  }
`
