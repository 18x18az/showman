'use client'
import { useState } from 'react'
import { Dropdown } from '../../../components/primitives/Dropdown'
import { Button } from '../../../primitives/button/Button'
import { Control_Mode, useQueueDriverSkillsMutation, useQueueProgrammingSkillsMutation, useSkillsFieldQuery, useSkillsFieldsQuery, useStartFieldMutation, useStopFieldMutation } from '../../../__generated__/graphql'

function StartButton (props: { mode: Control_Mode | null, fieldId: number, duration: number | null }): JSX.Element {
  const [startSkillsMatch] = useStartFieldMutation({ variables: { fieldId: props.fieldId }, refetchQueries: ['SkillsField'] })
  const { mode, duration } = props

  const canStart = mode !== null && duration !== null

  let startText = ''

  if (mode === Control_Mode.Auto && canStart) {
    startText = 'Auto'
  } else if (mode === Control_Mode.Driver && canStart) {
    startText = 'Driver'
  }

  return <Button disabled={!canStart} className='w-44 h-12' onClick={() => { void startSkillsMatch() }}>Start {startText}</Button>
}

function EndButton (props: { fieldId: number }): JSX.Element {
  const [stopSkillsMatch] = useStopFieldMutation({ variables: { fieldId: props.fieldId }, refetchQueries: ['SkillsField'] })
  return <Button className='w-44 h-12' onClick={() => { void stopSkillsMatch() }}>End Early</Button>
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
  const [queueDriverSkillsMatch] = useQueueDriverSkillsMutation({ variables: { fieldId: props.field }, refetchQueries: ['SkillsField'] })
  const [queueProgrammingSkillsMatch] = useQueueProgrammingSkillsMutation({ variables: { fieldId: props.field }, refetchQueries: ['SkillsField'] })

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
    stopTimeText = stopTimeSeconds.toString()
  }

  return (
    <div className='flex flex-col gap-8 w-full items-center mt-8'>
      <h1 className='text-4xl'>{data.field.name}</h1>
      <div className='flex gap-4'>
        <Button disabled={!canChange} className='w-32 h-12' onClick={() => { void queueDriverSkillsMatch() }}>Driver</Button>
        <Button disabled={!canChange} className='w-32 h-12' onClick={() => { void queueProgrammingSkillsMatch() }}>Programming</Button>
      </div>
      <StartStopButton mode={mode} endTime={endTime} duration={60} fieldId={data.field.id} />
      <h2 className='text-2xl'>{stopTimeText}</h2>
    </div>
  )
}

interface FieldInfo {
  id: number
  name: string
}

function SkillsMenu (props: { fields: FieldInfo[] }): JSX.Element {
  const fieldOptions = props.fields.map((field) => field.name)
  const [field, setField] = useState(fieldOptions[0])
  const fullField = props.fields.find(option => { return option.name === field })
  if (fullField === undefined) return <></>

  return (
    <div className='w-full h-screen flex flex-col items-center py-8'>
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
