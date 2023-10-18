'use client'

import { redirect } from 'next/navigation'
import { useSelector } from 'react-redux'
import { ReduxState, selectIsAssigned } from '../lib/redux'

type Selector<T> = (state: ReduxState) => T

export function accessRedirect (selector: Selector<Boolean | undefined>, isLogin = false): void {
  const canAccess = useSelector(selector)
  const isAssigned = useSelector(selectIsAssigned)

  if (isAssigned === undefined || canAccess === undefined) {
    return
  }

  if (!isLogin) {
    if (!isAssigned) {
      redirect('/login')
    } else if (canAccess === false) {
      redirect('/')
    }
  } else {
    if (isAssigned) {
      redirect('/')
    }
  }
}
