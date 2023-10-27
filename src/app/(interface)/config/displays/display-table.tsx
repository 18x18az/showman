'use client'

import {
  ColumnDef,
  SortingState,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'

import { DataTable } from '@/components/ui/data-table'

import { useState } from 'react'

interface DisplayTableProps<TData, TValue> {
  readonly columns: Array<ColumnDef<TData, TValue>>
  readonly data: TData[]
}

export function DisplayTable<TData, TValue> ({
  columns,
  data
}: DisplayTableProps<TData, TValue>): JSX.Element {
  const [sorting, setSorting] = useState<SortingState>([])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting
    }
  })

  return (
    <DataTable columns={columns} table={table} keyValue='name' />
  )
}
