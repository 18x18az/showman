import { IAlliance, IFieldState, IMatchList, ITeams, TeamId } from "@18x18az/rosetta";
import { Fragment } from "react";
import { getMatchByString } from "../../utils/Match";
import { makeMatchName } from "../../utils/TextGenerator";

interface ITeamInfoProps {
    teams: ITeams
    team: TeamId
}

function TeamInfo(props: ITeamInfoProps) {
    const team = props.teams[props.team];
    return (
        <div>
            <h1>{team.number} - {team.name}</h1>
            <h2>{team.school}</h2>
            <h2>{team.location}</h2>
        </div>
    )
}

interface IAllianceInfoProps {
    color: "RED" | "BLUE"
    alliance: IAlliance
    teams: ITeams
}

function AllianceInfo(props: IAllianceInfoProps) {
    const team1 = <TeamInfo teams={props.teams} team={props.alliance.team1} />
    let team2;
    if (props.alliance.team2) {
        team2 = <TeamInfo teams={props.teams} team={props.alliance.team2} />
    }
    return (
        <div className={props.color}>
            <h1>
                {props.color}
            </h1>
            {team1}
            {team2}
        </div>
    )
}

export interface IMatchInterface {
    fieldState: IFieldState | null
    matches: IMatchList
    teams: ITeams
}

export function Match(props: IMatchInterface) {
    if (!props.fieldState) {
        return <Fragment />
    }

    const match = getMatchByString(props.fieldState.match, props.matches);

    if (!match) {
        return <Fragment />
    }

    const matchName = makeMatchName(match);

    return (
        <div>
            <h1>{matchName}</h1>
            <h2>Field {props.fieldState.field}</h2>
            <AllianceInfo teams={props.teams} color="RED" alliance={match.red} />
            <AllianceInfo teams={props.teams} color="BLUE" alliance={match.blue} />
        </div>
    )
}
