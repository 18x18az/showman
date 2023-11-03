// 'use client'

// import { JsonTopic } from "@/utils/maestro"
// import { makeMatchName } from "../field/[uuid]/field"

// interface Alliance {
//     team1: string,
//     team2: string
// }

// interface MatchResult {
//     round: number,
//     match: number,
//     sitting: number,
//     blueScore: number,
//     redScore: number,
//     red: Alliance,
//     blue: Alliance
// }

// interface Team {
//     number: string,
//     name: string
// }

// interface AllianceInfoProps {
//     team1: Team,
//     team2: Team,
//     color: 'red' | 'blue'
// }

// interface TeamInfoProps {
//     team: Team
// }

// function TeamInfo(props: TeamInfoProps): JSX.Element {
//     return <div className="flex flex-col gap-4">
//         <h1 className="text-8xl">{props.team.number}</h1>
//         <h2 className="text-3xl">{props.team.name}</h2>
//         </div>
// }

// function AllianceInfo(props: AllianceInfoProps): JSX.Element {

//     const color = props.color === 'red' ? 'text-right rounded-l-lg' : 'text-left rounded-r-lg'

//     const border = props.color === 'red' ? 'border-r-8 border-red-9 pr-10' : 'border-l-8 border-blue-9 pl-10'

//     return <div className={`bg-zinc-900 ${color} text-zinc-200 w-4/12 p-4 opacity-[.998]`}>
//         <div className={`flex flex-col gap-10 py-6 ${border}`}>
//             <TeamInfo team={props.team1} />
//             <TeamInfo team={props.team2} />
//         </div>
//     </div>
// }

// interface ScoreProps {
//     score: number,
//     color: 'red' | 'blue'
// }

// function Scores(props: ScoreProps): JSX.Element {

//     const color = props.color === 'red' ? 'text-right rounded-l-lg' : 'text-left rounded-r-lg'

//     const border = props.color === 'red' ? 'border-r-8 border-red-9 pr-6' : 'border-l-8 border-blue-9 pl-10'

//     return <div className={`bg-zinc-900 ${color} text-zinc-200 w-72 p-4 opacity-[.998]`}>
//         <div className={`flex flex-col py-2 ${border} text-8xl`}>
//             {props.score}
//         </div> 
//         </div>
// }

// export default function Page(): JSX.Element {
//     const result = JsonTopic<MatchResult>('matchResult', null as unknown as MatchResult)
//     const teams = JsonTopic<Team[]>('teams', [])

//     if(result === null) {
//         return <></>
//     }

//     const title = makeMatchName({ round: result.round, match: result.match, sitting: result.sitting })

//     const redTeam1 = teams.find(team => team.number === result.red.team1)
//     const redTeam2 = teams.find(team => team.number === result.red.team2)
//     const blueTeam1 = teams.find(team => team.number === result.blue.team1)
//     const blueTeam2 = teams.find(team => team.number === result.blue.team2)

//     if(redTeam1 === undefined || redTeam2 === undefined || blueTeam1 === undefined || blueTeam2 === undefined) {
//         return <></>
//     }

//     return <div className="flex flex-col text-center items-center">
//         <h1 className="bg-zinc-900 w-10/12 text-zinc-200 text-7xl py-6 mt-16 rounded-lg font-sans opacity-[.998]">{title} Results</h1>
//         <div className="flex justify-center gap-10 mt-24 w-screen">
//             <AllianceInfo team1={redTeam1} team2={redTeam2} color='red' />
//             <AllianceInfo team1={blueTeam1} team2={blueTeam2}  color='blue'/>
//         </div>
//         <div className="flex justify-center gap-10 w-screen mt-16">
//             <Scores score={result.redScore} color='red'/>
//             <Scores score={result.blueScore} color='blue'/>
//         </div>
//         </div>
// }

export default function Page(): JSX.Element {
    return <></>    
}