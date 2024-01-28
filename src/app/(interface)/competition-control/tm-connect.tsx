'use client'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { useConfigureTournamentManagerMutation } from '../../../__generated__/graphql'
import { Button } from '../../../primitives/Button'
import { toast } from '../../../primitives/useToast'

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

  const [configureTournamentManager] = useConfigureTournamentManagerMutation(
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
