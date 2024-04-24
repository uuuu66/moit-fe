import styled from 'styled-components'

export const MyMeetingsLayout = styled.div`
  padding: 28px 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: ${({ theme }) => theme.color.pg1};
`

export const BookmarkedMeetingsLayout = styled(MyMeetingsLayout)`
  background: unset;
  padding-bottom: 0;
`

export const ButtonBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  .button-flex-box {
    display: flex;
    gap: 12px;

    button {
      padding: 6px 12px;
      border-radius: 20px;
      ${({ theme }) => `
      background:${theme.color.black20};
      color:${theme.color.black60};
      font-size: ${theme.fontSize.small};
      font-weight: ${theme.fontWeight.normal};    
      `}
    }

    .tab-active-button {
      ${({ theme }) => `
      background: ${theme.color.primary100};
      color: ${theme.color.white};
      }`}
    }
  }

  .tab-toggle-button {
    ${({ theme }) => `
    color:${theme.color.black40};
    font-size: ${theme.fontSize.small};
    font-weight: ${theme.fontWeight.light};    
    `}
  }
`
