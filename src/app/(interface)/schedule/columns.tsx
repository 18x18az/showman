import { ColumnDef } from '@tanstack/react-table'
import { MatchStatus, SittingInformationFragment } from '../../../__generated__/graphql'
import { makeShortMatchName } from '../../../utils/strings/match'
import { Popover } from '../../../primitives/popover/Popover'
import { CheckBox } from '../../../primitives/check-box/CheckBox'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../../components/ui/dialog'
import { MatchScore } from '../../../components/objects/scoring/MatchScore'

interface Sitting extends SittingInformationFragment {
  status: MatchStatus
  block: {
    name: string
  }
}

export const Columns: Array<ColumnDef<Sitting>> = [
  {
    header: 'Match',
    accessorKey: 'match',
    cell: ({ row }) => {
      const text = makeShortMatchName(row.original)
      return (
        <Dialog>
          <DialogTrigger>
            {text}
          </DialogTrigger>
          <DialogContent className='h-full max-h-[90dvh] flex flex-col'>
            <DialogHeader>
              <DialogTitle className='text-center mb-2'>
                {text}
              </DialogTitle>
            </DialogHeader>
            <MatchScore matchId={row.original.id} />
          </DialogContent>
        </Dialog>
      )
    }
  },
  {
    header: ({ column }) => {
      const filter = column.getFilterValue() as string[] | undefined
      if (filter === undefined) {
        column.setFilterValue([MatchStatus.NotStarted, MatchStatus.Queued, MatchStatus.Scoring])
        return <></>
      }

      const complete = filter.includes(MatchStatus.Complete)
      const notStarted = filter.includes(MatchStatus.NotStarted)
      const queued = filter.includes(MatchStatus.Queued)
      const scoring = filter.includes(MatchStatus.Scoring)

      const toggleFilter = (key: MatchStatus): void => {
        const value = !filter.includes(key)
        if (value) {
          filter.push(key)
          column.setFilterValue(filter)
        } else {
          const index = filter.indexOf(key)
          if (index !== -1) {
            filter.splice(index, 1)
            column.setFilterValue(filter)
          }
        }
      }

      return (
        <Popover title='Status'>
          <div className='flex flex-col gap-2'>
            <div className='flex gap-2 items-center'><CheckBox value={notStarted} onChange={() => { toggleFilter(MatchStatus.NotStarted) }} />Unqueued</div>
            <div className='flex gap-2 items-center'><CheckBox value={queued} onChange={() => { toggleFilter(MatchStatus.Queued) }} />Queued</div>
            <div className='flex gap-2 items-center'><CheckBox value={scoring} onChange={() => { toggleFilter(MatchStatus.Scoring) }} />Scoring</div>
            <div className='flex gap-2 items-center'><CheckBox value={complete} onChange={() => { toggleFilter(MatchStatus.Complete) }} /> Complete</div>
          </div>
        </Popover>
      )
    },
    accessorKey: 'status',
    accessorFn: row => row.status,
    enableColumnFilter: true,
    filterFn: 'arrIncludesSome',
    cell: ({ row }) => {
      let text = ''
      switch (row.original.status) {
        case MatchStatus.NotStarted:
          text = 'Unqueued'
          break
        case MatchStatus.Queued:
          text = 'Queued'
          break
        case MatchStatus.Scoring:
          text = 'Scoring'
          break
        case MatchStatus.Complete:
          text = 'Complete'
          break
      }
      return <div>{text}</div>
    }
  },
  {
    header: 'Block',
    accessorKey: 'block',
    cell: ({ row }) => {
      return <div>{row.original.block.name}</div>
    }
  }
]
