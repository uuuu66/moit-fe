import axios from 'axios'
import { getLocalStorageItem } from '@/util/localStorage'

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

export { instance, authInstance }
