import { useQueryClient } from '@tanstack/react-query'
import React, { useState } from 'react'
import { deleteBookMark, postBookMark } from '@/apis/meeting'
import { getLocalStorageItem } from '@/util/localStorage'
import LoginModal from '@/components/modals/LoginModal'

interface BookMarkProps {
  meetingId: number
  bookmarked: boolean
}

export default function BookMark({
  meetingId,
  bookmarked,
}: BookMarkProps): JSX.Element {
  const queryClient = useQueryClient()
  const [onLoginModal, setOnLoginModal] = useState(false)

  const handleClickButton = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation()
    const token: string = getLocalStorageItem('accessToken')
    if (token === null) {
      setOnLoginModal(true)
      return
    }

    ;(bookmarked ? deleteBookMark(meetingId) : postBookMark(meetingId))
      .then(async () => {
        // await queryClient.setQueryData(
        //   userKeys.bookmark(meetingId),
        //   (status: boolean) => !status
        // )
      })
      .catch(() => {})
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
