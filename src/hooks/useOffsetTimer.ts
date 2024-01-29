import { useEffect, useState } from 'react'

export function useOffsetTimer (time: string): number {
  const realDate = new Date(time)
  const initialOffset = realDate.getTime() - Date.now()
  const [offset, setOffset] = useState(initialOffset)

  useEffect(() => {
    const interval = setInterval(() => {
      const diff = realDate.getTime() - Date.now()
      setOffset(diff)
    }, 20)

    return () => clearInterval(interval)
  }, [time])

  return offset
}
