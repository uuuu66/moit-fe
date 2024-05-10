import { createContext, useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import { getLocalStorageItem } from '@/util/localStorage'
import { type UserInfo } from '@/type/user'

export const UserContext = createContext<UserInfo | null>(null)

export default function AuthProvider({
  children,
}: {
  children: JSX.Element
}): JSX.Element {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
  const location = useLocation()

  useEffect(() => {
    const token: string = getLocalStorageItem('accessToken')
    if (token !== null && userInfo === null) {
      const { sub, exp } = jwtDecode(token)
      if (typeof sub === 'string' && typeof exp === 'number')
        setUserInfo({ email: sub, exp })
    }
    if (token === null && userInfo !== null) {
      setUserInfo(null)
    }
  }, [location, userInfo])

  useEffect(() => {})
  return (
    <UserContext.Provider value={useMemo(() => userInfo, [userInfo])}>
      {children}
    </UserContext.Provider>
  )
}
