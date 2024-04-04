import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { meetingKeys } from '@/constants/queryKeys'
import { getMeetingsBySearch } from '@/apis/meeting'
import {
  CardBox,
  ContentsBox,
  MeetingCard,
  SearchLayout,
  SectionBox,
  SubContentsBox,
  TagBox,
} from './styles'

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
