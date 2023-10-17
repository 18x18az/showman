import { FC } from 'react'
import { FieldDisplay } from './field'

// export default function Field(): JSX.Element {
//     return <FieldDisplay/>
// }

interface FieldProps {
  params: {
    field: string
  }
}

const Field: FC<FieldProps> = ({ params }) => {
  return <FieldDisplay field={params.field} />
}

export default Field
