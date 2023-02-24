import { IMatchList, ISimpleAllianceResults, ISimpleMatchResult, ITeams } from "@18x18az/rosetta";
import { Fragment } from "react";

interface IAllianceScore{
    teams: ITeams
    results: ISimpleAllianceResults
}

export function AllianceScore(props: IAllianceScore){
    const team1 = props.teams[props.results.alliance.team1].number;
    let team2 = '';
    if(props.results.alliance.team2){
        team2 = props.teams[props.results.alliance.team2].number;
    }
    return(
        <div>
            <h2>{team1} - {team2}</h2>
            <h2>{props.results.score}</h2>
        </div>
    );
}

interface IScoreInterface {
    teams: ITeams
    matches: IMatchList | null
    score: ISimpleMatchResult | null
}

export function Score(props: IScoreInterface) {

    if(!props.score){
        return <Fragment/>
    }


    return (
        <div>
            <h1>{props.score.name}</h1>
            <AllianceScore teams={props.teams} results={props.score.red}/>
            <AllianceScore teams={props.teams} results={props.score.blue}/>
        </div>
    )
}
