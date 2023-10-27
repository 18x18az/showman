'use client'

import {
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'

import { DataTable } from '@/components/ui/data-table'

interface TeamTableProps<TData, TValue> {
  readonly columns: Array<ColumnDef<TData, TValue>>
  readonly data: TData[]
}

export function TeamTable<TData, TValue> ({
  columns,
  data
}: TeamTableProps<TData, TValue>): JSX.Element {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel()
  })

  return (
    <div>
      <DataTable columns={columns} table={table} keyValue='number' />
    </div>
  )
}
