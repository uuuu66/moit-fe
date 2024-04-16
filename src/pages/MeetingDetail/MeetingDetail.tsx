/* eslint-disable no-nested-ternary */
import { Map, MapMarker } from 'react-kakao-maps-sdk'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { RegisterTitle } from '../Meeting/styles'
import useMap from '@/hooks/useMap'
import DetailHeader from '@/components/DetailHeader/DetailHeader'
import {
  BasicInfoBox,
  Box,
  CareerTag,
  DetailInfoTitle,
  DetailWholeContainer,
} from './styles'
import {
  deleteMeetingWithdraw,
  getMeetingDetail,
  postMeetingSub,
} from '@/apis/meeting'
import JoinMeetingButton from '@/components/meeting/JoinMeetingButton/JoinMeetingButton'
import CommonButton from '@/components/common/Button/CommonButton'

function MeetingDetail(): JSX.Element {
  useMap()
  const queryClient = useQueryClient()
  const navi = useNavigate()
  const { meetingId } = useParams()

  const { data } = useQuery({
    queryKey: ['meetingListDetail', meetingId],
    queryFn: async () => await getMeetingDetail(Number(meetingId)),
  })

  const postSubMutation = useMutation({
    mutationFn: async () => {
      await postMeetingSub(Number(meetingId))
    },
    onSuccess: () => {
      navi(`/meetings/${meetingId}/chats`)
      void queryClient.invalidateQueries({ queryKey: ['meetingListDetail'] })
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
      navi(`/meetings/${meetingId}`)
      void queryClient.invalidateQueries({ queryKey: ['meetingListDetail'] })
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

  const isFull = data?.totalCount === data?.registeredCount

  return (
    <DetailWholeContainer>
      {/* 헤더 */}
      <DetailHeader meetingId={Number(meetingId)} />
      {/* 1 */}
      <RegisterTitle>
        <h1>
          <span>{data?.meetingName}</span>
        </h1>
      </RegisterTitle>
      {/* 2 */}
      <Box>
        <div className="userInfo">
          <div className="imgIcon" />
          <div>{data?.creatorName}</div>
        </div>
        <div className="tagbox">
          {data?.careerNameList.map((e: string) => (
            <CareerTag key={e}>#{e}</CareerTag>
          ))}
          {data?.skillNameList.map((e: string) => (
            <CareerTag key={e}>#{e}</CareerTag>
          ))}
        </div>
      </Box>
      {/* 3 */}
      <Box>
        <BasicInfoBox>
          <div className="imgIcon" />
          <div className="info">
            <span>{data?.meetingDate}</span>
            <span>
              {data?.meetingStartTime} - {data?.meetingEndTime}
            </span>
          </div>
        </BasicInfoBox>
        <BasicInfoBox>
          <div className="imgIcon" />
          <div className="info">
            <span>주소</span>
            <span>{data?.locationAddress}</span>
          </div>
        </BasicInfoBox>
        <BasicInfoBox>
          <div className="imgIcon" />
          <div className="info">
            <span>참가 중인 인원</span>
            <span>
              {data?.registeredCount}/{data?.totalCount}
            </span>
          </div>
        </BasicInfoBox>
        <BasicInfoBox>
          <div className="imgIcon" />
          <div className="info">
            <span>참가비</span>
            <span>{data?.budget}원</span>
          </div>
        </BasicInfoBox>
      </Box>
      {/* 4 */}
      <Box>
        <DetailInfoTitle>이런 모임이에요</DetailInfoTitle>
        <p>{data?.contents}</p>
      </Box>
      {/* 5 */}
      <Box>
        <DetailInfoTitle>여기서 모여요</DetailInfoTitle>
        <div>
          <Map
            center={{
              lat: data?.locationLat ?? 0,
              lng: data?.locationLng ?? 0,
            }}
            style={{
              width: '350px',
              height: '200px',
              borderRadius: '0.5rem',
              border: '1px solid #e9e9e9',
            }}
            maxLevel={3}
            minLevel={11}
          >
            <MapMarker
              key={`${meetingId}`}
              image={{
                src: '/assets/mapMarker.svg',
                size: {
                  width: 60,
                  height: 70,
                },
              }}
              position={{
                lat: data?.locationLat ?? 0,
                lng: data?.locationLng ?? 0,
              }}
            />
          </Map>
        </div>
      </Box>
      {/* 6 */}
      <div>
        {isFull ? (
          <CommonButton size="large">모집이 마감되었습니다</CommonButton>
        ) : data?.join === true ? (
          <CommonButton size="large" handleClick={withdrawMeetingClick}>
            모임 탈퇴하기
          </CommonButton>
        ) : (
          <JoinMeetingButton handleJoinMeeting={handleMeetingSubClick} />
        )}
      </div>
    </DetailWholeContainer>
  )
}

export default MeetingDetail
