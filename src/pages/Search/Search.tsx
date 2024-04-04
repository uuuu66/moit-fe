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
      <CardSection>
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
                  <TitleBox>
                    <h2>{meetingName}</h2>
                  </TitleBox>
                  <TagBox>
                    {skills.map((skill) => (
                      <p key={skill}>{skill}</p>
                    ))}
                  </TagBox>
                  <SubTextBox>
                    <p>{address}</p>
                    <p>{date}</p>
                    <p>{`${registeredCount} / ${totalCount}`}</p>
                  </SubTextBox>
                </MeetingCard>
              )
            )}
        </CardBox>
      </CardSection>
    </SearchLayout>
  )
}

const SearchLayout = styled.div`
  width: 100%;
  height: 100%;
`
const CardSection = styled.div`
  background: #eee;
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
`

const MeetingCard = styled.div`
  width: 100%;
  padding: 8px;
  border-radius: 12px;
  background: #e7e4e4;
`

const TitleBox = styled.div``

const TagBox = styled.div`
  display: flex;
  gap: 6px;
  font-size: 12px;
`

const SubTextBox = styled.div`
  display: flex;
  justify-content: space-between;
  p {
    font-size: 12px;
  }
`
