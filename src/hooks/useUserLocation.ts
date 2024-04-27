import { useState } from 'react'
import { notify } from '@/components/Toast'

interface UserLocationReturn {
  setUserLocation: (callback: PositionCallback) => void
  isLoading: boolean
}

export default function useUserLocation(): UserLocationReturn {
  const [isLoading, setIsLoading] = useState(false)
  const options = {
    enableHighAccuracy: false,
    timeout: 5000,
    maximumAge: Infinity,
  }

  const setUserLocation = (callback: PositionCallback): void => {
    if ('geolocation' in navigator) {
      setIsLoading(true)
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          setIsLoading(false)
          callback(position)
        },
        (error) => {
          console.log(error)
          setIsLoading(false)
          if (error.code === 1)
            notify({
              type: 'warning',
              text: '브라우저 설정에서 사용자 위치 확인 허용 시 내 위치 확인이 가능합니다',
            })
        },
        options
      )
    }
  }

  return { setUserLocation, isLoading }
}
