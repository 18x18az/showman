'use client'

import { useSelector } from 'react-redux'
import { selectIsAssigned } from '../../lib/redux'
import { accessRedirect } from '../../utils/AccessRedirect'
import { selectIsSetupStage } from '../../lib/redux/slices/stageSlice/selectors'
import { redirect } from 'next/navigation'

export function LandingPage (): JSX.Element {
  accessRedirect(selectIsAssigned)

  const isSetup = useSelector(selectIsSetupStage)

  if (isSetup === true) {
    redirect('/setup')
  }

  return <div>TODO</div>
}
