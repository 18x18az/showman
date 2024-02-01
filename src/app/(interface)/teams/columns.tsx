'use client'

import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'
import { Button } from '../../../primitives/button/Button'
import { Inspection } from '../../../__generated__/graphql'

interface Team {
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
      let text = ''
      switch (row.original.inspectionStatus) {
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
      return <div className='font-medium'>{text}</div>
    }
  }
]
