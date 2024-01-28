'use client'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { useConfigureTournamentManagerMutation } from '../../../__generated__/graphql'
import ErrorableButton from '../../../components/errorable-button/ErrorableButton'

export default function TmSelector (): JSX.Element {
  const [input, setInput] = useState('')

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInput(e.target.value)
  }

  return (
    <div className='flex flex-col m-4 gap-4 border p-4 w-fit border-zinc-700 rounded-md'>
      <h1>Enter TM IP Address</h1>
      <div className='flex gap-4'>
        <Input className='w-42' value={input} onChange={handleInput} />
        <ErrorableButton mutation={useConfigureTournamentManagerMutation} options={{ variables: { settings: { url: input } } }}>Connect</ErrorableButton>
      </div>
    </div>
  )
}
