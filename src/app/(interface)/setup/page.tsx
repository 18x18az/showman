'use client'

import { useSelector } from 'react-redux'
import { selectIsSetupStage } from '@/lib/redux/slices/stageSlice/selectors'
import { redirect } from 'next/navigation'

export default function Page (): JSX.Element {
  const isSetup = useSelector(selectIsSetupStage)

  if (isSetup === false) {
    redirect('/')
  }

  return <div>Page</div>
}
