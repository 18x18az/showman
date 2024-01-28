import { Column } from "@tanstack/react-table";
import { Button } from "../../../primitives/button/Button";
import { ArrowUpDown } from "lucide-react";

interface SortableHeaderProps<T> {
    readonly children: React.ReactNode
    readonly column: Column<T, unknown>
}

export function SortableHeader<T>(props: SortableHeaderProps<T>): JSX.Element {
        return (
          <Button
            className='p-0'
            variant='ghost'
            onClick={() => props.column.toggleSorting(props.column.getIsSorted() === 'asc')}
          >
            {props.children}
            <ArrowUpDown className='ml-2 h-4 w-4' />
          </Button>
        )
}