import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../../apis/user'

export default function Login(): JSX.Element {
  const authCode = window.location.search.split('code=')[1]
  console.log(authCode)
  //  네이버로그인 : state 같이 보내야 하는지 확인
  const navigate = useNavigate()

  useEffect(() => {
    login(authCode)
      .then((data) => {
        console.log(data)
        // 로그인 정보 저장
      })
      .catch((error) => {
        console.log(error)
        // 에러일 경우 모달 ?
      })
    //   .finally(() => {
    //     navigate('/')
    //   })
  }, [authCode])

  return <div>Login</div>
}
