'use client'

import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'

import { Button } from '@/components/ui/button'

interface Team {
  name: string
  number: string
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
  }
]
