import { IAlliance, ITeams } from "@18x18az/rosetta";

interface IAllianceProps {
    teams: ITeams
    alliance: IAlliance
}

export function AllianceNumbers(props: IAllianceProps) {
    console.log(props);
    const team1 = props.teams[props.alliance.team1].number;
    let team2 = undefined;
    if (props.alliance.team2) {
        team2 = props.teams[props.alliance.team2].number;
    }

    return (
        <div className='numbers'>
            <div className='teamNumber'>{team1}</div>
            <div className='teamNumber'>{team2}</div>
        </div>
    );
}