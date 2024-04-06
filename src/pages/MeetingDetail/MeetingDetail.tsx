import { Map, MapMarker } from 'react-kakao-maps-sdk'

import CommonButton from '@/components/common/Button/CommonButton'
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

function MeetingDetail(): JSX.Element {
  useMap()

  return (
    <DetailWholeContainer>
      {/* 헤더 */}
      <DetailHeader />
      {/* 1 */}
      <RegisterTitle>
        <h1>
          <span>코공모(코딩 공부는 모여서) 모집중 오우예 씨몬</span>
        </h1>
      </RegisterTitle>
      {/* 2 */}
      <Box>
        <div className="userInfo">
          <div className="imgIcon" />
          <div>userName</div>
        </div>
        <div className="tagbox">
          <CareerTag>#주니어</CareerTag>
        </div>
        <div className="tagbox">
          <CareerTag>#Spring</CareerTag>
        </div>
      </Box>
      {/* 3 */}
      <Box>
        <BasicInfoBox>
          <div className="imgIcon" />
          <div className="info">
            <span>날짜</span>
            <span>시간</span>
          </div>
        </BasicInfoBox>
        <BasicInfoBox>
          <div className="imgIcon" />
          <div className="info">
            <span>주소</span>
          </div>
        </BasicInfoBox>
        <BasicInfoBox>
          <div className="imgIcon" />
          <div className="info">
            <span>참가 중인 인원</span>
            <span>1/4</span>
          </div>
        </BasicInfoBox>
        <BasicInfoBox>
          <div className="imgIcon" />
          <div className="info">
            <span>참가비</span>
            <span>200원</span>
          </div>
        </BasicInfoBox>
      </Box>
      {/* 4 */}
      <Box>
        <DetailInfoTitle>이런 모임이에요</DetailInfoTitle>
        <p>모임 설명</p>
      </Box>
      {/* 5 */}
      <Box>
        <DetailInfoTitle>여기서 모여요</DetailInfoTitle>
        <div>
          <Map
            center={{
              lat: 37.566826,
              lng: 126.9786567,
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
              // key={`${meetingId}`}
              // title={meetingName}
              image={{
                src: 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png',
                size: {
                  width: 20,
                  height: 30,
                },
              }}
              position={{ lat: 37.566826, lng: 126.9786567 }}
            />
          </Map>
        </div>
      </Box>
      {/* 6 */}
      <div>
        <CommonButton size="large">모임 참여하기</CommonButton>
      </div>
    </DetailWholeContainer>
  )
}

export default MeetingDetail
