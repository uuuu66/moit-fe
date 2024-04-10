import { type GetMeeting, type Center } from '@/type/meeting'
import instance from './axios'
import {
  type MeetingDetailInfo,
  type PaginationReturn,
  type PaginationResponse,
} from '@/type/response'
import { type Info } from '@/pages/Meeting/RegisterMeeting'
import { type Filters } from '@/type/filter'

interface GetMeetingParams {
  center: Center
  filters: Filters
  pageParam: number
}

const getMeetings = async <T = GetMeeting[]>({
  center,
  filters,
  pageParam,
}: GetMeetingParams): Promise<PaginationReturn<T>> => {
  const stackQuery =
    filters.techStacks.length > 0
      ? filters.techStacks.map((id) => `skillId=${id}&`).join('')
      : ''

  const filterQuery =
    filters.careers.length > 0
      ? filters.careers.map((id) => `careerId=${id}&`).join('')
      : ''
  try {
    const res = await instance.get<PaginationResponse<T>>(
      `/api/meetings?locationLat=${center.lat}&locationLng=${center.lng}&${stackQuery}${filterQuery}page=${pageParam}`
    )
    const { data } = res.data
    return {
      result: data.content,
      nextPage: pageParam + 1,
      isLast: data.last,
    }
  } catch (error) {
    console.log(error)
    throw error
  }
}

interface GetMeetingBySearchParams {
  text: string
  pageParam: number
}

const getMeetingsBySearch = async <T = GetMeeting[]>({
  text,
  pageParam,
}: GetMeetingBySearchParams): Promise<PaginationReturn<T>> => {
  try {
    const res = await instance.get<PaginationResponse<T>>(
      `api/meetings/search?keyword=${text}&page=${pageParam}`
    )
    const { data } = res.data
    return {
      result: data.content,
      nextPage: pageParam + 1,
      isLast: data.last,
    }
  } catch (error) {
    console.log(error)
    throw error
  }
}

const postMeetingData = async (newMeetingData: Info): Promise<void> => {
  try {
    await instance.post(`/api/meetings`, newMeetingData, {
      headers: {
        Authorization: `Bearer `, // TODO : 헤더에 토큰 넣어야함
      },
    })
  } catch (error) {
    console.log(error)
    throw error
  }
}

const getMeetingDetail = async (
  meetingId: number
): Promise<MeetingDetailInfo> => {
  try {
    const { data } = await instance.get(`/api/meetings/meetings/${meetingId}`)
    return data.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

const postMeetingSub = async (meetingId: number): Promise<void> => {
  try {
    await instance.post(`api/meetings/my-meetings/${meetingId}`, null, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJya2R0amR3bC01QGhhbm1haWwubmV0IiwiYXV0aCI6IlVTRVIiLCJleHAiOjE3MTU5MjU2NTQsImlhdCI6MTcxMjMyNTY1NH0.YL6N05jfWxrIfV07ko4qc6WtiCtTEC6PhNiL0gqRNz0`,
      },
    })
  } catch (error) {
    console.log(error)
    throw error
  }
}

const deleteMeeting = async (meetingId: number): Promise<void> => {
  try {
    await instance.delete(`api/meetings/${meetingId}`)
  } catch (error) {
    console.log(error)
    throw error
  }
}

export {
  getMeetings,
  getMeetingsBySearch,
  postMeetingData,
  getMeetingDetail,
  postMeetingSub,
  deleteMeeting,
}
