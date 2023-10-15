'use client'

import { sessionSlice, selectAuthentication, useDispatch, useSelector, UserInfo, LoginPayload } from '@/lib/redux'
import { useEffect } from 'react'
import { EmptyPost, JsonTopic, Post } from './maestro'
import { redirect, usePathname } from 'next/navigation'

export function SessionManager (): JSX.Element {
  const dispatch = useDispatch()
  const authentication = useSelector(selectAuthentication)

  let id: number | undefined
  let token: string | undefined

  if (authentication !== null) {
    id = authentication.id
    token = authentication.token
  }

  const topic = id !== undefined ? `users/${id}` : undefined

  const sessionInfo = JsonTopic<UserInfo | {}>(topic, {})
  const pathname = usePathname()

  // On startup, if user ID is set, confirm that the user exists
  useEffect(() => {
    if (id === undefined) {
      return
    }

    if (Object.keys(sessionInfo).length !== 0) {
      return
    }

    const doLogin: () => Promise<void> = async () => {
      const response = await Post('auth/login', { id, token })
      const result = await response.json() as boolean
      if (!result) {
        console.log('Invalid login')
        dispatch(sessionSlice.actions.logout())
        redirect('/login')
      }
    }

    void doLogin()
  }, [])

  // If no local user ID is set, register a new user and redirect to the login page
  useEffect(() => {
    if (id !== undefined) {
      return
    }

    const doRegister: () => Promise<void> = async () => {
      const response = await EmptyPost('auth/register')
      const session = await response.json() as LoginPayload
      dispatch(sessionSlice.actions.registered(session))
    }

    if (pathname === '/login') {
      void doRegister()
    } else {
      redirect('/login')
    }
  }, [id])

  // Propagate bus session info updates
  useEffect(() => {
    if (Object.keys(sessionInfo).length !== 0) {
      dispatch(sessionSlice.actions.busUpdate(sessionInfo as UserInfo))
    }
  }, [sessionInfo])

  return <></>
}
