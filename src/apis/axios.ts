import axios, { type AxiosRequestConfig } from 'axios'
import { getLocalStorageItem, setLocalStorageItem } from '@/util/localStorage'

const BASE_URL = import.meta.env.VITE_SERVER_URL
const instance = axios.create({
  baseURL: BASE_URL,
})

const authInstance = axios.create({
  baseURL: BASE_URL,
})

authInstance.interceptors.request.use((config) => {
  const token = getLocalStorageItem('accessToken')
  if (token != null) {
    const authConfig = config
    authConfig.headers.Authorization = `Bearer ${token}`
  }
  return config
})

authInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest: AxiosRequestConfig<any> = error.config
    // Todo: '만료된' 조건 추가
    if (
      error.response.status === 401 &&
      Boolean(error.response.data.message.includes('만료된')) &&
      originalRequest.headers != null
    ) {
      try {
        const refreshToken = getLocalStorageItem('refreshToken')
        const { data } = await axios.post<{ data: string }>(
          `${BASE_URL}/api/auth/refresh`,
          {
            refreshToken,
          }
        )
        const accessToken = data.data.split(' ')[1]
        setLocalStorageItem('accessToken', accessToken)
        originalRequest.headers.Authorization = `Bearer ${accessToken}`
        return await axios(originalRequest)
      } catch (errors) {
        window.alert('로그인 갱신이 필요합니다. 다시 로그인 해주세요')
        console.log(errors)
        throw errors
      }
    }

    return await Promise.reject(error)
  }
)

export { instance, authInstance }
