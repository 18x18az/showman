import { IAllianceTeams, IFieldState, IMatchInfo, IMatchList, IPath, MATCH_TYPE, ITeams } from "@18x18az/rosetta";
import { Component } from "react";
import { getNextMatches } from "../../utils/Match";
import { makeShortMatchName } from "../../utils/TextGenerator";
import { talos } from "../../ws";

interface IMatchTeamProps {
    alliance: IAllianceTeams
    color: "redMatch" | "blueMatch"
    teams: ITeams
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
    teams: ITeams
}

function Match(props: IMatchProps) {
    const matchName = makeShortMatchName(props.match);
    const blue = props.match.blue;
    const red = props.match.red;
    return <div key={props.match.matchId} className="match">
        <div className="name">{matchName}</div>
        <MatchTeam alliance={red as IAllianceTeams} color="redMatch" teams={props.teams} />
        <MatchTeam alliance={blue as IAllianceTeams} color="blueMatch" teams={props.teams} />
    </div>
}

interface UpcomingProps {
    teams: ITeams | null
    matches: IMatchList | null
    lastMessagePath: IPath | null
    lastMessageBody: any
}

interface UpcomingState {
    field: IFieldState | null
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