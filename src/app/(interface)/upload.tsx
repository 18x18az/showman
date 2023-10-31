'use client'

import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { uploadMatches } from '@/contracts/matches'
import { Post } from '@/utils/maestro'
import { useState } from 'react'

export default function UploadMatches (): JSX.Element {
  const [file, setFile] = useState<File | null>(null)

  const handleFileUpload = async () => {
    if (file != null) {
      await uploadMatches(file)
    } else {
      toast({
        duration: 3000,
        description: (
          <div className='text-xl flex gap-4 content-center align-center'>No file selected</div>
        )
      })
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files != null) {
      setFile(event.target.files[0])
    }
  }

  return (
    <div className='flex flex-col gap-4'>
      <h1>Upload match CSV</h1>
      <input type='file' accept='.csv' onChange={handleFileChange} />
      <Button className='w-24' size='lg' onClick={() => { void handleFileUpload() }}>Upload</Button>
    </div>
  )
}
