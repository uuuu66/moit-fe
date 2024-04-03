import { type SecondRegions, type FirstRegions } from '@/type/filter'
import instance from './axios'
import { type CommonResponse } from '@/type/response'

const getFirstRegions = async <T = FirstRegions>(): Promise<T | []> => {
  try {
    const { data } = await instance.get<CommonResponse<T>>('/api/region/first')
    return data.data
  } catch (error) {
    console.log(error)
    return []
  }
}

const getSecondRegions = async <T = SecondRegions>(
  id: string
): Promise<T | []> => {
  try {
    const { data } = await instance.get<CommonResponse<T>>(
      `api/region/second?regionFirstId=${id}`
    )
    return data.data
  } catch (error) {
    console.log(error)
    return []
  }
}

export { getFirstRegions, getSecondRegions }
