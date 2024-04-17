/* eslint-disable no-nested-ternary */
import { Map, MapMarker } from 'react-kakao-maps-sdk'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import useMap from '@/hooks/useMap'
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
  deleteMeetingWithdraw,
  getMeetingDetail,
  postMeetingSub,
} from '@/apis/meeting'
import JoinMeetingButton from '@/components/meeting/JoinMeetingButton/JoinMeetingButton'
import CommonButton from '@/components/common/Button/CommonButton'
import { theme } from '@/constants/theme'

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
      <DetailButtonContainer>
        {isFull ? (
          <CommonButton size="large">모집이 마감되었습니다</CommonButton>
        ) : data?.join === true ? (
          <CommonButton
            size="large"
            handleClick={withdrawMeetingClick}
            style={{ backgroundColor: `${theme.color.primary100}` }}
          >
            모임 탈퇴하기
          </CommonButton>
        ) : (
          <JoinMeetingButton handleJoinMeeting={handleMeetingSubClick} />
        )}
      </DetailButtonContainer>
    </DetailWholeContainer>
  )
}

export default MeetingDetail
