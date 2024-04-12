import { useEffect } from 'react'
import { getLocalStorageItem } from '@/util/localStorage'
import setRequestTokenSchedule from '@/util/setRequestTokenSchedule'

export default function useResetToken(): null {
  const accessToken: string | null = getLocalStorageItem('accessToken')

  useEffect(() => {
    if (accessToken == null || accessToken.length === 0) return

    setRequestTokenSchedule(accessToken)
  }, [accessToken])
  return null
}
