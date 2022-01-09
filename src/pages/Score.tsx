import { IMatchList, IPath, SimpleAllianceResults, SimpleMatchResult, TeamId, Teams } from "@18x18az/rosetta";
import { Component } from "react";
import { makeMatchName } from "../utils/TextGenerator";
import {talos} from '../ws'


interface ScoreProps {
    teams: Teams | null
    matches: IMatchList | null
    lastMessagePath: IPath | null
    lastMessageBody: any
}

interface ScoreState {
    score: SimpleMatchResult | null
}

interface AllianceProps {
    alliance: SimpleAllianceResults
    teams: Teams
}

interface TeamProps {
    team: TeamId
    teams: Teams
}

const TeamInfo = (props: TeamProps) => {
    const team = props.teams[props.team];
    return <div>{team.number} - {team.name}</div>
}

const AllianceResults = (props: AllianceProps) => {
    const teams = props.teams;
    const alliance = props.alliance;

    return <div>
        <TeamInfo team={alliance.team1} teams={teams}/>
        <TeamInfo team={alliance.team2} teams={teams}/>
        <div>{alliance.score}</div>
    </div>;
};


export class Score extends Component<ScoreProps, ScoreState> {
    constructor(props: ScoreProps){
        super(props);
        talos.get(["score"])
        this.state = {
            score: null,
        }
    }

    componentWillReceiveProps(props: ScoreProps){
        if(props.lastMessagePath) {
            const route = props.lastMessagePath[0];
            if(route === "score"){
                this.setState({
                    score: props.lastMessageBody
                })
            }
        }
    }

    render(){ 
        if(this.state.score && this.props.teams && this.props.matches){
            const score = this.state.score;
            const match = this.props.matches[score.name]
            const matchName = makeMatchName(match);
            return <div className="score">
                <div className="detachedTop"><div className="matchName">{matchName}</div></div>
                <AllianceResults alliance={score.red} teams={this.props.teams}/>
                <AllianceResults alliance={score.blue} teams={this.props.teams}/>
            </div>
        } else {
            return <h1></h1>;
        }
    }
};
