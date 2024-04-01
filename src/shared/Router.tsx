import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '@/pages/Home/Home'
import Login from '@/pages/Login/Login'

function Router(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login/:service" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
