import styled from 'styled-components'

export const MypageLayout = styled.div`
  height: 100%;
  display: grid;
  grid-template-rows: auto 3rem;
`
export const ContentsBox = styled.div`
  display: grid;
  grid-template-rows: auto auto 26.125rem;
  gap: 2.75rem;

  h2 {
    padding-top: 1rem;
    font-size: 1.25rem;
    font-weight: 600;
    text-align: center;
  }
`

export const ProfileBox = styled.div`
  padding: 0 1.25rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.75rem;
`

export const ImageBox = styled.div`
  width: 7.5rem;
  height: 7.5rem;
  border: 2px solid #667ae4;
  border-radius: 60px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 3rem;
  }
`

export const InfoCardBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`

export const InfoCard = styled.div`
  width: 6.5rem;
  height: 6.5rem;
  background: #e9e8e8;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  h3 {
    font-size: 0.875rem;
    font-weight: 600;
  }

  p {
    height: 1.25rem;
    font-size: 1.5rem;
    letter-spacing: -0.5px;
    font-weight: 700;
    width: 100%;
    position: relative;
    text-align: center;
  }

  span {
    padding: 0 1.125rem;
    font-size: 0.75rem;
    font-weight: 400;
    position: absolute;
    right: 0;
    bottom: 0;
  }
`

export const MeetingsBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.75rem;

  h3 {
    padding: 0 1.25rem;
    font-size: 1.25rem;
    font-weight: 600;
  }
`

export const MeetingCardBox = styled.div`
  height: 100%;
  overflow: auto;
`

export const MeetingCard = styled.div`
  padding: 0 1.25rem;
  display: flex;
  align-items: center;
  height: 4.25rem;
  border-bottom: 1px solid #dedede;

  &:hover {
    cursor: pointer;
  }

  p {
    font-size: 1rem;
    width: 100%;
  }

  img {
    width: 1.25rem;
  }
`
