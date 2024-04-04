import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import styled from 'styled-components'
import { meetingKeys } from '@/constants/queryKeys'
import { getMeetingsBySearch } from '@/apis/meeting'

export default function Search(): JSX.Element {
  const [searchText, setSearchText] = useState('')

  const { data: meetings } = useQuery({
    queryKey: meetingKeys.search(searchText),
    queryFn: async () => await getMeetingsBySearch(searchText),
    enabled: !(searchText.length === 0),
  })

  return (
    <SearchLayout>
      <div>
        <input />
        <button
          type="button"
          onClick={() => {
            setSearchText('test')
          }}
        >
          검색
        </button>
      </div>
      <SectionBox>
        <h1>내 주변 스터디 모임</h1>
        <CardBox>
          {meetings?.length != null &&
            meetings.map(
              ({
                meetingId,
                meetingName,
                skills,
                address,
                date,
                registeredCount,
                totalCount,
              }) => (
                <MeetingCard key={meetingId}>
                  <ContentsBox>
                    <h2>{meetingName}</h2>
                    <TagBox>
                      {skills.map((skill) => (
                        <p key={skill}>{skill}</p>
                      ))}
                    </TagBox>
                  </ContentsBox>
                  <hr />
                  <SubContentsBox>
                    <p>{address}</p>
                    <p>{date}</p>
                    <p>{`${registeredCount} / ${totalCount}`}</p>
                  </SubContentsBox>
                </MeetingCard>
              )
            )}
        </CardBox>
      </SectionBox>
    </SearchLayout>
  )
}

const SearchLayout = styled.div`
  width: 100%;
  height: 100%;
`
const SectionBox = styled.div`
  padding: 0 20px;

  h1 {
    margin-bottom: 20px;
    font-weight: 600;
  }
`
const CardBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  /* max-height: 300px; */ // Todo: 검색 바 크기에 따라 정해줄 것 (for 스크롤 적용)
  overflow: auto;
`
const MeetingCard = styled.div`
  width: 100%;
  padding: 20px;
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
  }
`

const TagBox = styled.div`
  display: flex;
  gap: 6px;
  font-size: 12px;

  p {
    padding: 6px 12px;
    background: #fff;
    border-radius: 25px;
  }
`

const SubContentsBox = styled.div`
  display: flex;
  justify-content: space-between;
  p {
    font-size: 12px;
  }
`
