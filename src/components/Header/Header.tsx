import { Link, useLocation } from 'react-router-dom'
import { memo } from 'react'
import { ButtonBox, HeaderContainer } from './styles'
import LoginButton from '../user/LoginButton/LoginButton'
import { instance } from '@/apis/axios'

const test = async (): Promise<void> => {
  console.log('=== refresh test start ===')
  try {
    const res = await instance.get(`/api/auth/refresh/test`, {
      withCredentials: true,
    })
    console.log(res)
  } catch (error) {
    console.log(error)
  } finally {
    console.log('=== refresh test end ===')
  }
}

export default memo(function Header(): JSX.Element {
  const location = useLocation()
  const isHeaderRequired = location.pathname === '/'

  return (
    <HeaderContainer $isShow={isHeaderRequired}>
      <Link to="/">
        <img src="/assets/logoHeader.svg" alt="logo" />
      </Link>
      <ButtonBox>
        <button
          style={{ background: 'lightgray', padding: '4px' }}
          type="button"
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onClick={test}
        >
          리프레시 테스트
        </button>
        <Link to="/search">
          <img src="/assets/search.svg" alt="search" />
        </Link>
        <LoginButton />
      </ButtonBox>
    </HeaderContainer>
  )
})
