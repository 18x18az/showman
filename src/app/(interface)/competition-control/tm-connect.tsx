'use client'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { useConfigureTournamentManagerMutation } from '@/__generated__/graphql'
import ErrorableButton from '@/components/errorable-button/ErrorableButton'

export default function TmSelector (): JSX.Element {
  const [url, setUrl] = useState('')
  const [password, setPassword] = useState('')

  const handleUrl = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setUrl(e.target.value)
  }

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value)
  }

  return (
    <div className='flex flex-col m-4 gap-4 border p-4 w-fit border-zinc-700 rounded-md'>
      <h1>Enter TM IP Address</h1>
      <div className='flex gap-4'>
        <Input className='w-42' value={url} onChange={handleUrl} />
        <Input className='w-42' value={password} onChange={handlePassword} />
        <ErrorableButton mutation={useConfigureTournamentManagerMutation} options={{ variables: { settings: { url, password } } }}>Connect</ErrorableButton>
      </div>
    </div>
  )
}
