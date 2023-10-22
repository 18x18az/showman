'use client'

import { ColumnDef } from '@tanstack/react-table'
import { ROLE, User } from '@18x18az/maestro-interfaces'
import { Trash2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { getRoleText } from '@/utils/strings'
import { deleteTeam, setRole, setName as updateName } from './controls'
import { DropdownHeader, SortableHeader, TextInput } from '@/components/ui/data-table'

export const Columns: Array<ColumnDef<User>> = [
  {
    accessorKey: 'name',
    header: ({ column }) => <SortableHeader column={column}>Name</SortableHeader>,
    cell: ({ row }) => <TextInput value={row.original.name} updateValue={(name) => { void updateName(row.original.userId, name) }} />
  },
  {
    accessorKey: 'role',
    header: 'Role',
    cell: ({ row }) => <DropdownHeader current={row.original.role} options={Object.values(ROLE)} stringGetter={getRoleText} updateValue={(value) => { void setRole(row.original.userId, value) }} />
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
