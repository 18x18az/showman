import { AllianceIndicator } from "./AllianceIndicator"

interface MatchOverlayProps {
    redTeams: string[]
    blueTeams: string[]
}

export function MatchOverlay(props: MatchOverlayProps): JSX.Element {
    return <>
    <AllianceIndicator alliance="red" teams={props.redTeams}/>
    <AllianceIndicator alliance="blue" teams={props.blueTeams}/>
    </>
}