'use client'

import { uploadTeams } from '@/contracts/teams'
import { useState } from 'react'
import { Button } from '../../../primitives/button/Button'
import { toast } from '../../../primitives/toast/useToast'

export default function UploadTeams (): JSX.Element {
  const [file, setFile] = useState<File | null>(null)

  const handleFileUpload = async (): Promise<void> => {
    if (file != null) {
      await uploadTeams(file)
    } else {
      toast({
        duration: 3000,
        description: (
          <div className='text-xl flex gap-4 content-center align-center'>No file selected</div>
        )
      })
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.target.files != null) {
      setFile(event.target.files[0])
    }
  }

  return (
    <div className='flex flex-col gap-4'>
      <h1>Upload team CSV</h1>
      <input type='file' accept='.csv' onChange={handleFileChange} />
      <Button className='w-24' size='lg' onClick={() => { void handleFileUpload() }}>Upload</Button>
    </div>
  )
}
