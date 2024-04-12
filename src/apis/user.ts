import {
  type User,
  type Service,
  type Profile,
  type MyMeeting,
} from '@/type/user'
import { authInstance, instance } from './axios'
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

const logout = async (): Promise<void> => {
  const refreshToken = getLocalStorageItem('refreshToken')
  try {
    await authInstance.post('/api/member/logout', { refreshToken })
  } catch (error) {
    console.log(error)
    throw error
  } finally {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
  }
}

const getProfile = async <T = Profile>(): Promise<T> => {
  try {
    const { data } =
      await authInstance.get<CommonResponse<T>>('/api/member/myinfo')
    return data.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

const getMyMeetings = async <T = MyMeeting[]>(): Promise<T> => {
  try {
    const { data } =
      await authInstance.get<CommonResponse<T>>('api/member/meeting')
    return data.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

export { login, resetAccessToken, logout, getProfile, getMyMeetings }
