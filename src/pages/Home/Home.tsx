import { Map } from 'react-kakao-maps-sdk'
import useMap from '@/hooks/useMap'
import Meetings from '@/components/meeting/Meetings/Meetings'
import MainLayout from './styles'

export default function Home(): JSX.Element {
  useMap()
  console.log(window.innerHeight)

  const meetings = [
    {
      meetingId: 1,

      meetingName: '코공모 (코딩 공부는 모여서) 모집합니다 오우예 씨몬',
      contents: 'test',
      address: '서울특별시 마포구 방울내로 123',
      registeredCount: 5,
      totalCount: 10,
      skills: ['react', 'spring', 'java', 'javascript', 'typescript'],
      date: '2024.03.30',
      startTime: '14:00',
      endTime: '16:00',
      locationLat: 37.123,
      locationLong: 128.123,
    },
    {
      meetingId: 2,
      meetingName: '마크업 스터디를 모집합니다.',
      contents: 'test',
      address: '서울특별시 강남구 방울내로 123',
      registeredCount: 1,
      totalCount: 5,
      skills: ['react', 'spring'],
      date: '2024.03.30',
      startTime: '14:00',
      endTime: '16:00',
      locationLat: 37.123,
      locationLong: 128.123,
    },
    {
      meetingId: 3,
      meetingName: '리액트 모임을 모집합니다.',
      contents: 'test',
      address: '서울특별시 마포구 방울내로 123',
      registeredCount: 3,
      totalCount: 10,
      skills: ['react', 'redux'],
      date: '2024.03.30',
      startTime: '14:00',
      endTime: '16:00',
      locationLat: 37.123,
      locationLong: 128.123,
    },
  ]

  return (
    <MainLayout>
      <Map
        center={{ lat: 37.5667, lng: 126.9784 }}
        style={{
          width: '100%',
          height: '100%',
        }}
        level={10}
        maxLevel={3}
        minLevel={11}
      />
      <Meetings meetings={meetings} />
    </MainLayout>
  )
}
