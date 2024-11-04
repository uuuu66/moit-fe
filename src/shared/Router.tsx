import {
  type PathRouteProps,
  Route,
  RouteProps,
  Routes,
  useLocation,
} from 'react-router-dom'
import { lazy, useEffect, useState } from 'react'
import { getLocalStorageItem } from '@/util/localStorage'
import MeetingDetail from '@/pages/MeetingDetail/MeetingDetail'
import Home from '@/pages/Home/Home'
import type strings from '@/constants/strings'

interface RouteInfo extends PathRouteProps {
  transitionType?: keyof typeof strings.pageTransitionTypes
}
const Login = lazy(async () => await import('@/pages/Login/Login'))
const Search = lazy(async () => await import('@/pages/Search/Search'))
const RegisterMeeting = lazy(
  async () => await import('@/pages/Meeting/RegisterMeeting')
)

const Chat = lazy(async () => await import('@/pages/Chat/Chat'))
const Mypage = lazy(async () => await import('@/pages/Mypage/Mypage'))
const MeetingModify = lazy(
  async () => await import('@/pages/MeetingModify/MeetingModify')
)

export const routeInfos: RouteInfo[] = [
  {
    path: '/login/:service',
    element: <Login />,
  },
  {
    path: '/',
    element: <Home />,
    transitionType: 'fade-right-navigate',
  },
  {
    path: '/search',
    element: <Search />,
  },
  {
    path: '/meetings',
    element: <RegisterMeeting />,
    transitionType: 'slide-left-navigate',
  },
  {
    path: '/meetings/:meetingId',
    element: <MeetingDetail />,
  },
  {
    path: '/meetings/:meetingId/modify',
    element: <MeetingModify />,
  },
  {
    path: '/meetings/:meetingId/chats',
    element: <Chat />,
  },
  {
    path: '/mypage',
    element: <Mypage />,
    transitionType: 'fade-in',
  },
  {
    path: '*',
    element: <Home />,
  },
]
function Router({ pathname }: { pathname: string }): JSX.Element {
  const [isLogin, setIsLogin] = useState(
    Boolean(getLocalStorageItem('accessToken') as string)
  )
  const location = useLocation()

  useEffect(() => {
    const token: string = getLocalStorageItem('accessToken')
    setIsLogin(Boolean(token))
  }, [location.pathname])
  return (
    <Routes location={pathname}>
      {routeInfos.map((routeInfo) => (
        <Route key={routeInfo.path} {...routeInfo} />
      ))}
    </Routes>
  )
}

export default Router
