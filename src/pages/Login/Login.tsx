import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { type Service } from '@/type/user'
import { login } from '@/apis/user'
import { setLocalStorageItem } from '@/util/localStorage'
import setRequestTokenSchedule from '@/util/setRequestTokenSchedule'
import LoadingPage from '@/shared/LoadingPage'

export default function Login(): JSX.Element {
  const { service } = useParams()
  const authCode = window.location.search.split('code=')[1]

  const navigate = useNavigate()

  useEffect(() => {
    login(authCode, service as Service)
      .then((data) => {
        const accessToken = data.accessToken.split(' ')[1]
        setRequestTokenSchedule(accessToken)
        setLocalStorageItem('accessToken', accessToken)
        setLocalStorageItem('refreshToken', data.refreshToken)
        const lastPath = sessionStorage.getItem('loginPage')

        lastPath !== null && lastPath !== '/'
          ? navigate(lastPath)
          : navigate('/')
      })
      .catch((error) => {
        console.log(error)
        navigate('/')
      })
      .finally(() => {
        sessionStorage.removeItem('loginPage')
      })
  }, [authCode, service, navigate])

  return <LoadingPage name="회원정보를" />
}
