import { FieldInfoBroadcast } from "@18x18az/maestro-interfaces";
import { ColumnDef } from "@tanstack/react-table";

export const Columns: Array<ColumnDef<FieldInfoBroadcast>> = [
    {
        accessorKey: 'name',
        header: 'Name'
    }
]