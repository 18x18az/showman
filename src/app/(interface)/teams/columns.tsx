'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Team } from '@18x18az/maestro-interfaces'
import { ArrowUpDown } from 'lucide-react'

import { Button } from '@/components/ui/button'

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
  }
]
