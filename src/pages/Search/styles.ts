import styled from 'styled-components'

const SearchLayout = styled.div`
  width: 100%;
  height: 100%;
`
const SectionBox = styled.div`
  padding: 0 1.25rem;

  h1 {
    margin-bottom: 1.25rem;
    font-weight: 600;
  }
`
const CardBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  /* max-height: 300px; */ // Todo: 검색 바 크기에 따라 정해줄 것 (for 스크롤 적용)
  overflow: auto;
`
const MeetingCard = styled.div`
  width: 100%;
  padding: 1.25rem;
  border-radius: 12px;
  background: #e7e4e4;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  hr {
    width: 100%;
  }
`
const ContentsBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  h2 {
    font-weight: 700;
    word-break: keep-all;
  }
`

const TagBox = styled.div`
  display: flex;
  gap: 0.375rem;
  font-size: 0.75rem;

  p {
    padding: 0.375rem 0.75rem;
    background: #fff;
    border-radius: 25px;
  }
`

const SubContentsBox = styled.div`
  display: flex;
  justify-content: space-between;
  p {
    font-size: 0.75rem;
  }
`

export {
  SearchLayout,
  SectionBox,
  CardBox,
  MeetingCard,
  ContentsBox,
  TagBox,
  SubContentsBox,
}
