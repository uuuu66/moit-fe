import { useState } from 'react'
import { ModalBtn } from '../FilterFrame/styles'
import { type FiltersKey } from '@/type/filter'
import CareerModal from './CareerModal'

interface CareerProps {
  handleFilterChange: (
    filter: Partial<{
      [key in FiltersKey]: number[]
    }>
  ) => void
}

function Career({ handleFilterChange }: CareerProps): JSX.Element {
  const [isShow, setIsShow] = useState(false)

  const handleVisibleClick = (): void => {
    setIsShow(!isShow)
  }

  return (
    <>
      <ModalBtn type="button" onClick={handleVisibleClick}>
        경력
      </ModalBtn>
      {isShow && (
        <CareerModal
          handleFilterChange={handleFilterChange}
          handleModalClose={() => {
            setIsShow(false)
          }}
        />
      )}
    </>
  )
}

export default Career
