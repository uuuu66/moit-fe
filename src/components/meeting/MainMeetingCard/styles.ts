import styled from 'styled-components'

const MainMeetingCardLayout = styled.div`
  width: 16.1875rem;
  height: 17.875rem;
  background: #ddd;
  border-radius: 2rem;
  padding: 1.375rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`
const SubContentsBox = styled.div`
  font-size: 0.75rem;
  display: flex;
  justify-content: space-between;

  p {
    padding: 0.125rem 0;
    height: 1.125rem;
  }
`

const DateBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`

const ContentsBox = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
  max-width: 11.25rem;
  word-break: keep-all;

  h2 {
    line-height: 1.7;
    font-size: 1rem;
    font-weight: 700;
    min-height: 3.375rem;
  }

  p {
    font-size: 0.875rem;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.6);
  }
`
const TagBox = styled.div`
  max-height: 3.75rem;
  display: flex;
  gap: 0.375rem;
  flex-wrap: wrap;
  overflow: hidden;

  p {
    padding: 0.375rem 0.75rem;
    height: 1.625rem;
    display: flex;
    align-items: center;
    border: 1px solid #7a7a7a;
    border-radius: 25px;

    font-size: 0.75rem;
  }

  span {
    padding-top: 0.125rem;
  }
`

export {
  MainMeetingCardLayout,
  SubContentsBox,
  DateBox,
  ContentsBox,
  TextBox,
  TagBox,
}
