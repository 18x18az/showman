'use client'

import { JsonTopic } from '@/utils/maestro'
import { DisplayConfig } from '@18x18az/maestro-interfaces'

interface FieldDisplayProps {
  readonly uuid: string
}

export async function FieldDisplay (props: FieldDisplayProps): Promise<JSX.Element> {
  const topic = `displays/${props.uuid}`
  const fieldInfo = JsonTopic<DisplayConfig>(topic, { uuid: props.uuid, name: '', fieldId: '' })

  return (
    <div>
      {JSON.stringify(fieldInfo)}
    </div>
  )
}
