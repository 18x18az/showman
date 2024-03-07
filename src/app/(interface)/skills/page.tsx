'use client'
import { useState } from 'react'
import { Dropdown } from '../../../primitives/dropdown/Dropdown'
import { Control_Mode, useQueueDriverSkillsMutation, useQueueProgrammingSkillsMutation, useSkillsFieldQuery, useSkillsFieldsQuery, useStartFieldMutation, useStopFieldMutation } from '../../../__generated__/graphql'
import ErrorableButton from '../../../components/errorable-button/ErrorableButton'

function StartButton (props: { mode: Control_Mode | null, fieldId: number, duration: number | null }): JSX.Element {
  const { mode, duration } = props

  const canStart = mode !== null && duration !== null

  let startText = ''

  if (mode === Control_Mode.Auto && canStart) {
    startText = 'Auto'
  } else if (mode === Control_Mode.Driver && canStart) {
    startText = 'Driver'
  }

  return <ErrorableButton mutation={useStartFieldMutation} options={{ variables: { fieldId: props.fieldId }, refetchQueries: ['SkillsField'] }} disabled={!canStart} className='w-44 h-12'>Start {startText}</ErrorableButton>
}

function EndButton (props: { fieldId: number }): JSX.Element {
  return <ErrorableButton mutation={useStopFieldMutation} options={{ variables: { fieldId: props.fieldId }, refetchQueries: ['SkillsField'] }} className='w-44 h-12'>End Early</ErrorableButton>
}

function StartStopButton (props: { mode: Control_Mode | null, endTime: string | null, fieldId: number, duration: number | null }): JSX.Element {
  if (props.endTime === null) {
    return <StartButton mode={props.mode} duration={props.duration} fieldId={props.fieldId} />
  } else {
    return <EndButton fieldId={props.fieldId} />
  }
}

function SkillsControl (props: { field: number }): JSX.Element {
  const { data } = useSkillsFieldQuery({ pollInterval: 500, variables: { fieldId: props.field } })

  if (data === undefined) {
    return <>Loading...</>
  }

  const endTime = data.field.fieldControl?.endTime ?? null
  let mode = data.field.fieldControl?.mode ?? null

  const stopTime = data.field.skills?.stopTime ?? null

  const canChange = endTime === null

  if (stopTime !== null) {
    mode = null
  }

  let stopTimeText = ''
  if (stopTime !== null) {
    const stopTimeSeconds = Math.ceil(stopTime / 1000)
    stopTimeText = stopTimeSeconds.toString().padStart(2, '0')
  }

  return (
    <div className='flex flex-col gap-8 w-full items-center mt-8'>
      <h1 className='text-4xl'>{data.field.name}</h1>
      <div className='flex gap-4'>
        <ErrorableButton mutation={useQueueDriverSkillsMutation} options={{ variables: { fieldId: data.field.id }, refetchQueries: ['SkillsField'] }} disabled={!canChange} className='w-32 h-12'>Driver</ErrorableButton>
        <ErrorableButton mutation={useQueueProgrammingSkillsMutation} options={{ variables: { fieldId: data.field.id }, refetchQueries: ['SkillsField'] }} disabled={!canChange} className='w-32 h-12'>Programming</ErrorableButton>
      </div>
      <StartStopButton mode={mode} endTime={endTime} duration={60} fieldId={data.field.id} />
      <h2 className='text-2xl'>{stopTimeText}</h2>
    </div>
  )
}

interface FieldInfo {
  id: number
  name: string
  canRunSkills: boolean
}

function SkillsMenu (props: { fields: FieldInfo[] }): JSX.Element {
  const skillsFields = props.fields.filter((field) => { return field.canRunSkills })
  const fieldOptions = skillsFields.map((field) => field.name)
  const [field, setField] = useState(fieldOptions[0])
  const fullField = skillsFields.find(option => { return option.name === field })
  if (fullField === undefined) return <></>

  return (
    <div className='w-full h-dvh flex flex-col items-center py-8'>
      <Dropdown size='L' options={fieldOptions} value={field} onChange={setField} />
      <SkillsControl field={fullField.id} />
    </div>
  )
}
export default function Page (): JSX.Element {
  const { data } = useSkillsFieldsQuery({ pollInterval: 500 })

  if (data === undefined) {
    return <>Loading</>
  }

  const skillsFields = data.fields

  return <SkillsMenu fields={skillsFields} />
}
