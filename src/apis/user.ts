import { type Profile, type Service } from '@/type/user'
import instance from './axios'
import { type CommonResponse } from '@/type/response'

type Login = (code: string, service: Service) => Promise<string>

const login: Login = async (code, service) => {
  try {
    const { data } = await instance.get(
      `/api/member/signin/${service}?code=${code}&env=${import.meta.env.PROD ? 'prod' : 'local'}`
    )
    return data
  } catch (error) {
    console.log(error)
    throw error
  }
}

const logout = (): void => {}

const getProfile = async <T = Profile>(): Promise<T> => {
  try {
    const { data } = await instance.get<CommonResponse<T>>('/api/member/myinfo')
    return data.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

export { login, logout, getProfile }
