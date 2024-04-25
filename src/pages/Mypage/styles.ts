import styled from 'styled-components'

export const MypageLayout = styled.div`
  height: fit-content;
  min-height: 100%;
  padding: 16px 0;
  width: 100%;

  background: ${({ theme }) => theme.color.bg1};
  display: flex;
  flex-direction: column;
  gap: 28px;
`

export const NavBox = styled.header`
  width: 100%;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  h2 {
    ${({ theme }) => `
    color: ${theme.color.black60};
    font-size: ${theme.fontSize.medium};
    font-weight: ${theme.fontWeight.bold};
    `}
  }

  button {
    position: absolute;
    left: 20px;
  }
`

export const ProfileBox = styled.div`
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 28px;

  .profile-flex-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
  }

  p {
    ${({ theme }) => `
    color: ${theme.color.black80};
    font-size: ${theme.fontSize.medium};
    font-weight: ${theme.fontWeight.bold};
    `}
  }
`

export const ImageBox = styled.div`
  width: 98px;
  height: 98px;
  background: ${({ theme }) => theme.color.black10};
  border-radius: 60px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 58px;
    height: 50px;
  }
`

export const InfoCardBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`

export const InfoCard = styled.div`
  width: 102px;
  height: 104px;
  background: ${({ theme }) => theme.color.primary100};
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h2 {
    ${({ theme }) => `
    color: ${theme.color.white};
    font-size: ${theme.fontSize.small};
    font-weight: ${theme.fontWeight.normal};
    `}
  }

  p {
    height: 20px;
    width: 100%;
    position: relative;
    text-align: center;
    ${({ theme }) => `
    color: ${theme.color.white};
    font-size: ${theme.fontSize.large};
    font-weight: 700;
    
    `}
  }

  span {
    padding: 0 16px;
    position: absolute;
    right: 0;
    bottom: -10px;
    ${({ theme }) => `
    color: ${theme.color.primary30};
    font-size: ${theme.fontSize.smaller};
    font-weight: ${theme.fontWeight.normal};
    `}
  }
`

export const SectionLine = styled.hr`
  width: 100%;
  height: 4px;
  border: none;
  background: ${({ theme }) => theme.color.black10};
`

export const LogoutBox = styled.div`
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 20px;

  cursor: pointer;

  .logout-flex-box {
    display: flex;
    gap: 12px;
    align-items: center;

    p {
      padding-top: 4px;
      ${({ theme }) => `
      color: ${theme.color.black80};
      font-size: ${theme.fontSize.medium};
      font-weight: ${theme.fontWeight.bold};
      `}
    }
  }

  img {
    width: 20px;
    height: 20px;
  }
`
