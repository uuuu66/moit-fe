import { useState } from 'react'
import { type FiltersKey } from '@/type/filter'
import CareerModal from './CareerModal'
import { ModalBtn } from '@/components/filter/FilterFrame/styles'

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
