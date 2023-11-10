'use client'

import { EmptyPost, JsonTopic, Post } from "@/utils/maestro"
import { Alliance, Field, FieldStatus, Match, MatchStatus } from "../interfaces"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { makeShortMatchName } from "@/utils/strings/match"

function RemoveButton(props: {match: Match}): JSX.Element {

    const handle = async () => {
        await Post('fieldControl/remove', {match: props.match.id})
    }

    return <DropdownMenuItem onClick={() => {void handle()}}>Remove</DropdownMenuItem>
}

function ReplayButton(props: {match: Match}): JSX.Element {

    const handle = async () => {
        await Post('fieldControl/replay', {match: props.match.id})
    }

    return <DropdownMenuItem onClick={() => {handle()}}>Replay</DropdownMenuItem>
}

function MoveButton(props: {match: Match, target: Field}): JSX.Element {
    let color = 'text-zinc-100'
    if(props.target.id === props.match.fieldId) {
        color = 'text-green-700'
    }

    const handle = async () => {
        await Post(`fieldControl/move`, {match: props.match.id, targetField: props.target.id})
    }

    return <DropdownMenuItem onClick={() => {void handle()}} className={`${color}`}>Move to {props.target.name}</DropdownMenuItem>
}

function QueueButton(props: {field: Field}): JSX.Element {
    const handle = async () => {
        await Post(`fieldControl/markNext`, {field: props.field.id})
    }
    return <DropdownMenuItem onClick={() => {void handle()}}>Queue {props.field.name}</DropdownMenuItem>
}

function SingleAlliance(props: {alliance: Alliance, color: 'red' | 'blue'}): JSX.Element {
    const teams = [props.alliance.team1]
    if(props.alliance.team2 !== undefined) {
        teams.push(props.alliance.team2)
    }

    const teamElements = teams.map((team) => {
        const color = props.color === 'red' ? 'text-red-700 text-left' : 'text-blue-700 text-right'

        return <div key={team} className={`flex flex-col text-lg ${color}`}>{team}</div>
    })
    return <div>
        {teamElements}
    </div>
}

interface AlliancesProps {
    red?: Alliance
    blue?: Alliance
}

function Alliances(props: AlliancesProps): JSX.Element {
    if(props.red === undefined || props.blue === undefined) {
        return <></>
    }
    return <div className='flex justify-between px-3 mb-2'>
        <SingleAlliance color='red' alliance={props.red} />
        <SingleAlliance color='blue' alliance={props.blue} />
    </div>
}

interface UnqueuedInfoProps {
    match: Match,
    statuses: FieldStatus[]
}

function UnqueuedInfo(props: UnqueuedInfoProps): JSX.Element {

    const name = makeShortMatchName(props.match)

    const fieldName = props.match.fieldName ?? ''

    const dropdownItems = props.statuses.flatMap((status) => {
        const isOpen = status.onDeck !== null
        if(isOpen) return []
        const hasMatch = status.match !== null

        const text = hasMatch ? `Queue on ${status.field.name}` : `Put on ${status.field.name}`

        let color = 'text-zinc-100'

        if(status.field.id === props.match.fieldId) {
            color = 'text-green-700'
        }

        const handle = async () => {
            await Post(`fieldControl/queue/field/${status.field.id}`, {match: props.match.id})
        }

        return <DropdownMenuItem className={`${color}`} onClick={() => {void handle()}} key={status.field.id}>{text}</DropdownMenuItem>
    })

    return <div className="rounded-md flex flex-col w-32 h-32 border border-zinc-800 justify-between">
        <div className="flex justify-end">
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={"ghost"} className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"><DotsHorizontalIcon /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
            {dropdownItems}
            </DropdownMenuContent>
        </DropdownMenu>
        </div>
        <h1 className="text-center text-xl font-sans">{name}</h1>
        <h2 className="text-center text-sm text-zinc-700 mb-2 mt-4">{fieldName}</h2>
    </div>
}

export function MatchName(props: {match: Match}): JSX.Element {
    const text = makeShortMatchName(props.match)

    return <h1 className="text-3xl text-zinc-400 text-center">{text}</h1>
}

interface FieldDisplayProps extends MatchDisplayProps {
    activeField: FieldStatus | null
    nextField: FieldStatus | null
}

export function FieldDisplay(props: FieldDisplayProps): JSX.Element {
    if(props.match === null) {
        return <div className="border border-zinc-900 rounded-md flex-1 mb-4 flex flex-col justify-evenly text-4xl h-full text-center text-zinc-800">
            Empty
        </div>
    }

    let statusText = <></>

    if(props.match.status === MatchStatus.SCORING) {
        statusText = <>Scoring</>
    }

    const isActive = props.activeField !== null && props.activeField.match !== null && props.activeField.match.id === props.match.id
    const isNext = props.nextField !== null && props.nextField.match !== null && props.nextField.field.id === props.field.id
    const canQueue = !(isActive || isNext)

    const isOnCorrectField = props.match.fieldId === undefined || props.match.fieldId === props.field.id
    let borderColor = 'border-zinc-700'

    if (!isOnCorrectField) borderColor = 'border-yellow-900'

    if(isNext) borderColor = 'border-green-950'

    if(isActive) borderColor = 'border-green-700'

    const options: JSX.Element[] = []

    if(canQueue) {
        options.push(<QueueButton field={props.field} key="queue"/>)
    }

    options.push(<RemoveButton match={props.match} key="remove"/>)
    options.push(<ReplayButton match={props.match} key="replay"/>)

    props.openFields.forEach((field) => {
        if(field.id === props.field.id) return
        options.push(<MoveButton match={props.match as Match} target={field} key={field.id}/>)
    })

    return <div className={`border ${borderColor} rounded-md flex-1 mb-4 flex flex-col`}>
    <div className="flex justify-end">
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={"ghost"} className="flex h-8 w-8 p-0 mr-1 data-[state=open]:bg-muted"><DotsHorizontalIcon /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {options}
            </DropdownMenuContent>
        </DropdownMenu>
        </div>
        <MatchName match={props.match}/>
        <h1 className="text-center text-4xl mt-16 text-zinc-500">{statusText}</h1>
        <div className="flex-1"></div>
        <Alliances red={props.match.red} blue={props.match.blue} />
    </div>
}

interface MatchDisplayProps {
    match: Match | null
    field: Field
    openFields: Field[]
}

export function QueueDisplay(props: MatchDisplayProps): JSX.Element {
    if(props.match === null) {
        return <div className="border-zinc-900 rounded-md flex-1 flex flex-col" />
    }

    const isOnCorrectField = props.match.fieldId === undefined || props.match.fieldId === props.field.id
    let borderColor = 'border-zinc-700'

    if (!isOnCorrectField) borderColor = 'border-yellow-900'

    const options: JSX.Element[] = []

    options.push(<RemoveButton match={props.match} key="remove"/>)

    props.openFields.forEach((field) => {
        if(field.id === props.field.id) return
        options.push(<MoveButton match={props.match as Match} target={field} key={field.id}/>)
    })

    return <div className={`border ${borderColor} rounded-md flex-1 flex flex-col`}>
    <div className="flex justify-end">
        
    <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={"ghost"} className="flex h-8 w-8 p-0 mr-1 data-[state=open]:bg-muted"><DotsHorizontalIcon /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {options}
            </DropdownMenuContent>
        </DropdownMenu>
    </div>
    <MatchName match={props.match}/>
    <div className="flex-1"></div>
        <Alliances red={props.match.red} blue={props.match.blue} />
    </div>
}

interface FieldControlProps {
    activeField: FieldStatus | null
    nextField: FieldStatus | null
}

export function FieldControl(props: FieldControlProps): JSX.Element {
    const statuses = JsonTopic<FieldStatus[]>('fieldStatuses')
    let unqueued = JsonTopic<Match[]>('unqueued')

    if(statuses === undefined || unqueued === undefined) {
        return <>Loading...</>
    }

    unqueued = unqueued.slice(0, 7)

    const openFields = statuses.filter((status) => status.onDeck === null).map((status) => status.field)

    const columns = statuses.map((status) => {
        return <div className="flex flex-col gap-8 w-96 mb-8" key={status.field.id}>
            <h1 className="text-center text-2xl font-sans text-zinc-500">{status.field.name}</h1>
            <FieldDisplay field={status.field} match={status.match} openFields={openFields} activeField={props.activeField} nextField={props.nextField}/>
            <QueueDisplay field={status.field} match={status.onDeck} openFields={openFields}/>
        </div>
    })

    let unqueuedInfo = <></>
    

    if(unqueued.length > 0) {
        unqueuedInfo = <>{unqueued.map((match) => <UnqueuedInfo match={match} statuses={statuses} key={match.id}/>)}</>
    } else {
        const allFieldsEmpty = statuses.every((status) => status.match === null)
        if(allFieldsEmpty) {
            unqueuedInfo = <div className="rounded-md flex-1 flex flex-col justify-center items-center h-full">
                <Button onClick={() => {void EmptyPost('matches/proceed')}} variant='secondary' className="text-4xl p-6 py-8">Queue Next Block</Button>
            </div>
        } else {
            unqueuedInfo = <div className="rounded-md flex-1 flex flex-col justify-center">
                <h1 className="text-center text-4xl font-sans text-zinc-700">No remaining unqueued matches.</h1>
            </div>
        }
    }

    return <div className="flex flex-col gap-4 h-full">
            <div className="flex gap-4 justify-evenly flex-1">{columns}</div>
            <div className="flex gap-4 h-32">{unqueuedInfo}</div>
        </div>
}