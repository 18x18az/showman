'use client'
import Logo from '@/components/primitives/logo'
import { EyeIcon, PlayIcon } from 'lucide-react'
import { MatchStage, SittingInformationFragment, SittingWithTeamsFragment, usePutLiveMutation, useRefereeInformationQuery, useStartFieldMutation } from '../../../__generated__/graphql'
import { makeMatchName } from '../../../utils/strings/match'
import ErrorableButton from '../../../components/errorable-button/ErrorableButton'

interface TeamInformation {
  number: string
  name: string
}

function TeamDisplay (props: TeamInformation): JSX.Element {
  return (
    <div>
      <h4 className='text-center text-2xl'>{props.number}</h4>
      <h5 className='text-center text-xl text-slate-400'>{props.name}</h5>
    </div>
  )
}

function AllianceDisplay (props: { teams: TeamInformation[], color: 'red' | 'blue' }): JSX.Element {
  const title = props.color === 'red' ? 'Red Alliance' : 'Blue Alliance'
  const fontColor = props.color === 'red' ? 'text-red-500' : 'text-blue-500'

  const teams = props.teams.map((team) => {
    return <TeamDisplay number={team.number} name={team.name} key={team.number} />
  })

  return (
    <div className='flex flex-col gap-2 mb-6'>
      <h3 className={`text-lg ${fontColor}`}>{title}</h3>
      {teams}
    </div>
  )
}

interface SittingInformation {
  identifier: SittingInformationFragment
  red: TeamInformation[]
  blue: TeamInformation[]
}

interface FieldInfo {
  id: number
  name: string
}

function PageContent (props: { sitting: SittingInformation, field: FieldInfo, isLive: boolean, stage: MatchStage }): JSX.Element {
  const { sitting, isLive, stage, field } = props
  const name = makeMatchName(sitting.identifier)

  const canStart = isLive && (stage === MatchStage.Queued || stage === MatchStage.ScoringAuton)

  return (
    <div className='flex flex-col gap-2 text-center p-4 justify-between h-full'>
      <h1 className='my-2 text-3xl text-slate-100'>{name}</h1>
      <h2 className='text-2xl mb-4 text-slate-500'>{field.name}</h2>
      <AllianceDisplay teams={sitting.red} color='red' />
      <AllianceDisplay teams={sitting.blue} color='blue' />
      <div className='flex-1 grow' />
      <div className='flex justify-evenly mb-12'>
        <ErrorableButton tooltip='Push Field Live' className='p-8' mutation={usePutLiveMutation} disabled={isLive}><EyeIcon size={48} /></ErrorableButton>
        <ErrorableButton tooltip='Start Field' className='p-8' mutation={useStartFieldMutation} options={{ variables: { fieldId: field.id } }} disabled={!canStart}><PlayIcon size={48} /></ErrorableButton>
      </div>
    </div>
  )
}

interface LiveFieldControlInformation extends FieldControlInformation {
  stage: MatchStage
}

interface FieldControlInformation {
  sitting: SittingInformation
  field: FieldInfo
}

function LiveFieldControl (props: LiveFieldControlInformation): JSX.Element {
  return <PageContent sitting={props.sitting} field={props.field} stage={props.stage} isLive />
}

function NextFieldControl (props: FieldControlInformation): JSX.Element {
  return <PageContent sitting={props.sitting} field={props.field} stage={MatchStage.Queued} isLive={false} />
}

function makeSittingInformation (sitting: SittingWithTeamsFragment): SittingInformation {
  const identifier = sitting
  const red = sitting.contest.redTeams.map((team) => {
    return {
      number: team.number,
      name: team.name
    }
  })
  const blue = sitting.contest.blueTeams.map((team) => {
    return {
      number: team.number,
      name: team.name
    }
  })
  return {
    identifier,
    red,
    blue
  }
}

export default function Page (): JSX.Element {
  const { data } = useRefereeInformationQuery({
    pollInterval: 200
  })

  if (data === undefined || data.competitionInformation === null) return <Logo />

  const { liveField, onDeckField } = data.competitionInformation
  const liveComp = liveField?.competition
  const liveSitting = liveComp?.onFieldSitting
  const onDeckComp = onDeckField?.competition
  const onDeckSitting = onDeckComp?.onFieldSitting

  if (liveField !== null && liveComp !== null && liveComp !== undefined && liveSitting !== null && liveSitting !== undefined) {
    const field = {
      id: liveField.id,
      name: liveField.name
    }
    return <LiveFieldControl stage={liveComp.stage} field={field} sitting={makeSittingInformation(liveSitting)} />
  } else if (onDeckField !== null && onDeckComp !== null && onDeckComp !== undefined && onDeckSitting !== null && onDeckSitting !== undefined) {
    const field = {
      id: onDeckField.id,
      name: onDeckField.name
    }
    return <NextFieldControl field={field} sitting={makeSittingInformation(onDeckSitting)} />
  } else {
    return <Logo />
  }
}
