import { type Service } from '../type/user'
import instance from './axios'

type Login = (code: string, service: Service) => any

const login: Login = async (code, service) => {
  try {
    const data = await instance.get(
      `/api/member/signin/${service}?code=${code}`
    )
    console.log(data)
    return data
  } catch (error) {
    console.log(error)
    throw error
  }
}

const logout = (): void => {}

export { login, logout }
