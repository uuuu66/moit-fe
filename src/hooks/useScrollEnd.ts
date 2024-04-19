export default function useScrollEnd(): {
  handleScroll: (
    scrollElement: HTMLElement | null,
    handleScrollEnd: () => void
  ) => void
} {
  const handleScroll = (
    scrollElement: HTMLElement | null,
    handleScrollEnd: () => void
  ): void => {
    if (scrollElement === null) return

    if (
      scrollElement.scrollHeight - 1 <=
      scrollElement.scrollTop + scrollElement.clientHeight
    ) {
      handleScrollEnd()
    }
  }
  return { handleScroll }
}
