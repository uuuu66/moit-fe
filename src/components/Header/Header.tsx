import { useLocation } from 'react-router-dom'
import { memo, useState } from 'react'
import { HeaderContainer } from './styles'
import Input from '../common/Input/Input'
import strings from '@/constants/strings'
import SearchButton from './SearchButton'
import FilterIcon from '@/svgs/filter.svg?react'
import MoitIcon from '@/svgs/moit.svg?react'
import FlexDiv from '../common/FlexDiv/FlexDiv'
import TagFilter from '../common/TagFilter/TagFilter'
import groupTypes from '@/constants/groupTypes'

export default memo(function Header(): JSX.Element {
  const location = useLocation()
  const isHeaderRequired = location.pathname === '/'
  const [selectedGrouptypes, setSelectedGroupTypes] = useState<
    Array<keyof typeof strings.groupTypes>
  >(['recommends'])
  return (
    <HeaderContainer $isShow={isHeaderRequired}>
      <FlexDiv gap={8}>
        <MoitIcon width={64} />
        <Input
          placeholder={strings.placeholders.search_placeholder}
          suffixElement={<SearchButton />}
          containerProps={{ style: { paddingRight: '4px', height: '40px' } }}
        />
        <FilterIcon width={32} height={32} />
      </FlexDiv>
      <FlexDiv gap={8}>
        {Object.entries(groupTypes).map((grouptype) => (
          <TagFilter
            key={grouptype[0]}
            isSelected={selectedGrouptypes.includes(grouptype[1].groupKey)}
            selectedColor={grouptype[1].groupColor}
            selectedBgColor={grouptype[1].groupBgColor}
            onClick={() => {
              if (!selectedGrouptypes.includes(grouptype[1].groupKey))
                setSelectedGroupTypes([
                  ...selectedGrouptypes,
                  grouptype[1].groupKey,
                ])
              else
                setSelectedGroupTypes(
                  [...selectedGrouptypes].filter(
                    (type) => type !== grouptype[1].groupKey
                  )
                )
            }}
          >
            {grouptype[1].groupName}
          </TagFilter>
        ))}
      </FlexDiv>
    </HeaderContainer>
  )
})
