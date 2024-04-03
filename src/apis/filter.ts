import { type FirstRegions } from '@/type/filter'
import instance from './axios'
import { type CommonResponse } from '@/type/response'

const getWideRegion = async <T = FirstRegions>(): Promise<T | []> => {
  try {
    const { data } = await instance.get<CommonResponse<T>>('/api/region/first')
    return data.data
  } catch (error) {
    console.log(error)
    return []
  }
}

const getNarrowRegion = async (): Promise<string[]> => {
  const data: string[] = [
    '강남구',
    '강동구',
    '강북구',
    '강서구',
    '관악구',
    '광진구',
    '구로구',
    '금천구',
    '노원구',
    '도봉구',
    '동대문구',
    '동작구',
    '마포구',
    '서대문구',
    '서초구',
    '성동구',
  ]
  return data
}

export { getWideRegion, getNarrowRegion }
