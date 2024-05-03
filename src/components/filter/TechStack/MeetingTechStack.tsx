import { useState } from 'react'

import { useQuery } from '@tanstack/react-query'
import styled from 'styled-components'
import TechStackModal from './TechStackModal'
import { getTechStackList } from '@/apis/filter'
import getFilterDisplayNames from '@/util/getFilterDisplayNames'
import { LocationContainer } from '@/components/meeting/FindLocation/FindLocation'
import { CareerContainer } from '@/pages/Meeting/styles'
import { theme } from '@/constants/theme'
import { type FiltersKey } from '@/type/filter'
import { filterKeys } from '@/constants/queryKeys'

interface TechStackProps {
  selectedFilters: number[]
  handleSelectedFilters: (
    filterName: FiltersKey,
    selectedNums: number[],
    selectedNames?: string[]
  ) => void
}

function MeetingTechStack({
  selectedFilters,
  handleSelectedFilters,
}: TechStackProps): JSX.Element | null {
  const [isShow, setIsShow] = useState<boolean>(false)

  const { data } = useQuery({
    queryKey: filterKeys.stackList,
    queryFn: async () => await getTechStackList(),
  })

  if (data == null) return null
  const filterDisplayName =
    selectedFilters.length !== 0
      ? getFilterDisplayNames(
          data.map(({ skillName, skillId }) => ({
            name: skillName,
            id: skillId,
          })),
          selectedFilters
        )
      : 'ex) JavaScript, TypeScript...'

  const handleVisibleClick = (): void => {
    setIsShow(!isShow)
  }

  const skillIdToName = (skillIdList: number[]): string[] => {
    const skillNames: string[] = []
    skillIdList.forEach((id) => {
      const foundSkill = data.find((skill) => skill.skillId === id)
      if (foundSkill !== undefined) {
        skillNames.push(foundSkill.skillName)
      }
    })
    return skillNames
  }
  const skillNameList = skillIdToName(selectedFilters ?? [])

  return (
    <>
      <LocationContainer>
        <label htmlFor="meetingPlace">기술 스택</label>
        <button type="button" onClick={handleVisibleClick}>
          <span>{filterDisplayName}</span>
          <img src="/assets/search.svg" alt="search" />
        </button>
      </LocationContainer>
      <CareerContainer>
        {skillNameList.map((skill) => (
          <SkillBox key={skill}>{skill}</SkillBox>
        ))}
      </CareerContainer>
      {isShow && (
        <TechStackModal
          techItems={data}
          selectedFilters={selectedFilters}
          handleSelectedFilters={handleSelectedFilters}
          handleModalClose={() => {
            setIsShow(false)
          }}
        />
      )}
    </>
  )
}

export default MeetingTechStack

export const SkillBox = styled.div`
  font-size: 14px;
  color: ${theme.color.primary100};
  background-color: ${theme.color.white};
  padding: 1rem 1.2rem;
  border: 1px solid ${theme.color.primary100};
  border-radius: 40px;
  box-shadow: rgba(99, 99, 99, 0.1) 0px 2px 4px 0px;
`
