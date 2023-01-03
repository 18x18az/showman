import { ITeams, TeamId } from "@18x18az/rosetta";
import { Fragment } from "react";
import { talos } from "../../../ws";

function selectTeam(team: TeamId){
    talos.post(['allianceSelection', 'pick'], team);
}

interface TeamInfoProps {
    team: TeamId
    teamData: ITeams
}

const TeamInfo = (props: TeamInfoProps) => {
    const teamNumber = props.teamData[props.team].number;
    return <button className="teamSelector" onClick={() => selectTeam(props.team)}>{teamNumber}</button>
}

interface EligibleTeamsProps {
    teams: TeamId[] | undefined
    teamData: ITeams
}

export const EligibleTeams = (props: EligibleTeamsProps) => {
    if(props.teams === undefined){
        return <Fragment/>
    }

    const barComponents = props.teams.map((team) =>
        <TeamInfo key={team} team={team} teamData={props.teamData} />
    );
    return (
        <div className="eligible">
            <div className="teams">
                {barComponents}
            </div>

        </div>
    );
}