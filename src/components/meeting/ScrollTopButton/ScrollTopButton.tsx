import ScrollTopButtonLayout from './styles'

interface ScrollTopButtonProps {
  scrollBox: HTMLDivElement | null
}

export default function ScrollTopButton({
  scrollBox,
}: ScrollTopButtonProps): JSX.Element | null {
  const handleClickButton = (): void => {
    scrollBox?.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <ScrollTopButtonLayout type="button" onClick={handleClickButton}>
      <img src="/assets/up.svg" alt="up" />
    </ScrollTopButtonLayout>
  )
}
