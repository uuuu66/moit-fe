import { Map } from 'react-kakao-maps-sdk'
import styled from 'styled-components'
import { useRef } from 'react'
import useMap from '@/hooks/useMap'

function Home(): JSX.Element {
  useMap()

  return (
    <div>
      <MainLayout>
        <Map
          center={{ lat: 37.5667, lng: 126.9784 }}
          style={{
            width: '100%',
            height: '100%',
          }}
          level={10}
          maxLevel={3}
          minLevel={11}
        />
      </MainLayout>
    </div>
  )
}

export default Home

const MainLayout = styled.div`
  width: 360px;
  height: 740px;
  position: relative;
`
