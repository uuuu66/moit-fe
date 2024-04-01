import { type AxiosResponse } from 'axios'
import instance from './axios'

const login = async (code: string): Promise<AxiosResponse<any, any>> => {
  try {
    const data = await instance.get(`/?code=${code}`)
    console.log(data)
    return data
  } catch (error) {
    console.log(error)
    throw error
  }
}

const logout = (): void => {}

export { login, logout }
