'use client'

import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'

import { DataTable } from '@/components/ui/data-table'
import { useState } from 'react'

interface TeamTableProps<TData, TValue> {
  readonly columns: Array<ColumnDef<TData, TValue>>
  readonly data: TData[]
}

export function SittingTable<TData, TValue> ({
  columns,
  data
}: TeamTableProps<TData, TValue>): JSX.Element {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    []
  )
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters
    }
  })

  return (
    <div className='p-12'>
      <DataTable columns={columns} table={table} />
    </div>
  )
}
