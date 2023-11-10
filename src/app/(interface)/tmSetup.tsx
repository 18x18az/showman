'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import { setTmAddress } from '@/contracts/tm'
import { useState } from 'react'

export function GetTmConnection (): JSX.Element {
  const [input, setInput] = useState('')

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const tryTmConnection = async () => {
    console.log(input)
    const response = await setTmAddress(input)
    if (response.toString().startsWith('4')) {
      toast({
        duration: 3000,
        description: (
          <div className='text-xl flex gap-4 content-center align-center'>Could not connect to {input}</div>
        )
      })
    }
  }

  return (
    <div className='flex flex-col gap-4'>
      <h1>Enter TM IP Address</h1>
      <div className='flex gap-4'><Input className='w-42' value={input} onChange={handleInput} /><Button onClick={() => { void tryTmConnection() }}>Connect</Button></div>
    </div>
  )
}
