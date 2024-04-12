import { jwtDecode } from 'jwt-decode'
import { resetAccessToken } from '@/apis/user'

function getRequestTokenTime(token: string): number {
  const tokenExpiredAt = jwtDecode(token).exp
  if (tokenExpiredAt == null) return 0

  const currentTime = Date.now() / 1000
  const LEAD_SECONDS = 0

  return (tokenExpiredAt - currentTime - LEAD_SECONDS) * 1000
}

export default function setRequestTokenSchedule(token: string): void {
  const delayInMilliSeconds = getRequestTokenTime(token)

  if (delayInMilliSeconds > 0) {
    setTimeout(() => {
      resetAccessToken().catch(() => {})
    }, delayInMilliSeconds)
  } else {
    resetAccessToken().catch(() => {})
  }
}
