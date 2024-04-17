import styled from 'styled-components'

export const LoginModalLayout = styled.div`
  width: 100%;
  background: #fff;
  position: absolute;
  bottom: 0;
  border-radius: 20px 20px 0 0;
  display: flex;
  flex-direction: column;
  padding: 26px 20px 0;
  gap: 40px;

  hr {
    width: 130px;
    height: 5px;
    margin: 21px auto 8px;
    border-radius: 25px;
    background: ${({ theme }) => theme.color.black100};
  }
`
export const CloseBox = styled.div`
  display: flex;
  justify-content: flex-end;

  button {
    cursor: pointer;
    padding: 8px;
  }

  img {
    width: 12px;
  }
`

export const ContentsBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;

  img {
    width: 43px;
  }

  h2 {
    width: 200px;
    ${({ theme }) => `
    color: ${theme.color.black90};
    font-size: ${theme.fontSize.large};
    font-weight: ${theme.fontWeight.bold};
    `}
  }

  p {
    ${({ theme }) => `
    color: ${theme.color.black40};
    font-size: ${theme.fontSize.medium};
    font-weight: ${theme.fontWeight.normal};
    `}
  }
`

export const ButtonBox = styled.div`
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const LoginButton = styled.button`
  width: 100%;
  height: 3rem;
  background: #333;
  color: #fff;
  border-radius: 8px;
`
