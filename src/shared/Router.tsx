import {
  type Location,
  type PathRouteProps,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom'
import { lazy, useEffect, useState } from 'react'
import { getLocalStorageItem } from '@/util/localStorage'
import MeetingDetail from '@/pages/MeetingDetail/MeetingDetail'
import Home from '@/pages/Home/Home'
import type strings from '@/constants/strings'

interface Props {
  location: Location
}
interface RouteInfo extends PathRouteProps {
  transitionType: keyof typeof strings.pageTransitionTypes | null
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
    transitionType: null,
  },
  {
    path: '/',
    element: <Home />,
    transitionType: null,
  },
  {
    path: '/search',
    element: <Search />,
    transitionType: null,
  },
  {
    path: '/meetings',
    element: <RegisterMeeting />,
    transitionType: 'slide-left-navigate',
  },
  {
    path: '/meetings/:meetingId',
    element: <MeetingDetail />,
    transitionType: null,
  },
  {
    path: '/meetings/:meetingId/modify',
    element: <MeetingModify />,
    transitionType: null,
  },
  {
    path: '/meetings/:meetingId/chats',
    element: <Chat />,
    transitionType: null,
  },
  {
    path: '/mypage',
    element: <Mypage />,
    transitionType: null,
  },
  {
    path: '*',
    element: <Home />,
    transitionType: null,
  },
]
function Router({ location }: Props): JSX.Element {
  const [isLogin, setIsLogin] = useState(
    Boolean(getLocalStorageItem('accessToken') as string)
  )

  useEffect(() => {
    const token: string = getLocalStorageItem('accessToken')
    setIsLogin(Boolean(token))
  }, [location.pathname])
  return (
    <Routes location={location}>
      {routeInfos.map((routeInfo) => (
        <Route key={routeInfo.path} {...routeInfo} />
      ))}
    </Routes>
  )
}

export default Router
