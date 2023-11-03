import { ScheduledMatch } from "@/app/(interface)/interfaces"
import { JsonTopic } from "@/utils/maestro"
import { makeMatchName } from "../../field/[uuid]/field"


interface MatchResult {
    match: ScheduledMatch
    redScore: number
    blueScore: number
}

interface Team {
    number: string,
    name: string
}

interface AllianceInfoProps {
    team1: Team,
    team2: Team,
    color: 'red' | 'blue'
}

interface TeamInfoProps {
    team: Team
}

function TeamInfo(props: TeamInfoProps): JSX.Element {
    return <div className="flex flex-col gap-4">
        <h1 className="text-8xl">{props.team.number}</h1>
        <h2 className="text-3xl">{props.team.name}</h2>
        </div>
}

function AllianceInfo(props: AllianceInfoProps): JSX.Element {

    const color = props.color === 'red' ? 'text-right rounded-l-lg' : 'text-left rounded-r-lg'

    const border = props.color === 'red' ? 'border-r-8 border-red-9 pr-10' : 'border-l-8 border-blue-9 pl-10'

    return <div className={`bg-zinc-900 ${color} text-zinc-200 w-4/12 p-4 opacity-[.98]`}>
        <div className={`flex flex-col gap-10 py-6 ${border}`}>
            <TeamInfo team={props.team1} />
            <TeamInfo team={props.team2} />
        </div>
    </div>
}

interface ScoreProps {
    score: number,
    color: 'red' | 'blue'
}

function Scores(props: ScoreProps): JSX.Element {

    const color = props.color === 'red' ? 'text-right rounded-l-lg' : 'text-left rounded-r-lg'

    const border = props.color === 'red' ? 'border-r-8 border-red-9 pr-6' : 'border-l-8 border-blue-9 pl-10'

    return <div className={`bg-zinc-900 ${color} text-zinc-200 w-72 p-4 opacity-[.98]`}>
        <div className={`flex flex-col py-2 ${border} text-8xl`}>
            {props.score}
        </div> 
        </div>
}


export function ScoreDisplay(): JSX.Element {
    const results = JsonTopic<MatchResult | null>('results')
    const teamObj = JsonTopic<{teams: Team[]}>('teams')

    if(results === null || results === undefined || teamObj === undefined) return <></>

    const match = results.match

    const title = makeMatchName(match)

    const teams = teamObj.teams

    const redTeam1 = teams.find(team => team.number ===  match.red.team1)
    const redTeam2 = teams.find(team => team.number === match.red.team2)
    const blueTeam1 = teams.find(team => team.number === match.blue.team1)
    const blueTeam2 = teams.find(team => team.number === match.blue.team2)

    if(redTeam1 === undefined || redTeam2 === undefined || blueTeam1 === undefined || blueTeam2 === undefined) {
        return <></>
    }

    return <div className="flex flex-col text-center items-center">
         <h1 className="bg-zinc-900 w-10/12 text-zinc-200 text-7xl py-6 mt-16 rounded-lg font-sans opacity-[.98]">{title} Results</h1>
         <div className="flex justify-center gap-10 mt-24 w-screen">
             <AllianceInfo team1={redTeam1} team2={redTeam2} color='red' />
             <AllianceInfo team1={blueTeam1} team2={blueTeam2}  color='blue'/>
         </div>
         <div className="flex justify-center gap-10 w-screen mt-16">
             <Scores score={results.redScore} color='red'/>
             <Scores score={results.blueScore} color='blue'/>
         </div>
         </div>
}