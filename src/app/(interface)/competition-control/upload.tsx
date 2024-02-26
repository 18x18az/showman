'use client'

import { useState } from 'react'
import { Button } from '../../../primitives/button/Button'
import { toast } from '../../../primitives/toast/useToast'

interface UploadProps {
  upload: (file: File) => Promise<void>
  text: string
}

export default function Upload (props: UploadProps): JSX.Element {
  const [file, setFile] = useState<File | null>(null)

  const handleFileUpload = async (): Promise<void> => {
    if (file != null) {
      await props.upload(file)
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
      <h1>{`Upload ${props.text} CSV`}</h1>
      <input type='file' accept='.csv' onChange={handleFileChange} />
      <Button className='w-24' size='lg' onClick={() => { void handleFileUpload() }}>Upload</Button>
    </div>
  )
}
