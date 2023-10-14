import { PairingInfo } from './Pairing'

const lineColor = 'slategrey'

interface LinesProps {
  readonly width: number
  readonly height: number
  readonly r16: Array<PairingInfo | undefined>
  readonly qf: Array<PairingInfo | undefined>
  readonly sf: Array<PairingInfo | undefined>
  readonly f: (PairingInfo | undefined)
}

interface LineOutProps {
  readonly x: number
  readonly y: number
  readonly xInterval: number
  readonly yInterval: number
  readonly direction: 'left' | 'right'
}

interface LineInProps {
  readonly x: number
  readonly y: number
  readonly xInterval: number
  readonly yInterval: number
  readonly direction: 'up' | 'down'
}

interface CornerProps {
  readonly x: number
  readonly y: number
  readonly xInterval: number
  readonly yInterval: number
  readonly horizontal: 'left' | 'right'
  readonly vertical: 'up' | 'down'
}

function Corner (props: CornerProps): JSX.Element {
  let horizontalStart
  let horizontalEnd

  let verticalStart
  let verticalEnd

  const offset = Math.min(props.xInterval, props.yInterval) * 0.3

  const yMid = (props.y + 0.5) * props.yInterval
  const xMid = (props.x + 0.5) * props.xInterval

  if (props.horizontal === 'right') {
    horizontalStart = props.x * props.xInterval
    horizontalEnd = xMid - offset
  } else {
    horizontalStart = (props.x + 1) * props.xInterval
    horizontalEnd = xMid + offset
  }

  if (props.vertical === 'up') {
    verticalStart = props.y * props.yInterval
    verticalEnd = yMid - offset
  } else {
    verticalStart = (props.y + 1) * props.yInterval
    verticalEnd = yMid + offset
  }

  return (
    <>
      <line x1={horizontalStart} y1={yMid} x2={horizontalEnd} y2={yMid} stroke={lineColor} strokeWidth='2' />
      <line x1={xMid} y1={verticalStart} x2={xMid} y2={verticalEnd} stroke={lineColor} strokeWidth='2' />
      <line x1={horizontalEnd} y1={yMid} x2={xMid} y2={verticalEnd} stroke={lineColor} strokeWidth='2' />
    </>
  )
}

function LineIn (props: LineInProps): JSX.Element {
  let endY
  let startY

  if (props.direction === 'down') {
    endY = props.y * props.yInterval
    startY = endY + 25
  } else {
    endY = (props.y + 1) * props.yInterval
    startY = endY - 25
  }

  const x = (props.x + 0.5) * props.xInterval
  return <line x1={x} y1={startY} x2={x} y2={endY} stroke={lineColor} strokeWidth='2' />
}

interface LineUpProps {
  readonly x: number
  readonly yStart: number
  readonly yEnd: number
  readonly xInterval: number
  readonly yInterval: number
}

function LineUp (props: LineUpProps): JSX.Element {
  const x = (props.x + 0.5) * props.xInterval

  // if going up, draw the line from the top of starty to the bottom of endy, otherwise vice versa
  let startY
  let endY
  if (props.yStart < props.yEnd) {
    startY = (props.yStart + 1) * props.yInterval
    endY = props.yEnd * props.yInterval
  } else {
    startY = props.yStart * props.yInterval
    endY = (props.yEnd + 1) * props.yInterval
  }

  return <line x1={x} y1={startY} x2={x} y2={endY} stroke={lineColor} strokeWidth='2' />
}

function LineOut (props: LineOutProps): JSX.Element {
  let endX
  let startX

  if (props.direction === 'left') {
    endX = props.x * props.xInterval
    startX = endX + 25
  } else {
    endX = (props.x + 1) * props.xInterval
    startX = endX - 25
  }

  const y = (props.y + 0.5) * props.yInterval
  return <line x1={startX} y1={y} x2={endX} y2={y} stroke={lineColor} strokeWidth='2' />
}

interface CenterProps {
  readonly xInterval: number
  readonly yInterval: number
}

interface CenterLineProps {
  readonly xInterval: number
  readonly yInterval: number
  readonly direction: 'left' | 'right'
}

function CenterLine (props: CenterLineProps): JSX.Element {
  let startX
  let endX

  const midY = 3.5 * props.yInterval
  const midX = 3.5 * props.xInterval

  const offset = Math.min(props.xInterval, props.yInterval) * 0.06

  if (props.direction === 'left') {
    startX = 3 * props.xInterval
    endX = midX - offset
  } else {
    startX = 4 * props.xInterval
    endX = midX + offset
  }

  let startY
  let endY

  if (props.direction === 'left') {
    endY = midY - offset
    startY = 3 * props.yInterval
  } else {
    endY = midY + offset
    startY = 4 * props.yInterval
  }

  return (
    <>
      <line x1={startX} x2={endX} y1={midY} y2={midY} stroke={lineColor} strokeWidth='2' />
      <line x1={midX} x2={midX} y1={startY} y2={endY} stroke={lineColor} strokeWidth='2' />
      <line x1={endX} x2={midX} y1={midY} y2={endY} stroke={lineColor} strokeWidth='2' />
    </>
  )
}

function Center (props: CenterProps): JSX.Element {
  return (
    <>
      <LineOut x={2} y={3} direction='right' xInterval={props.xInterval} yInterval={props.yInterval} />
      <LineOut x={4} y={3} direction='left' xInterval={props.xInterval} yInterval={props.yInterval} />
      <CenterLine xInterval={props.xInterval} yInterval={props.yInterval} direction='left' />
      <CenterLine xInterval={props.xInterval} yInterval={props.yInterval} direction='right' />
    </>
  )
}

interface LineBetweenProps {
  readonly xInterval: number
  readonly yInterval: number
  readonly xStart: number
  readonly yStart: number
  readonly yEnd: number
  readonly direction: 'left' | 'right'
}

function LineBetween (props: LineBetweenProps): JSX.Element {
  const lineOut = <LineOut x={props.xStart} y={props.yStart} xInterval={props.xInterval} yInterval={props.yInterval} direction={props.direction} />

  const verticalDirection = props.yStart < props.yEnd ? 'down' : 'up'
  const endX = props.direction === 'left' ? props.xStart - 1 : props.xStart + 1

  const corner = <Corner x={endX} y={props.yStart} xInterval={props.xInterval} yInterval={props.yInterval} horizontal={props.direction} vertical={verticalDirection} />

  const lineIn = <LineIn x={endX} y={props.yEnd} xInterval={props.xInterval} yInterval={props.yInterval} direction={verticalDirection} />

  let lineUp
  if (Math.abs(props.yStart - props.yEnd) > 1) {
    lineUp = <LineUp x={endX} yStart={props.yStart} yEnd={props.yEnd} xInterval={props.xInterval} yInterval={props.yInterval} />
  }

  return (
    <>
      {lineOut}
      {corner}
      {lineIn}
      {lineUp}
    </>
  )
}

export function Lines (props: LinesProps): JSX.Element {
  const intervalX = props.width / 7
  const intervalY = props.height / 7

  const lines: JSX.Element[] = []

  props.r16.forEach((pairing, index) => {
    if (pairing === undefined) {
      return
    }

    let startX = 6
    let direction: 'left' | 'right' = 'left'
    if (index < 4) {
      startX = 0
      direction = 'right'
    }

    const position = index % 4
    const startY = position * 2
    let endY

    if (position < 2) {
      endY = 1
    } else {
      endY = 5
    }

    const line = <LineBetween xInterval={intervalX} yInterval={intervalY} xStart={startX} yStart={startY} yEnd={endY} direction={direction} />
    lines.push(line)
  })

  props.qf.forEach((pairing, index) => {
    if (pairing === undefined) {
      return
    }

    let startX = 5
    let direction: 'left' | 'right' = 'left'
    if (index < 2) {
      startX = 1
      direction = 'right'
    }

    const position = index % 2
    const startY = position * 4 + 1

    const line = <LineBetween xInterval={intervalX} yInterval={intervalY} xStart={startX} yStart={startY} yEnd={3} direction={direction} />
    lines.push(line)
  })

  return (
    <svg className='absolute w-full h-full' viewBox={`0 0 ${props.width} ${props.height}`}>
      {lines}
      <Center xInterval={intervalX} yInterval={intervalY} />
    </svg>
  )
}
