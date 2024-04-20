import { useEffect, useState } from 'react'

export default function useScreenSize(): {
  screenHeight: number
  screenWidth: number
} {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)
  const [screenHeight, setScreenHeight] = useState(window.innerHeight)

  useEffect(() => {
    const handleResize = (): void => {
      setScreenHeight(window.innerHeight)
      setScreenWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  return { screenHeight, screenWidth }
}
