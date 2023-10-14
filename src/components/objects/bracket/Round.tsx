import { Fragment } from 'react'
import { Final } from './Final'
import { Pairing, PairingInfo } from './Pairing'

interface RoundProps {
  readonly pairings: Array<PairingInfo | undefined>
  readonly side: 'left' | 'right' | 'final'
}

export function Round (props: RoundProps): JSX.Element {
  let rowTable: string[] = []

  const numMatches = props.pairings.length

  let column = ''

  if (numMatches === 4) {
    rowTable = ['row-start-1', 'row-start-3', 'row-start-5', 'row-start-7']
    if (props.side === 'left') {
      column = 'col-start-1'
    } else {
      column = 'col-start-7'
    }
  } else if (numMatches === 2) {
    rowTable = ['row-start-2', 'row-start-6']
    if (props.side === 'left') {
      column = 'col-start-2'
    } else {
      column = 'col-start-6'
    }
  } else if (numMatches === 1) {
    rowTable = ['row-start-4']
    if (props.side === 'left') {
      column = 'col-start-3'
    } else if (props.side === 'right') {
      column = 'col-start-5'
    } else {
      column = 'col-start-4'
    }
  }

  let content

  if (props.side === 'final') {
    content = <Final row={rowTable[0]} column={column} pairing={props.pairings[0]} />
  } else {
    content = props.pairings.map((pairing, index) => {
      if (pairing === undefined) {
        return <Fragment key={index} />
      }
      return <Pairing key={index} {...pairing} side={props.side as 'left' | 'right'} row={rowTable[index]} column={column} />
    }
    )
  }

  return (
    <>
      {content}
    </>
  )
}
