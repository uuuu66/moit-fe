import { PriceBox } from '@/pages/Meeting/styles'
import useRegisterContext from '@/hooks/useRegisterContext'

function MeetingBudget(): JSX.Element {
  const { info, setInfo } = useRegisterContext()

  const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const inputValue = e.target.value
    if (inputValue.includes('-')) {
      return
    }
    let budgetValue: number = parseInt(inputValue, 10)
    if (budgetValue > 1000000) {
      budgetValue = 1000000
    }
    setInfo((prevState) => ({
      ...prevState,
      budget: budgetValue,
    }))
  }

  return (
    <PriceBox>
      <label htmlFor="price">참가 금액</label>
      <div>
        <input
          type="number"
          id="price"
          placeholder="ex)3,000"
          value={info.budget}
          onChange={handleBudgetChange}
          onKeyPress={(e) => {
            const regex = /^[0-9\b]+$/
            if (!regex.test(e.key)) {
              e.preventDefault()
            }
          }}
          onWheel={(e) => {
            ;(e.target as HTMLInputElement).blur()
          }}
        />
        <label htmlFor="price">원</label>
      </div>
    </PriceBox>
  )
}

export default MeetingBudget
