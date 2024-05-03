import { InputBox } from '@/pages/Meeting/styles'
import useRegisterContext from '@/hooks/useRegisterContext'

function MeetingName(): JSX.Element {
  const { info, setInfo } = useRegisterContext()

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInfo((prevState) => ({
      ...prevState,
      meetingName: e.target.value,
    }))
  }

  return (
    <>
      <InputBox>
        <label htmlFor="nameInput">모임명</label>
        <input
          type="text"
          id="nameInput"
          placeholder="ex) 강남역에서 오후 2시 모각코 구합니다"
          value={info.meetingName}
          onChange={handleNameChange}
          maxLength={34}
        />
      </InputBox>
      <span className="check">{info.meetingName.length}/34</span>
    </>
  )
}

export default MeetingName
