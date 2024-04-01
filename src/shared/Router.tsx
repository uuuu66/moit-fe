import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../pages/Home/Home'

function Router(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
