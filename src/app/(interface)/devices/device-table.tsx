'use client'

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'

import { Button } from '@/components/ui/button'
import { ROLE } from '@18x18az/maestro-interfaces'

import { useState } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { getRoleText } from '@/utils/strings'
import { DataTable } from '@/components/ui/data-table'

interface DeviceTableProps<TData, TValue> {
  readonly columns: Array<ColumnDef<TData, TValue>>
  readonly data: TData[]
}

export function DeviceTable<TData, TValue> ({
  columns,
  data
}: DeviceTableProps<TData, TValue>): JSX.Element {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters
    }
  })

  const roleOptions = Object.values(ROLE).map(role => {
    const text = getRoleText(role)
    return <DropdownMenuItem key={role} onClick={() => { table.getColumn('role')?.setFilterValue(role) }}>{text}</DropdownMenuItem>
  })

  const existingFilter = table.getColumn('role')?.getFilterValue()

  let existingFilterText = 'Role'

  if (existingFilter !== undefined) {
    existingFilterText = getRoleText(existingFilter as ROLE)
  }

  const RoleDropdownFilter = (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button>{existingFilterText}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {roleOptions}
      </DropdownMenuContent>
    </DropdownMenu>
  )

  return (
    <div>
      <div className='flex items-center py-4'>
        {RoleDropdownFilter}
      </div>
      <DataTable columns={columns} table={table} />
    </div>
  )
}
