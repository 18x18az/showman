'use client'

import {
  ColumnDef,
  SortingState,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'

import { useState } from 'react'
import { DataTable } from '@/components/ui/data-table'

interface FieldTableProps<TData, TValue> {
  readonly columns: Array<ColumnDef<TData, TValue>>
  readonly data: TData[]
}

export function FieldTable<TData, TValue> ({
  columns,
  data
}: FieldTableProps<TData, TValue>): JSX.Element {
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
    <DataTable columns={columns} table={table} keyValue='fieldId' />
  )
}
