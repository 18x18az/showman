'use client'

import { useEffect, useState } from "react";

export function offsetTimer(time: string): number {
    const realDate = new Date(time)
    const initialOffset = realDate.getTime() - Date.now()
    const [offset, setOffset] = useState(initialOffset)
  
    useEffect(() => {
        const interval = setInterval(() => {
            const diff = realDate.getTime() - Date.now()
            setOffset(diff)
        }, 20);
    
        return () => clearInterval(interval);
      }, [time]);
  
      return offset
  }

  interface TimerProps {
    time: string
  }

  export function Countdown(props: TimerProps) {
    const offset = offsetTimer(props.time)
    const sign = offset < 0 ? '+' : '-'
    const magnitude = Math.abs(offset)/1000
    const seconds = Math.floor(magnitude % 60).toString().padStart(2, '0')
    const minutes = Math.floor(magnitude / 60).toString().padStart(2, '0')
    const time = `${sign}${minutes}:${seconds}`

    return <>{time}</>
  }

  export function Timer(props: TimerProps) {
    let offset = offsetTimer(props.time)
    if(offset < 0) offset = 0

    const roundedSeconds = Math.ceil(offset / 1000)
    const minutes = Math.floor(roundedSeconds / 60).toString()
    const seconds = Math.floor(roundedSeconds % 60).toString().padStart(2, '0')

    const time = `${minutes}:${seconds}`
    return <>{time}</>
  }