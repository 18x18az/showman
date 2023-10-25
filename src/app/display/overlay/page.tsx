'use client'

import { FieldState, FieldStatus } from "@/app/(interface)/interfaces"
import { MatchOverlay, MatchPeriod } from "@/components/objects/match/MatchOverlay"
import { JsonTopic } from "@/utils/maestro"
import { makeMatchName } from "../field/[uuid]/field"
import { offsetTimer } from "../field/[uuid]/timer"

export default function Page(): JSX.Element {
    const competition = JsonTopic<FieldStatus>('fieldControl', {state: FieldState.IDLE, name: 'None', id: 0})

    if(competition.redAlliance === undefined) return <></>
    if(competition.blueAlliance === undefined) return <></>

    const redTeams = [competition.redAlliance.team1]
    if(competition.redAlliance.team2 !== undefined) redTeams.push(competition.redAlliance.team2)
    const blueTeams = [competition.blueAlliance.team1]
    if(competition.blueAlliance.team2 !== undefined) blueTeams.push(competition.blueAlliance.team2)

    const matchName = makeMatchName(competition.match)

    let period = MatchPeriod.None
    if(competition.state === FieldState.AUTO) period = MatchPeriod.Auto
    if(competition.state === FieldState.DRIVER) period = MatchPeriod.Driver

    let time = competition.time
    if(competition.state !== FieldState.AUTO && competition.state !== FieldState.DRIVER) time = undefined

    return <MatchOverlay time={time} title={matchName} period={period} redTeams={redTeams} blueTeams={blueTeams}/>
}