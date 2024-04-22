import { BrowserRouter, Route, Routes } from 'react-router-dom'
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
  const token: string = getLocalStorageItem('accessToken')
  const isAuthenticated = token != null && token.length !== 0

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/login/:service" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route
            path="/meetings"
            element={isAuthenticated ? <RegisterMeeting /> : <ErrorPage />}
          />
          <Route path="/meetings/:meetingId" element={<MeetingDetail />} />
          <Route
            path="/meetings/:meetingId/modify"
            element={isAuthenticated ? <MeetingModify /> : <ErrorPage />}
          />
          <Route
            path="/meetings/:meetingId/chats"
            element={isAuthenticated ? <Chat /> : <ErrorPage />}
          />
          <Route
            path="/mypage"
            element={isAuthenticated ? <Mypage /> : <ErrorPage />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router
