'use client'

import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'
import { Button } from '@/primitives/button/Button'
import { Inspection } from '@/__generated__/graphql'
import { Checkin } from './checkin'
import { InspectionPopover } from './inspection'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Popover } from '../../../primitives/popover/Popover'
import { CheckBox } from '../../../primitives/check-box/CheckBox'

interface Team {
  id: number
  name: string
  number: string
  inspectionStatus: Inspection
  rank: number | null
}

export const Columns: Array<ColumnDef<Team>> = [
  {
    accessorKey: 'number',
    header: ({ column }) => {
      return (
        <Button
          className='p-0'
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Team
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      )
    },
    cell: ({ row }) => {
      return <div className='font-medium'>{row.original.number}</div>
    }
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => {
      return <div className='font-medium'>{row.original.name}</div>
    }
  },
  {
    accessorKey: 'inspection',
    accessorFn: row => row.inspectionStatus,
    filterFn: 'arrIncludesSome',
    enableColumnFilter: true,
    header: ({ column }) => {
      const filter = column.getFilterValue() as string[] | undefined
      if (filter === undefined) {
        column.setFilterValue([Inspection.NotHere, Inspection.InProgress, Inspection.CheckedIn, Inspection.Completed])
        return <></>
      }

      const noShow = filter.includes(Inspection.NoShow)
      const notHere = filter.includes(Inspection.NotHere)
      const notStarted = filter.includes(Inspection.CheckedIn)
      const inProgress = filter.includes(Inspection.InProgress)
      const complete = filter.includes(Inspection.Completed)

      const toggleFilter = (key: Inspection): void => {
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
        <Popover title='Inspection'>
          <div className='flex flex-col gap-2'>
            <div className='flex gap-2 items-center'><CheckBox value={noShow} onChange={() => { toggleFilter(Inspection.NoShow) }} /> No Show</div>
            <div className='flex gap-2 items-center'><CheckBox value={notHere} onChange={() => { toggleFilter(Inspection.NotHere) }} /> Not Here</div>
            <div className='flex gap-2 items-center'><CheckBox value={notStarted} onChange={() => { toggleFilter(Inspection.CheckedIn) }} /> Not Started</div>
            <div className='flex gap-2 items-center'><CheckBox value={inProgress} onChange={() => { toggleFilter(Inspection.InProgress) }} /> In Progress</div>
            <div className='flex gap-2 items-center'><CheckBox value={complete} onChange={() => { toggleFilter(Inspection.Completed) }} /> Complete</div>
          </div>
        </Popover>
      )
    },
    cell: ({ row }) => {
      const status = row.original.inspectionStatus
      let dialog

      if (row.original.inspectionStatus === Inspection.NotHere || row.original.inspectionStatus === Inspection.NoShow) {
        dialog = <Checkin teamId={row.original.id} status={status} />
      } else {
        dialog = <InspectionPopover teamId={row.original.id} teamNumber={row.original.number} />
      }

      let text = ''
      switch (status) {
        case Inspection.Completed:
          text = 'Complete'
          break
        case Inspection.InProgress:
          text = 'In Progress'
          break
        case Inspection.CheckedIn:
          text = 'Not Started'
          break
        case Inspection.NotHere:
          text = 'Not Here'
          break
        case Inspection.NoShow:
          text = 'No Show'
          break
      }
      return (
        <Dialog>
          <DialogTrigger>
            {text}
          </DialogTrigger>
          <DialogContent className='h-full max-h-[90dvh] flex flex-col'>
            <DialogHeader>
              <DialogTitle className='text-center mb-2'>
                {row.original.number}
              </DialogTitle>
            </DialogHeader>
            {dialog}
          </DialogContent>
        </Dialog>
      )
    }
  },
  {
    accessorKey: 'rank',
    header: ({ column }) => {
      return (
        <Button
          className='p-0'
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Rank
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      )
    },
    cell: ({ row }) => {
      return <div className='font-medium'>{row.original.rank}</div>
    }
  }
]
