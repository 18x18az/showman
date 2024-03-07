'use client'
import { useCallPresetMutation, useCameraControlInfoQuery, useCreatePresetMutation, useSavePresetMutation, useSetPreviewSceneMutation, useUpdatePresetMutation } from '@/__generated__/graphql'
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
  isProgram: boolean
  isPreview: boolean
  isEditMode: boolean
  cameraId: number
}

function Preset (props: PresetProps): JSX.Element {
  const edit = useErrorableMutation(useUpdatePresetMutation, { refetchQueries: ['CameraControlInfo'] })
  const { preset, current, isEditMode, cameraId, isProgram, isPreview } = props

  const isCurrent = current === preset.id

  let color = 'bg-slate-2'

  if (isCurrent) {
    if (isProgram) {
      color = 'bg-red-9 hover:bg-red-9'
    } else if (isPreview) {
      color = 'bg-green-9 hover:bg-green-10'
    } else {
      color = 'bg-indigo-3 hover:bg-indigo-4'
    }
  }

  if (isEditMode) {
    return (
      <TextInput value={preset.name} updateValue={(name) => { void edit({ variables: { id: preset.id, update: { name } } }) }} />
    )
  }

  return (
    <ErrorableButton disabled={isProgram} size='lg' className={`${color} text-2xl w-64 h-16`} mutation={useCallPresetMutation} options={{ variables: { cameraId, presetId: preset.id }, refetchQueries: ['CameraControlInfo'] }}>
      {preset.name}
    </ErrorableButton>
  )
}

interface CameraControlProps {
  camera: {
    id: number
    scene: {
      id: number
    }
    name: string
    currentPreset: {
      id: number
    } | null
    presets: Array<{
      id: number
      name: string
    }>
  }
  previewScene?: number
  programScene?: number
  isEditMode: boolean
}

function CameraControl (props: CameraControlProps): JSX.Element {
  const { camera, isEditMode, previewScene, programScene } = props

  const sceneId = camera.scene.id

  const current = camera.currentPreset?.id ?? null

  const isProgram = programScene === sceneId
  const isPreview = previewScene === sceneId

  const presets = camera.presets.map((preset) => {
    return <Preset isProgram={isProgram} isPreview={isPreview} key={preset.id} preset={preset} current={current} isEditMode={isEditMode} cameraId={camera.id} />
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

interface SceneButtonProps {
  scene: {
    id: number
    name: string
  }
  programScene: number | undefined
  previewScene: number | undefined
}

function SceneButton (props: SceneButtonProps): JSX.Element {
  const { scene, programScene, previewScene } = props

  const isProgram = programScene === scene.id
  const isPreview = previewScene === scene.id

  let color = 'bg-slate-2'

  if (isProgram) {
    color = 'bg-red-9 hover:bg-red-9'
  } else if (isPreview) {
    color = 'bg-green-9 hover:bg-green-10'
  }

  return (
    <ErrorableButton size='lg' className={`${color} text-2xl w-64 h-16`} mutation={useSetPreviewSceneMutation} options={{ variables: { id: scene.id }, refetchQueries: ['CameraControlInfo'] }}> {scene.name} </ErrorableButton>
  )
}

interface SceneControlProps {
  scenes: Array<{ id: number, name: string }>
  programScene: number | undefined
  previewScene: number | undefined
}

function SceneControl (props: SceneControlProps): JSX.Element {
  const buttons = props.scenes.map((scene) => {
    return <SceneButton key={scene.id} scene={scene} programScene={props.programScene} previewScene={props.previewScene} />
  })

  return (
    <div className='flex flex-col gap-4'>
      <h1 className='text-4xl text-slate-11'>Scenes</h1>
      {buttons}
    </div>
  )
}

export default function Page (): JSX.Element {
  const [isEditMode, setIsEditMode] = useState(false)
  const { data } = useCameraControlInfoQuery({ pollInterval: 500 })

  const editColor = isEditMode ? 'text-indigo-9 hover:text-indigo-10' : 'text-slate-11 hover:text-slate-10'

  if (data === undefined) return <></>

  const programScene = data.programScene?.id
  const previewScene = data.previewScene?.id

  const scenesWithoutCamera = data.scenes.filter((scene) => { return scene.camera === null })

  const cameras = data.cameras.map((camera) => {
    return <CameraControl key={camera.id} camera={camera} isEditMode={isEditMode} previewScene={previewScene} programScene={programScene} />
  })

  return (
    <div className='flex flex-col'>
      <Button className={editColor} variant='ghost' onClick={() => setIsEditMode(!isEditMode)}><Pencil /></Button>
      <div className='flex w-full justify-evenly text-center p-8'>
        {cameras}
        <SceneControl scenes={scenesWithoutCamera} previewScene={previewScene} programScene={programScene} />
      </div>
    </div>
  )
}
