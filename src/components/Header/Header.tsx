import { useLocation, useNavigate } from 'react-router-dom'
import { HeaderContainer } from './styles'
import LoginButton from '../user/LoginButton/LoginButton'

function Header(): JSX.Element {
  const navi = useNavigate()
  const location = useLocation()
  const isHeaderRequired = location.pathname === '/'
  return (
    <HeaderContainer isShow={isHeaderRequired}>
      <button
        type="button"
        onClick={() => {
          navi('/')
        }}
      >
        LOGO
      </button>
      <button
        type="button"
        onClick={() => {
          navi('/search')
        }}
      >
        검색
      </button>
      <LoginButton />
    </HeaderContainer>
  )
}

export default Header
