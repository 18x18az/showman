import { makeShortMatchName } from "@/utils/strings/match"
import { FieldStatus } from "../interfaces"
import { Button } from "@/components/ui/button"
import { PlayIcon, StopIcon, TrackNextIcon } from "@radix-ui/react-icons"
import { EmptyPost } from "@/utils/maestro"

interface QueueingProps {
    active: FieldStatus | null
    next: FieldStatus | null
}

function MatchName(props: {title: string, status: FieldStatus |  null}): JSX.Element {
    let color = 'text-zinc-500'
    let name = '-'
        if(props.status !== null && props.status.match !== null) {
            name = makeShortMatchName(props.status.match)
            color = 'text-zinc-400'
        }
    return <>
        <h1 className="text-center text-2xl text-zinc-600 mb-2">{props.title}</h1>
        <h2 className={`text-center text-4xl ${color}`}>{name}</h2>
    </>
}

export function Queueing(props: QueueingProps): JSX.Element {
    let next = <h1 className="text-center text-zinc-800 text-4xl">-</h1>

    if(props.next !== null && props.next.match !== null) {
        const name = makeShortMatchName(props.next.match)
        next = <h1 className="text-center text-4xl text-zinc-400">{name}</h1>
    }

    const hasOnDeck = props.next !== null && props.next.match !== null
    const hasActive = props.active !== null && props.active.match !== null

    const makeActive = async () => {
        await EmptyPost('fieldControl/pushActive')
    }

    const clearActive = async () => {
        await EmptyPost('fieldControl/clearActive')
    }

    const firstButton = hasActive ? <Button variant='secondary' disabled={!hasOnDeck} onClick={() => {void clearActive()}}><StopIcon/></Button> : <Button variant='secondary' onClick={() => {void makeActive()}}disabled={!hasOnDeck}><PlayIcon /></Button>

    return <>
        <MatchName title="On Deck" status={props.next}/>
        <div className="flex justify-evenly gap-4 mt-6">
            {firstButton}
            <Button variant='secondary' disabled={!hasActive || !hasOnDeck} onClick={() => {void makeActive()}}><TrackNextIcon /></Button>
        </div>
    </>
}