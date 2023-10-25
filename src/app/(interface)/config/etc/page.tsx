'use client'

import { Button } from '@/components/ui/button'
import { EmptyPost } from '../../../../utils/maestro'

function resetEvent (): void {
  void EmptyPost('stage/reset')
}

export default function Page (): JSX.Element {
  return (
    <div>
      <Button onClick={resetEvent}>Reset</Button>
    </div>
  )
}