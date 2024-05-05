import { Route, Routes, useLocation } from 'react-router-dom'
import { lazy, useEffect, useState } from 'react'
import Layout from './Layout'
import { getLocalStorageItem } from '@/util/localStorage'

const Login = lazy(async () => await import('@/pages/Login/Login'))
const Home = lazy(async () => await import('@/pages/Home/Home'))
const Search = lazy(async () => await import('@/pages/Search/Search'))
const RegisterMeeting = lazy(
  async () => await import('@/pages/Meeting/RegisterMeeting')
)
const MeetingDetail = lazy(
  async () => await import('@/pages/MeetingDetail/MeetingDetail')
)
const Chat = lazy(async () => await import('@/pages/Chat/Chat'))
const Mypage = lazy(async () => await import('@/pages/Mypage/Mypage'))
const MeetingModify = lazy(
  async () => await import('@/pages/MeetingModify/MeetingModify')
)
const ErrorPage = lazy(async () => await import('./ErrorPage'))

function Router(): JSX.Element {
  const [isLogin, setIsLogin] = useState(
    Boolean(getLocalStorageItem('accessToken') as string)
  )
  const { pathname } = useLocation()

  useEffect(() => {
    const token: string = getLocalStorageItem('accessToken')
    setIsLogin(Boolean(token))
  }, [pathname])
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/login/:service" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route
          path="/meetings"
          element={!isLogin ? <ErrorPage /> : <RegisterMeeting />}
        />
        <Route path="/meetings/:meetingId" element={<MeetingDetail />} />
        <Route
          path="/meetings/:meetingId/modify"
          element={!isLogin ? <ErrorPage /> : <MeetingModify />}
        />
        <Route
          path="/meetings/:meetingId/chats"
          element={!isLogin ? <ErrorPage /> : <Chat />}
        />
        <Route path="/mypage" element={!isLogin ? <ErrorPage /> : <Mypage />} />
        <Route path="*" element={<ErrorPage isNotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default Router
