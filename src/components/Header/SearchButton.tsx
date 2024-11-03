import styled from 'styled-components'
import SearchIcon from '@/svgs/search.svg?react'

function SearchButton(): JSX.Element {
  return (
    <Button>
      <Icon width={16} height={16} stroke="black" fill="black" />
    </Button>
  )
}
const Button = styled.button`
  border-radius: 100%;
  width: 28px;
  height: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
`
const Icon = styled(SearchIcon)``
export default SearchButton
