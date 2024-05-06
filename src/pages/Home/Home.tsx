import { Circle, Map, MapMarker } from 'react-kakao-maps-sdk'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { throttle } from 'lodash'
import {
  FilterBox,
  HomeLayout,
  ResetSearchBox,
  ResetSearchButton,
  UserLocationButtonBox,
} from './styles'
import useScreenSize from '@/hooks/useScreenSize'
import { type GetMeeting, type Center } from '@/type/meeting'
import { getLocalStorageItem, setLocalStorageItem } from '@/util/localStorage'
import useUserLocation from '@/hooks/useUserLocation'
import LoadingPage from '@/shared/LoadingPage'
import { notify } from '@/components/Toast'
import { type FiltersKey, type Filters } from '@/type/filter'
import { meetingKeys } from '@/constants/queryKeys'
import { getMeetings } from '@/apis/meeting'
import ErrorPage from '@/shared/ErrorPage'
import HomeMeetingsPanel from '@/components/meeting/HomeMeetingsPanel/HomeMeetingsPanel'
import HomeSelectedMeetingPanel from '@/components/meeting/HomeMeetingsPanel/HomeSelectedMeetingPanel'
import Region from '@/components/filter/Region/Region'
import Career from '@/components/filter/Career/Career'
import TechStack from '@/components/filter/TechStack/TechStack'

const DEFAULT_CENTER = {
  lat: 37.5667,
  lng: 126.9784,
}

export default function Home(): JSX.Element {
  const mapRef = useRef<kakao.maps.Map | null>(null)
  const { screenHeight } = useScreenSize()
  const { setUserLocation, isLoading: isLocateLoading } = useUserLocation()
  const [filters, setFilters] = useState<Filters>({
    techStacks: getLocalStorageItem('techStacks') ?? [],
    careers: getLocalStorageItem('careers') ?? [],
    region: getLocalStorageItem('region') ?? [],
  })
  const userCenter = sessionStorage.getItem('userCenter')
  const userLocation = userCenter !== null ? JSON.parse(userCenter) : null

  const region = useMemo(() => filters.region, [filters.region])
  const careers = useMemo(() => filters.careers, [filters.careers])
  const techStacks = useMemo(() => filters.techStacks, [filters.techStacks])

  const setUserFirstLocation = (): Center => {
    const handleUserFirstLocation = (position: GeolocationPosition): void => {
      setCenter({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      })
      setLocalStorageItem('center', {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      })
      sessionStorage.setItem(
        'userCenter',
        JSON.stringify({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
      )
    }

    setUserLocation(handleUserFirstLocation)
    setLocalStorageItem('center', DEFAULT_CENTER)
    return DEFAULT_CENTER
  }

  const [center, setCenter] = useState<Center>(
    (getLocalStorageItem('center') as Center) ?? setUserFirstLocation()
  )

  const { data, fetchNextPage, isLoading, isError } = useInfiniteQuery({
    queryKey: meetingKeys.filter({ ...center, ...filters }),
    queryFn: async ({ pageParam }) => {
      return await getMeetings({ center, filters, pageParam })
    },
    getNextPageParam: (lastPage) => {
      if (!lastPage.isLast) return lastPage.nextPage
      return undefined
    },
    initialPageParam: 1,
  })

  const meetings = useMemo(() => {
    let list: GetMeeting[] = []
    data?.pages.forEach(({ result }) => (list = [...list, ...result]))
    return list
  }, [data])

  useEffect(() => {
    if (meetings.length === 0 && data !== undefined) {
      notify({ type: 'warning', text: '조회된 모임이 없습니다.' })
    }
  }, [data, meetings])

  const handleFetchPages = throttle(() => {
    void fetchNextPage()
  }, 3000)

  const resetMaptoUserLocation = (position: GeolocationPosition): void => {
    if (mapRef.current === null) return
    sessionStorage.setItem(
      'userCenter',
      JSON.stringify({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      })
    )
    mapRef.current.setCenter(
      new kakao.maps.LatLng(position.coords.latitude, position.coords.longitude)
    )
    mapRef.current.setLevel(7)
  }

  const setCurrentCenter = (): void => {
    const currentCenter = mapRef.current?.getCenter()
    if (currentCenter == null) return

    const resetRegionFilter = (): void => {
      if (
        Boolean(getLocalStorageItem('region')) &&
        (getLocalStorageItem('region') as number[]).length !== 0
      ) {
        notify({
          type: 'warning',
          text: '재조회 시 지역 필터는 초기화됩니다.',
        })
        setLocalStorageItem('region', [])
        setLocalStorageItem('firstRegion', '')
        setFilters({ ...filters, region: [] })
      }
    }

    resetRegionFilter()

    setCenter({
      lat: currentCenter.getLat(),
      lng: currentCenter.getLng(),
    })
    setLocalStorageItem('center', {
      lat: currentCenter.getLat(),
      lng: currentCenter.getLng(),
    })
  }

  const handleSetFilters = (key: FiltersKey, value: number[]): void => {
    setFilters((prev) => ({ ...prev, [key]: value }))
    setLocalStorageItem(key, value)
  }

  const handleSelectedFilters = useCallback(
    (filterName: FiltersKey, num: number[]) => {
      handleSetFilters(filterName, num)
    },
    []
  )

  const handleSelectedRegion = useCallback((currentCenter: Center) => {
    setCenter(currentCenter)
    setLocalStorageItem('center', currentCenter)
  }, [])

  const [selectedMeeting, setSelectedMeeting] = useState<GetMeeting | null>(
    null
  )

  const handleSelectedMeeting = (id: number): void => {
    const target = meetings.filter(({ meetingId }) => meetingId === Number(id))
    setSelectedMeeting(target[0])

    if (mapRef.current !== null) {
      mapRef.current.setCenter(
        new kakao.maps.LatLng(target[0].locationLat, target[0].locationLng)
      )
    }
  }

  const handleSelectMarker = (e: kakao.maps.Marker): void => {
    const selectedId = e.getTitle()
    handleSelectedMeeting(Number(selectedId))
  }

  const storageMeetingId = sessionStorage.getItem('selectedMeetingId')
  if (storageMeetingId !== null) {
    handleSelectedMeeting(Number(storageMeetingId))
    sessionStorage.removeItem('selectedMeetingId')
  }
  if (isError) return <ErrorPage />
  return (
    <HomeLayout>
      {isLoading && <LoadingPage name="페이지를" isFade />}
      {isLocateLoading && <LoadingPage name="내 위치를" isFade />}
      <FilterBox>
        <div className="scroll-box">
          <Region
            selectedFilters={region}
            handleSelectedFilters={handleSelectedFilters}
            handleSetCenter={handleSelectedRegion}
          />
          <Career
            selectedFilters={careers}
            handleSelectedFilters={handleSelectedFilters}
          />
          <TechStack
            selectedFilters={techStacks}
            handleSelectedFilters={handleSelectedFilters}
          />
        </div>
      </FilterBox>
      <UserLocationButtonBox>
        <button
          type="button"
          onClick={() => {
            setUserLocation(resetMaptoUserLocation)
          }}
        >
          <div>
            <img src="/assets/location.svg" alt="location" />
          </div>
        </button>
      </UserLocationButtonBox>
      <ResetSearchBox>
        <ResetSearchButton
          type="button"
          onClick={setCurrentCenter}
          $isShow={false}
        >
          <img src="/assets/reset.svg" alt="reset" />
          <p>현 지도에서 검색</p>
        </ResetSearchButton>
      </ResetSearchBox>
      <Map
        ref={mapRef}
        center={{
          lat: center.lat,
          lng: center.lng,
        }}
        style={{
          width: '100%',
          height: screenHeight < 932 ? `${screenHeight - 114}px` : '820px',
        }}
        level={8}
        maxLevel={3}
        minLevel={12}
      >
        {meetings?.map(({ meetingId, locationLat, locationLng }) => (
          <MapMarker
            key={meetingId}
            title={String(meetingId)}
            onClick={handleSelectMarker}
            image={{
              src:
                meetingId === selectedMeeting?.meetingId
                  ? '/assets/markerSelected.svg'
                  : '/assets/marker.svg',
              size: {
                width: meetingId === selectedMeeting?.meetingId ? 48 : 40,
                height: meetingId === selectedMeeting?.meetingId ? 48 : 40,
              },
            }}
            position={{ lat: locationLat, lng: locationLng }}
          />
        ))}
        {userLocation !== null && (
          <MapMarker
            image={{
              src: '/assets/userPin.svg',
              size: { width: 24, height: 24 },
            }}
            position={userLocation}
          />
        )}
        {!isLoading && (
          <Circle
            center={{ lat: center.lat, lng: center.lng }}
            radius={5000}
            strokeWeight={1}
            strokeColor="#FF3257"
            strokeOpacity={0.5}
            strokeStyle="dash"
            fillColor={meetings.length !== 0 ? '#667AE4' : '#FF3257'}
            fillOpacity={meetings.length !== 0 ? 0.2 : 0.2}
          />
        )}
      </Map>
      {meetings != null && (
        <HomeMeetingsPanel
          meetings={meetings}
          handleScrollEnd={handleFetchPages}
        />
      )}
      {selectedMeeting != null && (
        <HomeSelectedMeetingPanel
          meeting={selectedMeeting}
          handleClosePanel={() => {
            setSelectedMeeting(null)
          }}
        />
      )}
    </HomeLayout>
  )
}
