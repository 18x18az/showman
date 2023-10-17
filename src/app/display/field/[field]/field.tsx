'use client'

interface FieldDisplayProps {
  field: string
}

export function FieldDisplay (props: FieldDisplayProps): JSX.Element {
  return <div>{props.field}</div>
}
