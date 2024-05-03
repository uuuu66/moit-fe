import { MemberCount } from '@/pages/Meeting/styles'
import useRegisterContext from '@/hooks/useRegisterContext'

function MeetingRecriutNum(): JSX.Element {
  const { info, setInfo } = useRegisterContext()

  const handleMemCountUpClick = (): void => {
    if (info.totalCount < 10) {
      setInfo((prevState) => ({
        ...prevState,
        totalCount: prevState.totalCount + 1,
      }))
    }
  }

  const handleMemCountDownClick = (): void => {
    if (info.totalCount > 2) {
      setInfo((prevState) => ({
        ...prevState,
        totalCount: prevState.totalCount - 1,
      }))
    }
  }

  return (
    <>
      <span>본인을 포함한 최소 인원을 설정해 주세요</span>
      <MemberCount>
        <button type="button" onClick={handleMemCountDownClick}>
          <img src="/assets/meetingMinus.svg" alt="minus" />
        </button>
        <div>{info.totalCount}</div>
        <button type="button" onClick={handleMemCountUpClick}>
          <img src="/assets/meetingPlus.svg" alt="plus" />
        </button>
      </MemberCount>
    </>
  )
}

export default MeetingRecriutNum
