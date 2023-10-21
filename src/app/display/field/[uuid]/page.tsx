import { FieldDisplay } from './field'

export default function Page ({ params }: { params: { uuid: string } }): JSX.Element {
  return (
    <>
      <FieldDisplay uuid={params.uuid} />
    </>
  )
}
