'use client'

import { DisplayConfig } from '@18x18az/maestro-interfaces'
import { JsonTopic } from '@/utils/maestro'
import { Columns } from './columns'
import { DisplayTable } from './display-table'
import { Field } from '../../interfaces'

export default function Page (): JSX.Element {
  const displays = JsonTopic<DisplayConfig[]>('displays')

  const fields = JsonTopic<Field[]>('fields')

  if (displays === undefined || fields === undefined) return <></>

  const displaysWithFields = displays.map((display) => {
    return { ...display, fields }
  })

  return <DisplayTable data={displaysWithFields} columns={Columns} />
}
