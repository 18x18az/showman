import { IPath, SimpleAllianceResults, SimpleMatchResult, TeamId, Teams } from "@18x18az/rosetta";
import { Component } from "react";
import {talos} from '../ws'


interface ScoreProps {
    teams: Teams | null
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
    console.log(team);
    console.log(props.teams);
    return <div>{team.number}</div>
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
        if(this.state.score && this.props.teams){
            const score = this.state.score;
            const match = score.name;
            return <div>
                <div>{match}</div>
                <AllianceResults alliance={score.red} teams={this.props.teams}/>
                <AllianceResults alliance={score.blue} teams={this.props.teams}/>
            </div>
        } else {
            return <h1>Nothing yet</h1>;
        }
    }
};
