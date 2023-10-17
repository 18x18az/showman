'use client'

import { ColumnDef } from '@tanstack/react-table'
import { ROLE, User } from '@18x18az/maestro-interfaces'
import { Trash2, ArrowUpDown } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { getRoleText } from '@/utils/strings'
import { deleteTeam, setRole, setName as updateName } from './controls'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

export const columns: Array<ColumnDef<User>> = [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          className='p-0'
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Name
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      )
    },
    cell: ({ row }) => {
      const [name, setName] = useState(row.original.name)

      const handleChange = (event: any): void => {
        event.preventDefault()
        if (event.target === null) {
          return
        }
        setName(event.target.value)
      }

      const handleBlur = (event: any): void => {
        event.preventDefault()
        if (event.target === null) {
          return
        }
        void updateName(row.original.userId, name)
      }

      // return <div className="font-medium">{row.original.name}</div>
      return <Input value={name} className='border-none dark:bg-transparent bg-transparent p-0' onChange={handleChange} onBlur={handleBlur} />
    }
  },
  {
    accessorKey: 'role',
    header: 'Role',
    cell: ({ row }) => {
      const roleText = getRoleText(row.original.role)

      const roleOptions = Object.values(ROLE).map(role => {
        const text = getRoleText(role)
        return <DropdownMenuItem key={role} onClick={() => { void setRole(row.original.userId, role) }}>{text}</DropdownMenuItem>
      })

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='p-0'>
              <span>{roleText}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {roleOptions}
          </DropdownMenuContent>
        </DropdownMenu>
      )

      // return <div className="font-medium">{roleText}</div>
    }
  },
  {
    id: 'delete',
    cell: ({ row }) => {
      return (
        <Button className='p-0' variant='ghost' onClick={() => { void deleteTeam(row.original.userId) }}>
          <Trash2 size={24} />
        </Button>
      )
    }
  }
]
