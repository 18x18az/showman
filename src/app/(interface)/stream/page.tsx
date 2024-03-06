'use client'
import { useCameraControlInfoQuery, useCreatePresetMutation, useUpdatePresetMutation } from '@/__generated__/graphql'
import ErrorableButton from '@/components/errorable-button/ErrorableButton'
import { useState } from 'react'
import { Button } from '../../../primitives/button/Button'
import { Pencil } from 'lucide-react'
import { TextInput } from '@/components/ui/data-table'
import { useErrorableMutation } from '@/hooks/useErrorableMutation'

interface PresetProps {
  preset: {
    id: number
    name: string
  }
  current: number | null
  isEditMode: boolean
}

function Preset (props: PresetProps): JSX.Element {
  const edit = useErrorableMutation(useUpdatePresetMutation, { refetchQueries: ['CameraControlInfo'] })
  const { preset, current, isEditMode } = props

  const isCurrent = current === preset.id

  const color = isCurrent ? 'text-indigo-9' : 'text-slate-11'

  if (isEditMode) {
    return (
      <TextInput value={preset.name} updateValue={(name) => { void edit({ variables: { id: preset.id, update: { name } } }) }} />
    )
  }

  return <div className={color}>{preset.name}</div>
}

interface CameraControlProps {
  camera: {
    id: number
    name: string
    currentPreset: {
      id: number
    } | null
    presets: Array<{
      id: number
      name: string
    }>
  }
  isEditMode: boolean
}

function CameraControl (props: CameraControlProps): JSX.Element {
  const { camera, isEditMode } = props

  const current = camera.currentPreset?.id ?? null

  const presets = camera.presets.map((preset) => {
    return <Preset key={preset.id} preset={preset} current={current} isEditMode={isEditMode} />
  })

  return (
    <div className='flex flex-col'>
      <h1 className='text-4xl text-slate-11'>{camera.name}</h1>
      {presets}
      <ErrorableButton options={{ variables: { id: camera.id }, refetchQueries: ['CameraControlInfo'] }} mutation={useCreatePresetMutation}>Create Preset</ErrorableButton>
    </div>
  )
}

export default function Page (): JSX.Element {
  const [isEditMode, setIsEditMode] = useState(false)
  const { data } = useCameraControlInfoQuery({ pollInterval: 500 })

  const editColor = isEditMode ? 'text-indigo-9 hover:text-indigo-10' : 'text-slate-11 hover:text-slate-10'

  if (data === undefined) return <></>

  const cameras = data.cameras.map((camera) => {
    return <CameraControl key={camera.id} camera={camera} isEditMode={isEditMode} />
  })

  return (
    <div className='flex flex-col'>
      <Button className={editColor} variant='ghost' onClick={() => setIsEditMode(!isEditMode)}><Pencil /></Button>
      <div className='flex w-full justify-evenly text-center p-8'>
        {cameras}
      </div>
    </div>
  )
}
