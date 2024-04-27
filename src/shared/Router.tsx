import { Route, Routes, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Home from '@/pages/Home/Home'
import Login from '@/pages/Login/Login'
import Layout from './Layout'
import Search from '@/pages/Search/Search'
import RegisterMeeting from '@/pages/Meeting/RegisterMeeting'
import MeetingDetail from '@/pages/MeetingDetail/MeetingDetail'
import Chat from '@/pages/Chat/Chat'
import Mypage from '@/pages/Mypage/Mypage'
import MeetingModify from '@/pages/MeetingModify/MeetingModify'
import { getLocalStorageItem } from '@/util/localStorage'
import ErrorPage from './ErrorPage'

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
      </Route>
    </Routes>
  )
}

export default Router
