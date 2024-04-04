import styled from 'styled-components'

export const WholeContainer = styled.div`
  border: 1px solid green;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const InfoHeader = styled.header`
  width: 100%;
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 2fr;
  padding: 18.5px 20px;
  button {
    text-align: left;
    font-size: large;
  }
`

export const RegisterTitle = styled.div`
  width: 100%;
  padding: 1rem 20px;

  h1 {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: 0.8rem;

    span {
      font-size: 1.5rem;
      font-weight: 700;
      color: black;
    }
  }
  span {
    font-size: 1rem;
    color: gray;
  }
`

export const InputBox = styled.div`
  background-color: #e9e9e9;
  display: flex;
  flex-direction: column;
  padding: 20px 10px;
  border-radius: 0.5rem;
  gap: 0.4rem;

  label {
    font-size: 12px;
    color: gray;
  }
  span {
    font-size: 12px;
    color: gray;
  }
`

export const InfoContainer = styled.div`
  margin: 3rem 20px;

  span {
    font-size: 14px;
  }
  .where {
    width: 100%;
    background-color: #e9e9e9;
    border-radius: 0.5rem;
    height: 48px;
  }
`

export const AccountContainer = styled(InfoContainer)`
  display: flex;
  align-items: center;
  gap: 2rem;

  h3 {
    font-size: 20px;
    margin-bottom: 1rem;
    color: gray;
  }

  span {
    color: gray;
  }
`

export const PriceBox = styled.div`
  background-color: #e9e9e9;
  border-radius: 0.5rem;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  input {
    width: 5rem;
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
  padding: 0 20px;
`

export const InfoTitle = styled.h3`
  font-size: 20px;
  margin: 1rem 0;
  color: gray;
`

export const MemberCount = styled.div`
  /* width: 12.5rem; */
  margin: 3rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 42px;

  div {
    font-size: 40px;
    font-weight: 800;
  }
`
export const MemberCountBtn = styled.button`
  width: 3.125rem;
  height: 3.125rem;
  background-color: #e9e9e9;
  border-radius: 50%;
`
export const CareerContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  /* margin: 1rem 20px; */

  button {
    font-size: 14px;
    background-color: #e9e9e9;
    padding: 10px;
    border-radius: 40px;
  }
`
