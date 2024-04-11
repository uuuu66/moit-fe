import { type User, type Service, type Profile } from '@/type/user'
import { instance } from './axios'
import { type CommonResponse } from '@/type/response'

const login = async (code: string, service: Service): Promise<User> => {
  try {
    const { data } = await instance.get<CommonResponse<User>>(
      `/api/member/signin/${service}?code=${code}&env=${import.meta.env.PROD ? 'prod' : 'local'}`
    )
    return data.data
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
