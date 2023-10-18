'use client'

import { sessionSlice, selectAuthentication, useDispatch, useSelector, UserInfo, hydrateSession, LoginPayload, stageSlice } from '@/lib/redux'
import { useEffect, useState } from 'react'
import { EmptyPost, JsonTopic } from './maestro'
import { redirect, usePathname } from 'next/navigation'
import { EventStage, STAGE } from '@18x18az/maestro-interfaces'

export function SessionManager (): JSX.Element {
  const dispatch = useDispatch()
  const authentication = useSelector(selectAuthentication)
  const pathname = usePathname()

  const [needsToken, setNeedsToken] = useState(false)
  const [needsRedirect, setNeedsRedirect] = useState(false)
  const [busIsLive, setBusIsLive] = useState(false)

  const stageInfo = JsonTopic<EventStage>('eventStage', { stage: undefined as unknown as STAGE })
  const stage = stageInfo.stage

  if (stage !== undefined) {
    dispatch(stageSlice.actions.updateStage(stage))
  }

  if (needsRedirect) {
    setNeedsRedirect(false)
    if (pathname !== '/login') {
      redirect('/login')
    }
  }

  let id: number | undefined

  if (authentication !== null) {
    id = authentication.id
  }

  const topic = id !== undefined ? `users/${id}` : undefined

  const sessionInfo = JsonTopic<UserInfo | {}>(topic, {})

  const doRegister: () => Promise<void> = async () => {
    const response = await EmptyPost('auth/register')
    const session = await response.json() as LoginPayload
    dispatch(sessionSlice.actions.registered(session))
  }

  // On startup, hydrate the session
  useEffect(() => {
    void hydrateSession(dispatch).then((exists: boolean) => {
      if (!exists) {
        setNeedsRedirect(true)
        setNeedsToken(true)
      }
    })
  }, [])

  // Check if it needs to register
  useEffect(() => {
    if (!needsToken) {
      return
    }

    if (authentication !== null) {
      return
    }

    if (pathname === '/login') {
      setNeedsToken(false)
      void doRegister()
    } else {
      setNeedsRedirect(true)
    }
  }, [pathname, needsToken])

  // Propagate bus session info updates
  useEffect(() => {
    if (Object.keys(sessionInfo).length !== 0) {
      setBusIsLive(true)
      dispatch(sessionSlice.actions.busUpdate(sessionInfo as UserInfo))
    } else if (busIsLive) {
      setNeedsToken(true)
      setNeedsRedirect(true)
      dispatch(sessionSlice.actions.logout)
    }
  }, [sessionInfo])

  return <></>
}
