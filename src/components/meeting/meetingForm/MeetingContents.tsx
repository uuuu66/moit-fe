import { memo } from 'react'
import { InputBox } from '@/pages/Meeting/styles'
import useRegisterContext from '@/hooks/useRegisterContext'

function MeetingContents(): JSX.Element {
  const { info, setInfo } = useRegisterContext()

  const handleContentChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    setInfo((prevState) => ({
      ...prevState,
      contents: e.target.value,
    }))
  }

  return (
    <>
      <InputBox>
        <textarea
          id="contentInput"
          value={info.contents}
          onChange={handleContentChange}
          maxLength={300}
          placeholder="간단한 모임 소개를 작성해 주세요"
        />
      </InputBox>
      <span className="check">{info.contents.length}/300</span>
    </>
  )
}

export default memo(MeetingContents)
