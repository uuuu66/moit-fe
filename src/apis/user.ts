import { type User, type Service } from '@/type/user'
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

export { login, logout }
