'use client'

import { useEffect, useState } from "react";

export function offsetTimer(time: Date): number {
    const realDate = new Date(time)
    const [offset, setOffset] = useState(0)
  
    useEffect(() => {
        const interval = setInterval(() => {
            const diff = realDate.getTime() - Date.now()
            setOffset(diff)
        }, 20);
    
        return () => clearInterval(interval);
      }, [time]);
  
      return offset
  }

// function makeTime(offset: number, truncate: boolean): string {
//     if(truncate && offset < 0) {
//       return '0:00'
//     }
  
//     const time = Math.floor(offset / 1000)
//     const minutes = Math.floor(time / 60).toString()
//     const seconds = (time % 60).toString().padStart(2, '0')
  
//     return `${minutes}:${seconds}`
//   }
  
//   interface TimerBodyProps {
//     time: Date
//     format: 'timer' | 'countdown'
//   }
  
//   export function Timer(props: TimerBodyProps): JSX.Element {
//     const truncate = props.format !== 'countdown'
//     const properDate = new Date(props.time)
//     const offset = offsetTimer(properDate)
//     const time = makeTime(offset, truncate)
  
//     return <div className='text-9xl'>{time}</div>
//   }

  interface TimerProps {
    time: Date
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