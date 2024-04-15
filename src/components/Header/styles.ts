import styled from 'styled-components'

export const HeaderContainer = styled.header<{ isShow: boolean }>`
  height: 56px;
  width: 100%;
  background: #f3f4fc;
  display: ${({ isShow }) => (isShow ? 'flex' : 'none')};
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;

  button {
    cursor: pointer;
    width: 3rem;
    height: 3rem;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`
export const HeaderImg = styled.img``
