import { useQuery, useQueryClient } from '@tanstack/react-query'
import {
  deleteBookMark,
  getConfirmBookMarked,
  postBookMark,
} from '@/apis/meeting'
import { getLocalStorageItem } from '@/util/localStorage'

interface BookMarkProps {
  meetingId: number
}

export default function BookMark({ meetingId }: BookMarkProps): JSX.Element {
  const { data: bookMarked } = useQuery({
    queryKey: ['bookmark', { meetingId }],
    queryFn: () => getConfirmBookMarked(meetingId),
  })
  const queryClient = useQueryClient()
  const handleClickButton = (): void => {
    const token: string = getLocalStorageItem('accessToken')
    if (token === null) {
      window.alert('로그인 후 북마크 기능을 사용할 수 있습니다.')
      return
    }
    ;(bookMarked ? deleteBookMark(meetingId) : postBookMark(meetingId))
      .then(async () => {
        await queryClient.setQueryData(
          ['bookmark', { meetingId }],
          (status) => !status
        )
      })
      .catch(() => {})
  }
  return (
    <button type="button" onClick={handleClickButton}>
      {bookMarked ? <p>북마크 취소</p> : <p>북마크 하기</p>}
    </button>
  )
}
