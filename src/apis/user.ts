import { type User, type Service } from '@/type/user'
import { instance } from './axios'
import { type CommonResponse } from '@/type/response'
import { getLocalStorageItem, setLocalStorageItem } from '@/util/localStorage'
import setRequestTokenSchedule from '@/util/setRequestTokenSchedule'

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

const resetAccessToken = async (): Promise<void> => {
  try {
    const refreshToken = getLocalStorageItem('refreshToken')
    const { data } = await instance.post<{ data: string }>(
      `/api/auth/refresh`,
      {
        refreshToken,
      }
    )
    const accessToken = data.data.split(' ')[1]
    setRequestTokenSchedule(accessToken)
    setLocalStorageItem('accessToken', accessToken)
  } catch (error) {
    window.alert('로그인 갱신이 필요합니다. 다시 로그인 해주세요')
    console.log(error)
    throw error
  }
}

const logout = (): void => {}

export { login, resetAccessToken, logout }
