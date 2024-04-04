import { Map } from 'react-kakao-maps-sdk'
import { useEffect, useState } from 'react'
import useMap from '@/hooks/useMap'
import Meetings from '@/components/meeting/Meetings/Meetings'
import { FilterBox, MainLayout } from './styles'
import Career from '@/components/common/Career/Career'
import TechStack from '@/components/common/TechStack/TechStack'
import Region from '@/components/common/Region/Region'
import { ModalBtn } from '@/components/common/FilterFrame/styles'

interface Center {
  lat: number
  lng: number
}

export default function Home(): JSX.Element {
  useMap()
  // 중심좌표: 초기값 - 로컬스토리지 > 유저좌표 > 서울시청(유저가 좌표 동의 x, get좌표 되지 않는 브라우저인 경우)
  const [center, setCenter] = useState<Center>({
    lat: 37.5667,
    lng: 126.9784,
  })

  // 로컬스토리지의 마지막 위치 setCenter
  const setLastLocation = (locationValue: string): void => {
    if (locationValue !== null) {
      const lastLocation = JSON.parse(locationValue)
      setCenter({
        lat: Number(lastLocation.lat),
        lng: Number(lastLocation.lng),
      })
    }
  }

  // 유저 초기 위치 setCenter
  const setUserLocation = (): void => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCenter(() => ({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }))
        },
        (error) => {
          console.log(error)
        }
      )
    }
  }

  useEffect(() => {
    const locationValue = localStorage.getItem('center')

    if (locationValue !== null) {
      setLastLocation(locationValue)
    } else {
      setUserLocation()
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('center', JSON.stringify(center))
  }, [center])

  const [isShow, setIsShow] = useState(false)

  return (
    <MainLayout>
      <Map
        center={center}
        style={{
          width: '100%',
          height: '100%',
        }}
        maxLevel={3}
        minLevel={11}
      />
      {/* <Meetings meetings={meetings} /> */}
      <FilterBox>
        <ModalBtn
          type="button"
          onClick={() => {
            setIsShow(true)
          }}
        >
          모임 지역
        </ModalBtn>
        {isShow && (
          <Region
            handleModalClose={() => {
              setIsShow(!isShow)
            }}
          />
        )}
        <TechStack />
        <Career />
      </FilterBox>
    </MainLayout>
  )
}
