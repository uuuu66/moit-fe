import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { login } from '../../apis/user'
import { type Service } from '../../type/user'

export default function Login(): JSX.Element {
  const { service } = useParams()
  const authCode = window.location.search.split('code=')[1]
  console.log(authCode)
  //  네이버로그인 : state 같이 보내야 하는지 확인
  const navigate = useNavigate()

  useEffect(() => {
    login(authCode, service as Service)
      .then((data: any) => {
        console.log(data)
        // 로그인 정보 저장
      })
      .catch((error: any) => {
        console.log(error)
        // 에러일 경우 모달 ?
      })
      .finally(() => {
        // navigate('/')
      })
  }, [authCode, service, navigate])

  return <div>Login</div>
}
