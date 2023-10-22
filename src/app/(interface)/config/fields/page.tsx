'use client'

import { JsonTopic } from "@/utils/maestro"
import { FieldInfoBroadcast } from "@18x18az/maestro-interfaces"
import { FieldTable } from "./field-table"
import { Columns } from "./columns"

export default function Page (): JSX.Element {
  const fields = JsonTopic<FieldInfoBroadcast[]>('fields', [])
  return <div>
    <FieldTable columns={Columns} data={fields}/>
  </div>
}
