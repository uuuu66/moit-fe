import { careerData, type Career } from '@/constants/careerData'
import { CareerContainer } from '@/pages/Meeting/styles'
import useRegisterContext from '@/hooks/useRegisterContext'

function MeetingCareer(): JSX.Element {
  const { info, setInfo } = useRegisterContext()

  const handleCareerClick = (careerId: number): void => {
    setInfo((prev) => {
      if (prev.careerIds.includes(careerId)) {
        return {
          ...prev,
          careerIds: prev.careerIds.filter((item) => item !== careerId),
        }
      }
      return {
        ...prev,
        careerIds: [...prev.careerIds, careerId],
      }
    })
  }

  return (
    <CareerContainer>
      {careerData.map((career: Career) => (
        <button
          type="button"
          key={career.careerId}
          onClick={() => {
            handleCareerClick(career.careerId)
          }}
          className={info.careerIds.includes(career.careerId) ? 'selected' : ''}
        >
          {career.careerName}
        </button>
      ))}
    </CareerContainer>
  )
}

export default MeetingCareer
