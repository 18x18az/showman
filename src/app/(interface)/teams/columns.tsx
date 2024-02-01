'use client'

import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'
import { Button } from '@/primitives/button/Button'
import { Inspection } from '@/__generated__/graphql'
import { Checkin } from './checkin'
import { InspectionPopover } from './inspection'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'

interface Team {
  id: number
  name: string
  number: string
  inspectionStatus: Inspection
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
    header: 'Inspection',
    cell: ({ row }) => {
      const status = row.original.inspectionStatus
      let dialog = <></>

      if (row.original.inspectionStatus === Inspection.NotHere || row.original.inspectionStatus === Inspection.NoShow) {
        dialog = <Checkin teamId={row.original.id} teamNumber={row.original.number} status={status} />
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
          <DialogContent className='h-96 flex flex-col'>
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
  }
]
