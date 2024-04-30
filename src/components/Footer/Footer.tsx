import { Link } from 'react-router-dom'
import { memo } from 'react'
import AddMeetingButton from '../meeting/AddMeetingButton/AddMeetingButton'
import { FooterLayout } from './styles'
import MypageButton from '../user/MypageButton/MypageButton'

export default memo(function Footer(): JSX.Element {
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
