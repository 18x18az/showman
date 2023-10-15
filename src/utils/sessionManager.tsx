'use client'

import { sessionSlice, selectAuthentication, useDispatch, useSelector, UserInfo, hydrateSession, selectNeedsUpdate, LoginPayload } from '@/lib/redux'
import { useEffect } from 'react'
import { EmptyPost, JsonTopic } from './maestro'
import { redirect, usePathname } from 'next/navigation'

export function SessionManager (): JSX.Element {
  const dispatch = useDispatch()
  const authentication = useSelector(selectAuthentication)
  const needsUpdate = useSelector(selectNeedsUpdate)

  let id: number | undefined

  if (authentication !== null) {
    id = authentication.id
  }

  const topic = id !== undefined ? `users/${id}` : undefined

  const sessionInfo = JsonTopic<UserInfo | {}>(topic, {})
  const pathname = usePathname()

  // On startup, hydrate the session
  useEffect(() => {
    void hydrateSession(dispatch)
  }, [])

  useEffect(() => {
    if (!needsUpdate) {
      return
    }

    if (pathname === '/login') {
      const doRegister: () => Promise<void> = async () => {
        const response = await EmptyPost('auth/register')
        const session = await response.json() as LoginPayload
        dispatch(sessionSlice.actions.registered(session))
      }
      void doRegister()
      dispatch(sessionSlice.actions.markNeedsUpdate(false))
    } else {
      redirect('/login')
    }
  }, [pathname, needsUpdate])

  // If no local user ID is set, register a new user and redirect to the login page
  // useEffect(() => {
  //   if (id !== undefined) {
  //     return
  //   }

  //   const doRegister: () => Promise<void> = async () => {
  //     const response = await EmptyPost('auth/register')
  //     const session = await response.json() as LoginPayload
  //     dispatch(sessionSlice.actions.registered(session))
  //   }

  //   if (pathname === '/login') {
  //     void doRegister()
  //   } else {
  //     redirect('/login')
  //   }
  // }, [id])

  // Propagate bus session info updates
  useEffect(() => {
    if (Object.keys(sessionInfo).length !== 0) {
      dispatch(sessionSlice.actions.busUpdate(sessionInfo as UserInfo))
    }
  }, [sessionInfo])

  return <></>
}
