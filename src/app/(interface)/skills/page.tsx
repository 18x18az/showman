'use client'
import { useState } from 'react'
import { Dropdown } from '../../../components/primitives/Dropdown'
import { CONTROL_MODE, Field, FieldControlSubscription, FieldsSubscription } from '@/contracts/fields'
import { Button } from '../../../components/ui/button'
import { StopTimeSubscription, queueDriverSkillsMatch, queueProgrammingSkillsMatch, startSkillsMatch, stopSkillsMatch } from '@/contracts/skills'

function StartButton (props: { mode: CONTROL_MODE | undefined, fieldId: number, duration: number | null }): JSX.Element {
  const { mode, duration } = props

  const canStart = mode !== undefined && duration !== null

  let startText = ''

  if (mode === CONTROL_MODE.AUTO && canStart) {
    startText = 'Auto'
  } else if (mode === CONTROL_MODE.DRIVER && canStart) {
    startText = 'Driver'
  }

  return <Button disabled={!canStart} className='w-44 h-12' onClick={() => { void startSkillsMatch(props.fieldId) }}>Start {startText}</Button>
}

function EndButton (props: { fieldId: number }): JSX.Element {
  return <Button className='w-44 h-12' onClick={() => { void stopSkillsMatch(props.fieldId) }}>End Early</Button>
}
function StartStopButton (props: { mode: CONTROL_MODE | undefined, endTime: string | null, fieldId: number, duration: number | null }): JSX.Element {
  if (props.endTime === null) {
    return <StartButton mode={props.mode} duration={props.duration} fieldId={props.fieldId} />
  } else {
    return <EndButton fieldId={props.fieldId} />
  }
}

function SkillsControl (props: { field: Field }): JSX.Element {
  const { field } = props
  const fieldId = field.id

  const fieldControl = FieldControlSubscription(field.id) ?? null
  const stopTime = StopTimeSubscription(field.id) ?? null
  const mode = fieldControl?.mode
  const endTime = fieldControl?.endTime ?? null
  const duration = fieldControl?.duration ?? null

  const canChange = endTime === null

  return (
    <div className='flex flex-col gap-8 w-full items-center'>
      <h1 className='text-4xl'>{field.name}</h1>
      <div className='flex gap-4'>
        <Button disabled={!canChange} className='w-32 h-12' onClick={() => { void queueDriverSkillsMatch(fieldId) }}>Driver</Button>
        <Button disabled={!canChange} className='w-32 h-12' onClick={() => { void queueProgrammingSkillsMatch(fieldId) }}>Programming</Button>
      </div>
      <StartStopButton mode={mode} endTime={endTime} duration={duration} fieldId={fieldId} />
      <h2 className='text-2xl'>{stopTime}</h2>
    </div>
  )
}

function SkillsMenu (props: { fields: Field[] }): JSX.Element {
  const fieldOptions = props.fields.map((field) => field.name)
  const [field, setField] = useState(fieldOptions[0])
  const fullField = props.fields.find(option => { return option.name === field })
  if (fullField === undefined) return <></>
  return (
    <div className='w-full'>
      <Dropdown options={fieldOptions} value={field} onChange={setField} />
      <SkillsControl field={fullField} />
    </div>
  )
}
export default function Page (): JSX.Element {
  const fields = FieldsSubscription()

  if (fields === undefined) {
    return <>Loading</>
  }

  const skillsFields = fields.filter(field => { return field.isSkills })

  return <SkillsMenu fields={skillsFields} />
}
