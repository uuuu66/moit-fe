import axios, { type AxiosResponse } from 'axios'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const login = async (code: string): Promise<AxiosResponse<any, any>> => {
  const apiUrl = ''
  try {
    const data = await axios.post(apiUrl, { code })
    console.log(data)
    return data
  } catch (error) {
    console.log(error)

    throw error
  }
}

export default function Login(): JSX.Element {
  const authCode = window.location.search.split('=')[1]
  const navigate = useNavigate()

  useEffect(() => {
    login(authCode)
      .then((data) => {
        console.log(data)
        // 로그인 정보 저장
        // navigate('/')
      })
      .catch((error) => {
        console.log(error)
        throw error // 로그인 실패 예외 처리?
      })
    //   .finally(() => {
    //     navigate('/')
    //   })
  }, [authCode, navigate])

  return <div>Login</div>
}
