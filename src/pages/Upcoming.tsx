import { IAllianceTeams, IFieldState, IMatchInfo, IMatchList, IPath, MatchType, Teams } from "@18x18az/rosetta";
import { Component } from "react";
import { makeShortMatchName } from "../utils/TextGenerator";
import { talos } from "../ws";

interface IMatchTeamProps {
    alliance: IAllianceTeams
    color: "redMatch" | "blueMatch"
    teams: Teams
}

function MatchTeam(props: IMatchTeamProps) {
    const team1 = props.teams[props.alliance.team1];
    const team2 = props.teams[props.alliance.team2];
    return (
        <div className={props.color}>
            <svg width="10" height="100%" className="stripe">
                <rect x="0" y="2%" width="5" height="96%" />
            </svg>
            <div className="numbers">
                <div>{team1.number}</div>
                <div>{team2.number}</div>
            </div>
        </div>
    )
}

interface IMatchProps {
    match: IMatchInfo
    teams: Teams
}

interface IMatchProps {
    match: IMatchInfo
    teams: Teams
}

function Match(props: IMatchProps) {
    const matchName = makeShortMatchName(props.match);
    const blue = props.match.blue;
    const red = props.match.red;
    return <div key={props.match.matchId} className="match">
        <div className="name">{matchName}</div>
        <MatchTeam alliance={red} color="redMatch" teams={props.teams} />
        <MatchTeam alliance={blue} color="blueMatch" teams={props.teams} />
    </div>
}

interface UpcomingProps {
    teams: Teams | null
    matches: IMatchList | null
    lastMessagePath: IPath | null
    lastMessageBody: any
}

interface UpcomingState {
    field: IFieldState | null
}

function getNextMatches(matches: IMatchList, match: IMatchInfo, depth: number): Array<IMatchInfo> | null {
    const nextMatch = getNextMatch(matches, match);
    if (!nextMatch) {
        return null
    }

    let nextMatches;
    if (depth > 1) {
        nextMatches = getNextMatches(matches, nextMatch, depth - 1);
    }

    if (!nextMatches) {
        nextMatches = [nextMatch];
    } else {
        nextMatches.unshift(nextMatch);
    }

    return nextMatches;
}

function getNextR16(matches: IMatchList, match: IMatchInfo): IMatchInfo | undefined {
    let number = parseInt(match.number as unknown as string);

    for (let i = number + 1; i < 9; i++) {
        const key = `R16 ${i}-1`;
        if (matches[key]) {
            return matches[key];
        }
    }

    return undefined;
}

function getNextElimMatch(matches: IMatchList, match: IMatchInfo): IMatchInfo | undefined {
    let type = match.type;
    let number = parseInt(match.number as unknown as string) + 1;

    if (type === MatchType.R16) {
        if (number === 9) {
            type = MatchType.QF;
            number = 1;
        } else {
            return getNextR16(matches, match);
        }
    } else if (type === MatchType.QF && number === 5) {
        type = MatchType.SF;
        number = 1;
    } else if (type === MatchType.SF && number === 3) {
        type = MatchType.F;
        number = 1;
    }

    const matchKey = `${type} ${number}-1`;
    return matches[matchKey];
}

function getNextQualMatch(matches: IMatchList, match: IMatchInfo): IMatchInfo {
    const nextNumber = parseInt(match.number as unknown as string) + 1;
    const fullKey = `Q${nextNumber}`;
    const nextMatch = matches[fullKey];
    return nextMatch
}

function getNextMatch(matches: IMatchList, match: IMatchInfo): IMatchInfo | undefined {
    if (match.type === "QUAL") {
        return getNextQualMatch(matches, match);
    } else {
        return getNextElimMatch(matches, match);
    }
}

export class Upcoming extends Component<UpcomingProps, UpcomingState> {
    constructor(props: UpcomingProps) {
        super(props);
        talos.get(["field"])
        this.state = {
            field: null,
        }

    }

    static getDerivedStateFromProps(nextProps: UpcomingProps, prevState: UpcomingState) {
        if (nextProps.lastMessagePath) {
            const route = nextProps.lastMessagePath[0];
            if (route === "field") {
                return ({
                    field: nextProps.lastMessageBody
                })
            }
        }

        return null;
    }

    render() {
        if (this.state.field && this.props.teams && this.props.matches) {
            const state = this.state.field;
            const match = this.props.matches[state.match];
            const nextMatches = getNextMatches(this.props.matches, match, 5);
            console.log(nextMatches);

            let upcomingMatchItems = [];

            if (nextMatches) {

                for (let i = 0; i < nextMatches.length; i++) {
                    const match = nextMatches[i];
                    const matchItem = <Match match={match} teams={this.props.teams} />
                    upcomingMatchItems.push(matchItem);
                }
            }

            return <div className="stream">
                <div className="upcoming">
                    <Match match={match} teams={this.props.teams} />
                    {upcomingMatchItems}
                </div>
            </div>
        } else {
            return <h1></h1>;
        }
    }
};