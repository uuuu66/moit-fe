import { useQuery, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import {
  deleteBookMark,
  getConfirmBookMarked,
  postBookMark,
} from '@/apis/meeting'
import { getLocalStorageItem } from '@/util/localStorage'
import { meetingKeys } from '@/constants/queryKeys'

interface BookMarkProps {
  meetingId: number
}

export default function BookMark({ meetingId }: BookMarkProps): JSX.Element {
  const { data: bookMarked } = useQuery({
    queryKey: ['bookmark', { meetingId }],
    queryFn: async () => await getConfirmBookMarked(meetingId),
  })
  const queryClient = useQueryClient()
  const handleClickButton = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation()
    const token: string = getLocalStorageItem('accessToken')
    if (token === null) {
      window.alert('로그인 후 북마크 기능을 사용할 수 있습니다.')
      return
    }

    ;(bookMarked ? deleteBookMark(meetingId) : postBookMark(meetingId))
      .then(async () => {
        await queryClient.setQueryData(
          ['bookmark', { meetingId }],
          (status: boolean) => !status
        )
        await queryClient.invalidateQueries({
          queryKey: meetingKeys.myMeetings('bookmarked'),
        })
      })
      .catch(() => {})
  }
  return (
    <button type="button" onClick={handleClickButton}>
      {bookMarked ? (
        <img src="/assets/bookmarkSelected.svg" alt="bookmark" />
      ) : (
        <img src="/assets/bookmark.svg" alt="bookmark" />
      )}
    </button>
  )
}
