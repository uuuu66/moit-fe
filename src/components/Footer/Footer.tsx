import { Link, useLocation } from 'react-router-dom'
import { memo } from 'react'
import AddMeetingButton from '../meeting/AddMeetingButton/AddMeetingButton'
import { FooterLayout } from './styles'
import MypageButton from '../user/MypageButton/MypageButton'

export default memo(function Footer(): JSX.Element {
  const { pathname } = useLocation()
  return (
    <FooterLayout>
      <Link to="/">
        <img src="/assets/home.svg" alt="home" />
      </Link>
      <AddMeetingButton />
      <MypageButton />
    </FooterLayout>
  )
})
