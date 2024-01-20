'use client'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { toast } from '@/components/ui/use-toast'
import { gql } from '../../../__generated__'
import { useMutation } from '@apollo/client'

const CONFIGURE_TM = gql(`
  mutation configureTournamentManager($settings: TournamentManagerSetup!) {
    configureTournamentManager(settings: $settings) {
      status
    }
  }
`)

export default function TmSelector (): JSX.Element {
  const [input, setInput] = useState('')

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInput(e.target.value)
  }

  const handleError = (): void => {
    toast({
      duration: 3000,
      description: (
        <div className='text-xl flex gap-4 content-center align-center'>Could not connect to {input}</div>
      )
    })
  }

  const [configureTournamentManager] = useMutation(CONFIGURE_TM,
    {
      errorPolicy: 'all',
      onError: handleError,
      variables: {
        settings: {
          url: input
        }
      }
    })

  return (
    <div className='flex flex-col m-4 gap-4 border p-4 w-fit border-zinc-700 rounded-md'>
      <h1>Enter TM IP Address</h1>
      <div className='flex gap-4'>
        <Input className='w-42' value={input} onChange={handleInput} />
        <Button onClick={() => { void configureTournamentManager() }}>Connect</Button>
      </div>
    </div>
  )
}
