'use client'

import { EmptyPost, JsonTopic } from "@/utils/maestro"
import { Alliance, FieldState, FieldStatus, MatchStatus } from "../interfaces"
import Logo from "@/components/primitives/logo"
import { makeMatchName } from "@/app/display/field/[uuid]/field"
import { Button } from "@/components/ui/button"
import { EyeIcon, PlayIcon } from "lucide-react"

export enum DisplayState {
  UNKNOWN = 'UNKNOWN',
  MATCH = 'MATCH',
  RESULTS = 'RESULTS',
  TRANSITIONING = 'TRANSITIONING',
}

function StartButton(props: {disabled: boolean}): JSX.Element {
  const handler = async () => {
      await EmptyPost('fieldControl/start')
  }

  return <Button className='p-8' disabled={props.disabled} onClick={() => {void handler()}}><PlayIcon size={48}/></Button>
}

interface TeamInformation {
  number: string
  name: string
  location: string
  school: string
}

function DisplayButton(props: {disabled: boolean}): JSX.Element {
  const handler = async () => {
      await EmptyPost('fieldControl/pushActive')
  }

  return <Button className='p-8' disabled={props.disabled} onClick={() => {void handler()}}><EyeIcon size={48}/></Button>
}

function TeamDisplay(props: {team: string | undefined, teams: TeamInformation[]}): JSX.Element {
  if(props.team === undefined) return <></>
  const match = props.teams.find((team) => team.number === props.team)
  if(match === undefined) return <></>
  return <div>
    <h4 className="text-center text-2xl">{match.number}</h4>
    <h5 className="text-center text-xl text-slate-400">{match.name}</h5>
  </div>
}

function AllianceDisplay(props: {alliance: Alliance, color: 'red' | 'blue', teams: TeamInformation[]}): JSX.Element {
  const title = props.color === 'red' ? 'Red Alliance' : 'Blue Alliance'
  const fontColor = props.color === 'red' ? 'text-red-500' : 'text-blue-500'
  return <div className="flex flex-col gap-2 mb-6">
    <h3 className={`text-lg ${fontColor}`}>{title}</h3>
    <TeamDisplay team={props.alliance.team1} teams={props.teams} />
    <TeamDisplay team={props.alliance.team2} teams={props.teams} />
  </div>
}

export default function Page (): JSX.Element {
    const fieldControl = JsonTopic<FieldStatus | null>('activeField')
    const displayControl = JsonTopic<{stage: DisplayState}>('displayStage')
    const next = JsonTopic<FieldStatus | null>('nextField')
    const teams = JsonTopic<{teams: TeamInformation[]}>('teams')

    if(fieldControl === undefined || displayControl === undefined || next === undefined || teams === undefined) return <></>

    let referenced = undefined
    if(fieldControl !== null && fieldControl.match !== null) referenced = fieldControl
    else if(next !== null && next.match !== null) referenced = next

    const stage = displayControl.stage

    let body = <Logo />

    if (referenced !== undefined) {

        const preIntro = stage === DisplayState.RESULTS || stage === DisplayState.UNKNOWN
        const nextMatchReady = next !== null && next.match !== null && next.match.status !== MatchStatus.SCORING
        const canGoToNext = preIntro && nextMatchReady

        const canStart = stage === DisplayState.MATCH && fieldControl !== null && fieldControl.state === FieldState.IDLE

        const canResume = stage === DisplayState.MATCH && fieldControl !== null && fieldControl.state === FieldState.PAUSED

        const name = makeMatchName(referenced.match)
        body = <div className="flex flex-col gap-2 text-center p-4 justify-between h-full">
        <h1 className="my-2 text-3xl text-slate-100">{name}</h1>
        <h2 className="text-2xl mb-4 text-slate-500">{referenced.field.name}</h2>
        <AllianceDisplay alliance={referenced.match!.red} color='red' teams={teams.teams}/>
        <AllianceDisplay alliance={referenced.match!.blue} color='blue' teams={teams.teams} />
        <div className="flex-1 grow"></div>
        <div className="flex justify-evenly mb-12">
        <DisplayButton disabled={!canGoToNext} />
        <StartButton disabled={!canStart && !canResume} />
        </div>
        </div>
    }

    return (
        <>{body}</>
    )
}