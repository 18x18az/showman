import { IMatchList, IPath, ISimpleAllianceResults, ISimpleMatchResult, TeamId, ITeams } from "@18x18az/rosetta";
import { Component } from "react";
import { makeMatchName } from "../utils/TextGenerator";
import { talos } from '../ws'


interface ScoreProps {
    teams: ITeams | null
    matches: IMatchList | null
    lastMessagePath: IPath | null
    lastMessageBody: any
}

interface ScoreState {
    score: ISimpleMatchResult | null
}

interface AllianceProps {
    alliance: ISimpleAllianceResults
    teams: ITeams
    color: string
}

interface TeamProps {
    team: TeamId
    teams: ITeams
}

const TeamInfo = (props: TeamProps) => {
    const team = props.teams[props.team];
    let name = team.name;
    const max_length = 45;
    if (name.length > max_length) {
        name = name.substring(0, max_length)
    }
    return <div className="teamInfo">
        <div className="teamInfoNumber">{team.number}</div>
        <div className="teamInfoName">{name}</div>
    </div>
}

const AllianceResults = (props: AllianceProps) => {
    const teams = props.teams;
    const alliance = props.alliance;

    const allianceClass = `allianceInfo${props.color}`
    const scoreClass = `scoreInfo${props.color}`

    return <div>
        <div className={allianceClass}>
            <svg width="10" height="100%" className="stripe">
                <rect x="0" y="2%" width="10" height="96%" />
            </svg>
            <div className="allianceInfo">
                <TeamInfo team={alliance.team1} teams={teams} />
                <TeamInfo team={alliance.team2} teams={teams} />
            </div>
        </div>
        <div className={scoreClass}>
            <svg width="10" height="100%" className="stripe">
                <rect x="0" y="5%" width="10" height="90%" />
            </svg>
            <div className="actualScore">
                {alliance.score}
            </div>
        </div>
    </div>;
};


export class Score extends Component<ScoreProps, ScoreState> {
    constructor(props: ScoreProps) {
        super(props);
        talos.get(["score"])
        this.state = {
            score: null,
        }
    }

    componentWillReceiveProps(props: ScoreProps) {
        if (props.lastMessagePath) {
            const route = props.lastMessagePath[0];
            if (route === "score") {
                this.setState({
                    score: props.lastMessageBody
                })
            }
        }
    }

    render() {
        if (this.state.score && this.props.teams && this.props.matches) {
            const score = this.state.score;
            const match = this.props.matches[score.name]
            const matchName = makeMatchName(match);
            return <div className="stream">
                <div className="score">
                    <div className="detachedTop"><div className="matchName">{matchName} Results</div></div>
                    <AllianceResults alliance={score.red} teams={this.props.teams} color="Red" />
                    <AllianceResults alliance={score.blue} teams={this.props.teams} color="Blue" />
                </div>
            </div>
        } else {
            return <h1></h1>;
        }
    }
};
