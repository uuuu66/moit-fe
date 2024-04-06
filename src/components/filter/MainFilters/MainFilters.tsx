import { type FiltersKey } from '@/type/filter'

interface MainFiltersProps {
  handleFilterChange: (
    filter: Partial<{
      [key in FiltersKey]: number[]
    }>
  ) => void
}

export default function MainFilters({
  handleFilterChange,
}: MainFiltersProps): JSX.Element {
  return (
    <div>
      <div>MainFilters</div>
    </div>
  )
}
