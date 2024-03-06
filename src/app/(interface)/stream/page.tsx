'use client'
import { useCallPresetMutation, useCameraControlInfoQuery, useCreatePresetMutation, useSavePresetMutation, useUpdatePresetMutation } from '@/__generated__/graphql'
import ErrorableButton from '@/components/errorable-button/ErrorableButton'
import { useState } from 'react'
import { Button } from '../../../primitives/button/Button'
import { Pencil, Save } from 'lucide-react'
import { TextInput } from '@/components/ui/data-table'
import { useErrorableMutation } from '@/hooks/useErrorableMutation'

interface PresetProps {
  preset: {
    id: number
    name: string
  }
  current: number | null
  isEditMode: boolean
  cameraId: number
}

function Preset (props: PresetProps): JSX.Element {
  const edit = useErrorableMutation(useUpdatePresetMutation, { refetchQueries: ['CameraControlInfo'] })
  const { preset, current, isEditMode, cameraId } = props

  const isCurrent = current === preset.id

  const color = isCurrent ? 'bg-indigo-9 hover:bg-indigo-10' : 'bg-slate-2'

  if (isEditMode) {
    return (
      <TextInput value={preset.name} updateValue={(name) => { void edit({ variables: { id: preset.id, update: { name } } }) }} />
    )
  }

  return (
    <ErrorableButton size='lg' className={`${color} text-2xl w-64 h-16`} mutation={useCallPresetMutation} options={{ variables: { cameraId, presetId: preset.id }, refetchQueries: ['CameraControlInfo'] }}>
      {preset.name}
    </ErrorableButton>
  )
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
    return <Preset key={preset.id} preset={preset} current={current} isEditMode={isEditMode} cameraId={camera.id} />
  })

  const actionButton = isEditMode
    ? <ErrorableButton options={{ variables: { id: camera.id }, refetchQueries: ['CameraControlInfo'] }} mutation={useCreatePresetMutation}>Create Preset</ErrorableButton>
    : <ErrorableButton className='bg-slate-2 w-64 h-16 mt-4' options={{ variables: { id: camera.id }, refetchQueries: ['CameraControlInfo'] }} mutation={useSavePresetMutation}><Save /></ErrorableButton>

  return (
    <div className='flex flex-col gap-4'>
      <h1 className='text-4xl text-slate-11'>{camera.name}</h1>
      {presets}
      {actionButton}
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
