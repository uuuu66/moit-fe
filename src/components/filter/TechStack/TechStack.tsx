import { useState } from 'react'

import TechStackModal from './TechStackModal'
import { type FiltersKey } from '@/type/filter'
import { ModalBtn } from '../FilterFrame/styles'

interface TechStackProps {
  handleFilterChange: (
    filter: Partial<{
      [key in FiltersKey]: number[]
    }>
  ) => void
}

function TechStack({ handleFilterChange }: TechStackProps): JSX.Element {
  const [isShow, setIsShow] = useState<boolean>(false)

  const handleVisibleClick = (): void => {
    setIsShow(!isShow)
  }

  return (
    <>
      <ModalBtn type="button" onClick={handleVisibleClick}>
        기술스택
      </ModalBtn>
      {isShow && (
        <TechStackModal
          handleFilterChange={handleFilterChange}
          handleModalClose={() => {
            setIsShow(false)
          }}
        />
      )}
    </>
  )
}

export default TechStack
