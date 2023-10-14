import { Fragment } from 'react'
import { Final } from './Final'
import { Pairing, PairingInfo } from './Pairing'

interface RoundProps {
  readonly pairings: Array<PairingInfo | undefined>
  readonly side: 'left' | 'right' | 'final'
}

interface RoundOutProps {
  readonly rowTable: string[]
  readonly column: string
}

const columns = ['col-start-1', 'col-start-2', 'col-start-3', 'col-start-4', 'col-start-5', 'col-start-6', 'col-start-7']

function getTables (numMatches: number, side: 'left' | 'right' | 'final'): RoundOutProps {
  let rowTable: string[] = []

  let columnPosition = 3

  let offset = 0

  if (side !== 'final') {
    switch (numMatches) {
      case 4:
        offset = 3
        rowTable = ['row-start-1', 'row-start-3', 'row-start-5', 'row-start-7']
        break
      case 2:
        offset = 2
        rowTable = ['row-start-2', 'row-start-6']
        break
      case 1:
        offset = 1
        rowTable = ['row-start-4']
        break
    }
  }

  if (side === 'right') {
    columnPosition -= offset
  } else {
    columnPosition += offset
  }

  const column = columns[columnPosition]

  return { rowTable, column }
}

export function Round (props: RoundProps): JSX.Element {
  const numMatches = props.pairings.length
  const { rowTable, column } = getTables(numMatches, props.side)
  let content

  if (props.side === 'final') {
    content = <Final row={rowTable[0]} column={column} pairing={props.pairings[0]} />
  } else {
    content = props.pairings.map((pairing, index) => {
      const row = rowTable[index]
      const ident = `${row} ${column}`

      if (pairing === undefined) {
        return <Fragment key={ident} />
      }
      return <Pairing key={ident} {...pairing} side={props.side as 'left' | 'right'} row={row} column={column} />
    }
    )
  }

  return (
    <>
      {content}
    </>
  )
}
