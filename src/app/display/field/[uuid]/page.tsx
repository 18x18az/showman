import { FieldDisplay } from './field'

export default function Page ({ params }: { readonly params: { readonly uuid: string } }): JSX.Element {
  return (
    <FieldDisplay uuid={params.uuid} />
  )
}
