import { IAllianceTeams, IFieldState, IMatchInfo, IMatchList, ITeams } from "@18x18az/rosetta";
import { Fragment } from "react"
import { getNextMatches } from "../../../utils/Match";
import { makeShortMatchName } from "../../../utils/TextGenerator";

interface AllianceInfoProps {
    alliance: string | IAllianceTeams
    teamInfo: ITeams
    color: "red" | "blue"
}

export const AllianceInfo = (props: AllianceInfoProps) => {
    const alliance = props.alliance
    let info = <Fragment />

    if (typeof alliance === 'string') {
        info = <div>props.teamInfo[alliance].number;</div>
    } else {
        const team1 = props.teamInfo[alliance.team1].number;
        const team2 = props.teamInfo[alliance.team2].number;
        info = <Fragment>
            <div className="team">
                {team1}
            </div>
            <div className="team">
                {team2}
            </div>
        </Fragment>
    }
    return (
        <div className={`alliance ${props.color}`}>
            {info}
        </div>
    )
}

interface MatchInfoProps {
    match: IMatchInfo
    teamInfo: ITeams
}

export const MatchInfo = (props: MatchInfoProps) => {
    const matchName = makeShortMatchName(props.match)

    return (
        <div className="match">
            <div className="name">{matchName}</div>
            <AllianceInfo alliance={props.match.red} teamInfo={props.teamInfo} color="red"/>
            <AllianceInfo alliance={props.match.blue} teamInfo={props.teamInfo} color="blue"/>
        </div>
    );
}

interface QualificationProps {
    teams: ITeams
    matches: IMatchList | null
    field: IFieldState | null
}

export const Qualification = (props: QualificationProps) => {
    if (!props.matches || !props.field) {
        return <Fragment />
    }

    const state = props.field;
    const match = props.matches[state.match];
    const upcoming = getNextMatches(props.matches, match, 8);
    upcoming?.unshift(match);

    if (!upcoming) {
        return <Fragment />
    }

    const matches = upcoming.map((match) =>
        <MatchInfo key={match.matchId} match={match} teamInfo={props.teams} />
    );

    return (
        <div className="qualification">
            {matches}
        </div>
    )
};