import { useEffect, useState } from 'react'

export default function useScrollPosition(
  element: React.RefObject<HTMLDivElement>
): {
  isScrollLeft: boolean
  isScrollRight: boolean
} {
  const [isScrollLeft, setIsScrollLeft] = useState(true)
  const [isScrollRight, setIsScrollRight] = useState(false)

  const handleScroll = (): void => {
    if (element.current === null) return
    const boxWidth = element.current.clientWidth
    const { scrollWidth } = element.current
    const scrollPosition = element.current.scrollLeft

    if (isScrollLeft && scrollPosition > 1) {
      setIsScrollLeft(false)
    }
    if (!isScrollLeft && scrollPosition <= 1) {
      setIsScrollLeft(true)
    }
    if (!isScrollRight && boxWidth + scrollPosition >= scrollWidth - 1) {
      setIsScrollRight(true)
    }
    if (isScrollRight && boxWidth + scrollPosition < scrollWidth - 1) {
      setIsScrollRight(false)
    }
  }

  useEffect(() => {
    if (element.current === null) return undefined
    const scrollBox = element.current
    scrollBox.addEventListener('scroll', handleScroll)

    return () => {
      scrollBox.removeEventListener('scroll', handleScroll)
    }
  })

  return { isScrollLeft, isScrollRight }
}
