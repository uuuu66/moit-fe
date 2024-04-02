import styled from 'styled-components'

const MeetingsLayout = styled.div`
  position: absolute;
  bottom: 0;
  z-index: 1;
  width: 100%;
  overflow: scroll;
  padding: 0 1.25rem 2.375rem;
`

const ScrollBox = styled.div`
  display: flex;
  gap: 1.25rem;
  width: fit-content;
`
export { MeetingsLayout, ScrollBox }
