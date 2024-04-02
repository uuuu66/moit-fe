import { useEffect, useState } from 'react'
import { Loader } from 'react-kakao-maps-sdk'

export default function useMap(): { map: typeof kakao.maps | null } {
  const [map, setMap] = useState<typeof kakao.maps | null>(null)

  const loadMap = async (): Promise<void> => {
    try {
      const { maps } = await new Loader({
        appkey: import.meta.env.VITE_KAKAO_MAP_API_ID,
        libraries: ['services'],
      }).load()
      setMap(maps)
    } catch (error) {
      console.log(error)
      //  맵 불러오지 못할 경우 예외처리
    }
  }

  useEffect(() => {
    loadMap().catch((error) => {
      console.log(error)
    })
  }, [])

  return { map }
}
