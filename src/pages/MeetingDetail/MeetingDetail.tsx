/* eslint-disable no-nested-ternary */
import { Map, MapMarker } from 'react-kakao-maps-sdk'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { Suspense, useContext, useState } from 'react'
import DetailHeader from '@/components/DetailHeader/DetailHeader'
import {
  BasicInfoBox,
  Box,
  Box1,
  CareerTag,
  DetailButtonContainer,
  DetailInfoContainer,
  DetailInfoTitle,
  DetailWholeContainer,
} from './styles'
import {
  deleteMeeting,
  deleteMeetingWithdraw,
  getMeetingDetail,
  postMeetingSub,
} from '@/apis/meeting'
import JoinMeetingButton from '@/components/meeting/JoinMeetingButton/JoinMeetingButton'
import CommonButton from '@/components/common/Button/CommonButton'
import BookMark from '@/components/meeting/Bookmark/BookMark'
import { notify } from '@/components/Toast'
import AlertModal from '@/components/modals/AlertModal'
import { meetingKeys, userKeys } from '@/constants/queryKeys'
import { UserContext } from '@/shared/AuthProvider'
import { getLocalStorageItem } from '@/util/localStorage'

function MeetingDetail(): JSX.Element {
  const queryClient = useQueryClient()
  const navi = useNavigate()
  const { meetingId } = useParams()
  const userInfo = useContext(UserContext)

  const [onWithdrawModal, setOnWithdrawModal] = useState(false)
  const [onDeleteModal, setOnDeleteModal] = useState(false)

  const { data, isLoading, isError } = useQuery({
    queryKey: meetingKeys.detail(meetingId),
    queryFn: async () => await getMeetingDetail(Number(meetingId)),
  })

  const postSubMutation = useMutation({
    mutationFn: async () => {
      await postMeetingSub(Number(meetingId))
    },
    onSuccess: () => {
      notify({
        type: 'success',
        text: '모임 참여가 완료되었습니다.',
      })
      navi(`/meetings/${meetingId}/chats`, { replace: true })
      // TODO 참여 : (미팅리스트, 미팅상세), 프로필
      void queryClient.refetchQueries({ queryKey: meetingKeys.all })
      void queryClient.invalidateQueries({ queryKey: userKeys.profile })
    },
    onError: (error) => {
      console.log('error', error)
    },
  })

  const withdrawMutation = useMutation({
    mutationFn: async () => {
      await deleteMeetingWithdraw(Number(meetingId))
    },
    onSuccess: () => {
      notify({
        type: 'default',
        text: '모임에서 탈퇴하였습니다.',
      })
      // TODO 탈퇴 : (미팅리스트, 미팅상세), (프로필)
      void queryClient.refetchQueries({ queryKey: meetingKeys.all })
      void queryClient.invalidateQueries({ queryKey: userKeys.profile })
    },
    onError: (error) => {
      console.log('error', error)
    },
  })

  const deleteMutation = useMutation({
    mutationFn: async () => {
      await deleteMeeting(Number(meetingId))
    },
    onSuccess: () => {
      // TODO 삭제 : (미팅리스트), (프로필)
      void queryClient.invalidateQueries({ queryKey: meetingKeys.lists })
      void queryClient.invalidateQueries({ queryKey: userKeys.profile })
      sessionStorage.removeItem('selectedMeetingId')
      notify({
        type: 'default',
        text: '모임이 삭제 되었습니다.',
      })
      navi('/')
    },
    onError: (error) => {
      console.log('error', error)
    },
  })

  const handleMeetingSubClick = (): void => {
    postSubMutation.mutate()
  }

  const withdrawMeetingClick = (): void => {
    withdrawMutation.mutate()
  }

  const deleteMeetingClick = (): void => {
    deleteMutation.mutate()
  }

  const isFull = data?.totalCount === data?.registeredCount

  // if (isLoading) return <LoadingPage name="페이지를" />
  // if (isError) return <ErrorPage />

  return (
    <DetailWholeContainer>
      {/* <Toast /> */}
      {/* 헤더 */}

      <DetailHeader meetingId={Number(meetingId)} />
      <DetailInfoContainer>
        {/* 1 */}
        <Box>
          <h1>
            <span>{data?.meetingName}</span>
          </h1>

          <div className="userInfo">
            <img src="/assets/userProfile.svg" alt="userProfile" />
            <div>{data?.creatorName}</div>
          </div>
          <div className="tagbox">
            {data?.careerNameList.map((e: string) => (
              <CareerTag key={e}>{e}</CareerTag>
            ))}
            {data?.skillNameList.map((e: string) => (
              <CareerTag key={e}>{e}</CareerTag>
            ))}
          </div>
        </Box>
        {/* 2 */}
        <Box1>
          <BasicInfoBox>
            <img src="/assets/detailClock.svg" alt="" />
            <div className="info">
              <span>일정</span>
              <span>
                {data?.meetingDate} &nbsp;
                {data?.meetingStartTime} - {data?.meetingEndTime}
              </span>
            </div>
          </BasicInfoBox>
          <BasicInfoBox>
            <img src="/assets/detailLocation.svg" alt="" />
            <div className="info">
              <span>상세주소</span>
              <span>{data?.locationAddress}</span>
            </div>
          </BasicInfoBox>
          <BasicInfoBox>
            <img src="/assets/detailPeople.svg" alt="" />
            <div className="info">
              <span>참가 중인 인원</span>
              <span>
                {data?.registeredCount}/{data?.totalCount}
              </span>
            </div>
          </BasicInfoBox>
          <BasicInfoBox>
            <img src="/assets/detailMoney.svg" alt="" />
            <div className="info">
              <span>참가비</span>
              <span>{data?.budget.toLocaleString()}</span>
            </div>
          </BasicInfoBox>
        </Box1>
        {/* 3 */}
        <Box1>
          <DetailInfoTitle>이런 모임이에요</DetailInfoTitle>
          <pre>{data?.contents}</pre>
        </Box1>
        {/* 4 */}
        <Box1>
          <DetailInfoTitle>여기서 모여요</DetailInfoTitle>
          <div>
            <Map
              center={{
                lat: data?.locationLat ?? 0,
                lng: data?.locationLng ?? 0,
              }}
              style={{
                width: '100%',
                height: '20rem',
                borderRadius: '1.6rem',
              }}
              maxLevel={3}
              minLevel={11}
            >
              <MapMarker
                key={`${meetingId}`}
                image={{
                  src: '/assets/markerSelected.svg',
                  size: {
                    width: 50,
                    height: 60,
                  },
                }}
                position={{
                  lat: data?.locationLat ?? 0,
                  lng: data?.locationLng ?? 0,
                }}
              />
            </Map>
          </div>
        </Box1>
        {/* 5 */}
      </DetailInfoContainer>

      {userInfo?.email !== data?.creatorEmail ? (
        // 일반 유저
        <DetailButtonContainer>
          {data != null && <BookMark meetingId={data.meetingId} />}
          {data?.status === 'COMPLETE' ? (
            // 모집이 COMPLETE
            <CommonButton size="large" disabled>
              모집이 종료되었습니다
            </CommonButton>
          ) : data?.join === true ? (
            // 참여 했나요?
            <CommonButton
              size="large"
              $type="pink"
              handleClick={() => {
                setOnWithdrawModal(!onWithdrawModal)
              }}
            >
              모임 탈퇴하기
            </CommonButton>
          ) : isFull ? (
            // 인원이 꽉 찼나요?
            <CommonButton size="large" disabled>
              모집이 마감되었습니다
            </CommonButton>
          ) : (
            // 참여하기
            <JoinMeetingButton handleJoinMeeting={handleMeetingSubClick} />
          )}
        </DetailButtonContainer>
      ) : (
        // 작성자
        <DetailButtonContainer>
          <CommonButton
            size="small"
            $type="white"
            handleClick={() => {
              setOnDeleteModal(!onDeleteModal)
            }}
          >
            삭제하기
          </CommonButton>
          <CommonButton
            size="small"
            $type="primary"
            handleClick={() => {
              navi(`/meetings/${meetingId}/modify`)
            }}
            disabled={data?.status === 'COMPLETE'}
          >
            수정하기
          </CommonButton>
        </DetailButtonContainer>
      )}
      {onWithdrawModal && (
        <AlertModal
          message="탈퇴"
          firstSubMessage="탈퇴하실 경우, 현재 진행 중인"
          secondSubMessage="모임에서의 기록이 취소됩니다."
          handleClick={withdrawMeetingClick}
          onClose={() => {
            setOnWithdrawModal(!onWithdrawModal)
          }}
          buttonName="탈퇴하기"
        />
      )}
      {onDeleteModal && (
        <AlertModal
          message="삭제"
          firstSubMessage="모임을 삭제하면"
          secondSubMessage="관련 데이터가 모두 지워집니다."
          onClose={() => {
            setOnDeleteModal(!onDeleteModal)
          }}
          handleClick={deleteMeetingClick}
          buttonName="삭제하기"
        />
      )}
    </DetailWholeContainer>
  )
}

export default MeetingDetail
