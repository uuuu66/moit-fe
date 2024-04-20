import styled from 'styled-components'
import useMap from '@/hooks/useMap'
import { type Info } from '@/pages/Meeting/RegisterMeeting'
import { type EditMeetingReq } from '@/type/request'
import { theme } from '@/constants/theme'

declare global {
  interface Window {
    daum: any
  }
}

interface Props {
  info: Info | EditMeetingReq
  setInfo: React.Dispatch<React.SetStateAction<any>>
  locationAddress: string | undefined
}

function FindLocation({ info, setInfo, locationAddress }: Props): JSX.Element {
  const { map } = useMap()
  const services = map?.services

  const handleButtonClick = (): void => {
    const { daum } = window

    new daum.Postcode({
      // eslint-disable-next-line func-names
      oncomplete: function (data: { address: string }) {
        if (services == null) return
        const geocoder = new services.Geocoder()

        const getXYFromAddress = (result: any, status: string): void => {
          if (status === 'OK') {
            let regionFirstName = result[0].address.region_1depth_name
            if (regionFirstName === '서울') {
              regionFirstName = '서울특별시'
            } else if (regionFirstName === '경기') {
              regionFirstName = '경기도'
            } else if (regionFirstName === '인천') {
              regionFirstName = '인천광역시'
            } else if (regionFirstName === '부산') {
              regionFirstName = '부산광역시'
            } else if (regionFirstName === '대구') {
              regionFirstName = '대구광역시'
            } else if (regionFirstName === '광주') {
              regionFirstName = '광주광역시'
            } else if (regionFirstName === '대전') {
              regionFirstName = '대전광역시'
            } else if (regionFirstName === '울산') {
              regionFirstName = '울산광역시'
            }

            setInfo({
              ...info,
              locationAddress: result[0].address_name,
              regionFirstName,
              regionSecondName: result[0].address?.region_2depth_name,
              locationLat: Number(result[0].y),
              locationLng: Number(result[0].x),
            })
          }
        }
        geocoder.addressSearch(data.address, getXYFromAddress)
      },
    }).open()
  }
  return (
    <LocationContainer>
      <label htmlFor="meetingPlace">모임 장소</label>
      <button type="button" id="meetingPlace" onClick={handleButtonClick}>
        <span>
          {locationAddress !== '' ? (
            <span className="address">{locationAddress}</span>
          ) : (
            '장소 이름이나 주소를 검색해 보세요'
          )}
        </span>
        <img src="/assets/search.svg" alt="search" />
      </button>
    </LocationContainer>
  )
}

export default FindLocation

export const LocationContainer = styled.div`
  color: ${theme.color.black40};
  background-color: ${theme.color.white};
  border: 1px solid ${theme.color.line2};
  margin-top: 2rem;
  padding: 1.6rem 2rem;
  border-radius: 0.5rem;

  label {
    font-size: 1.2rem;
  }
  button {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 0.4rem;
    span {
      font-size: ${theme.fontSize.medium};
    }
  }
  .address {
    color: ${theme.color.primary100};
    font-weight: ${theme.fontWeight.normal};
  }
`
