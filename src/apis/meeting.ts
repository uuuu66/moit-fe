import { type GetMeeting, type Center } from '@/type/meeting'
import { instance, authInstance } from './axios'
import {
  type MeetingDetailInfo,
  type PaginationReturn,
  type PaginationResponse,
} from '@/type/response'
import { type Info } from '@/pages/Meeting/RegisterMeeting'
import { type Filters } from '@/type/filter'
import { type EditMeetingReq } from '@/type/request'
import { getLocalStorageItem } from '@/util/localStorage'
import { type ChatMessage } from '@/type/chat'

interface GetMeetingParams {
  center: Center
  filters: Filters
  pageParam: number
}
interface GetChatsParams {
  meetingId: number
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
    await authInstance.post(`/api/meetings`, newMeetingData)
  } catch (error) {
    console.log(error)
    throw error
  }
}

const token: boolean = getLocalStorageItem('accessToken')
// 상세조회
const getMeetingDetail = async (
  meetingId: number
): Promise<MeetingDetailInfo> => {
  try {
    // 토큰 유무 분리
    const { data } = token
      ? await authInstance.get(`/api/meetings/${meetingId}`)
      : await instance.get(`/api/meetings/${meetingId}`)
    return data.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

const postMeetingSub = async (meetingId: number): Promise<void> => {
  try {
    await authInstance.post(`api/meetings/my-meetings/${meetingId}`)
  } catch (error) {
    console.log(error)
    throw error
  }
}

const deleteMeeting = async (meetingId: number): Promise<void> => {
  try {
    await authInstance.delete(`api/meetings/${meetingId}`)
  } catch (error) {
    console.log(error)
    throw error
  }
}

const editMeeting = async (
  meetingId: number,
  updatedMeeting: EditMeetingReq
): Promise<void> => {
  try {
    await authInstance.put(`api/meetings/${meetingId}`, updatedMeeting)
  } catch (error) {
    console.log(error)
    throw error
  }
}

const deleteMeetingWithdraw = async (meetingId: number): Promise<void> => {
  try {
    await authInstance.delete(`api/meetings/${meetingId}/signout`)
  } catch (error) {
    console.log(error)
    throw error
  }
}

const getChatMsg = async <T = ChatMessage[]>({
  meetingId,
  pageParam,
}: GetChatsParams): Promise<PaginationReturn<T>> => {
  try {
    const res = await authInstance.get(
      `api/meetings/${meetingId}/chats?page=${pageParam}`
    )
    const { data } = res.data
    const chats = data?.chats
    return {
      result: chats.content,
      nextPage: pageParam + 1,
      isLast: chats.last,
    }
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
  editMeeting,
  deleteMeetingWithdraw,
  getChatMsg,
}
