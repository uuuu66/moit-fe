import { Link, useLocation } from 'react-router-dom'
import { ButtonBox, HeaderContainer } from './styles'
import LoginButton from '../user/LoginButton/LoginButton'

function Header(): JSX.Element {
  const location = useLocation()
  const isHeaderRequired = location.pathname === '/'

  return (
    <HeaderContainer $isShow={isHeaderRequired}>
      <Link to="/">
        <img src="/assets/logoHeader.svg" alt="logo" />
      </Link>
      <ButtonBox>
        <Link to="/search">
          <img src="/assets/search.svg" alt="search" />
        </Link>
        <LoginButton />
      </ButtonBox>
    </HeaderContainer>
  )
}

export default Header
