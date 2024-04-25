import { useQueryClient } from '@tanstack/react-query'
import React, { useEffect, useRef, useState } from 'react'
import { deleteBookMark, postBookMark } from '@/apis/meeting'
import { getLocalStorageItem } from '@/util/localStorage'
import LoginModal from '@/components/modals/LoginModal'
import { meetingKeys } from '@/constants/queryKeys'
import { type MeetingDetailInfo } from '@/type/response'

interface BookMarkProps {
  meetingId: number
  prevBookmarked: boolean
}

export default function BookMark({
  meetingId,
  prevBookmarked,
}: BookMarkProps): JSX.Element {
  const [bookmarked, setBookmarked] = useState(prevBookmarked)
  const [onLoginModal, setOnLoginModal] = useState(false)
  const queryClient = useQueryClient()
  const ref = useRef(false)

  useEffect(() => {
    ref.current = bookmarked
  }, [bookmarked])

  useEffect(() => {
    return () => {
      if (ref.current !== prevBookmarked) {
        ;(prevBookmarked ? deleteBookMark(meetingId) : postBookMark(meetingId))
          .then(
            async () =>
              await Promise.all([
                queryClient.invalidateQueries({ queryKey: meetingKeys.all }),
                queryClient.setQueryData(
                  ['meetingListDetail', String(meetingId)],
                  (data: MeetingDetailInfo) => {
                    return { ...data, bookmarked: !data.bookmarked }
                  }
                ),
              ])
          )
          .catch(() => {})
      }
    }
  }, [prevBookmarked, meetingId, queryClient])

  const handleClickButton = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation()
    const token: string = getLocalStorageItem('accessToken')
    if (token === null) {
      setOnLoginModal(true)
      return
    }
    setBookmarked(!bookmarked)
  }

  return (
    <>
      <button type="button" onClick={handleClickButton}>
        {bookmarked ? (
          <img src="/assets/bookmarkSelected.svg" alt="bookmark" />
        ) : (
          <img src="/assets/bookmark.svg" alt="bookmark" />
        )}
      </button>
      {onLoginModal && (
        <LoginModal
          handleCloseModal={() => {
            setOnLoginModal(false)
          }}
        />
      )}
    </>
  )
}
