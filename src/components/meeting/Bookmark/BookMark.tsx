import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React, { useState } from 'react'
import { getLocalStorageItem } from '@/util/localStorage'
import LoginModal from '@/components/modals/LoginModal'
import { userKeys } from '@/constants/queryKeys'
import { addBookMark, deleteBookMark, getBookmarks } from '@/apis/user'
import { type MyBookmarks } from '@/type/user'

interface BookMarkProps {
  meetingId: number
}

export default function BookMark({ meetingId }: BookMarkProps): JSX.Element {
  const [onLoginModal, setOnLoginModal] = useState(false)
  const token: boolean = getLocalStorageItem('accessToken')

  const { data: bookmarkedList } = useQuery({
    queryKey: userKeys.bookmarks,
    queryFn: async () => await getBookmarks(),
    enabled: !!token,
    refetchOnMount: false,
  })

  const bookmarked =
    (token && bookmarkedList?.bookmarkedMeetingIds.includes(meetingId)) ?? false

  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: bookmarked ? deleteBookMark : addBookMark,
    onSuccess: () => {
      queryClient.setQueryData(userKeys.bookmarks, (prev: MyBookmarks) => {
        const oldList = prev.bookmarkedMeetingIds
        return {
          ...prev,
          bookmarkedMeetingIds: bookmarked
            ? oldList.filter((id) => id !== meetingId)
            : [...oldList, meetingId],
        }
      })
    },
  })

  const handleClickButton = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation()

    if (!token) {
      setOnLoginModal(true)
      return
    }
    mutate(meetingId)
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
