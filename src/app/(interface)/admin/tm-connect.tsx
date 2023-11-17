'use client'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { setTmAddress } from '@/contracts/tm'
import { toast } from '@/components/ui/use-toast'

export default function TmSelector (): JSX.Element {
  const [input, setInput] = useState('')

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInput(e.target.value)
  }

  const tryTmConnection = async (): Promise<void> => {
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
    <div className='flex flex-col m-4 gap-4 border p-4 w-fit border-zinc-700 rounded-md'>
      <h1>Enter TM IP Address</h1>
      <div className='flex gap-4'>
        <Input className='w-42' value={input} onChange={handleInput} />
        <Button onClick={() => { void tryTmConnection() }}>Connect</Button>
      </div>
    </div>
  )
}
